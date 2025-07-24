import React, { useState, useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { auth } from "../firebase"; // your firebase auth instance
// optionally import API methods or use fetch directly

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    city: "",
    bio: "",
    interests: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const user = auth.currentUser;

  // Fetch profile from backend or Firestore using user.uid
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    fetch(`http://127.0.0.1:5001/eventfriendfirebase/us-central1/api/users/${user.uid}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load profile");
        return res.json();
      })
      .then((data) => {
        setProfile({
          name: data.username || "",
          email: data.email || user.email || "",
          city: data.city || "",
          bio: data.bio || "",
          interests: data.interests || [],
        });
        setLoading(false);
      })
      .catch((err) => {
        setError("Could not load profile");
        setLoading(false);
      });
  }, [user]);

  // Controlled inputs for the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // For interests (string separated by commas)
  const handleInterestsChange = (e) => {
    const interestsArray = e.target.value.split(",").map((i) => i.trim()).filter(Boolean);
    setProfile((prev) => ({ ...prev, interests: interestsArray }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    fetch(`http://127.0.0.1:5001/eventfriendfirebase/us-central1/api/users/${user.uid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: profile.name,
        city: profile.city,
        bio: profile.bio,
        interests: profile.interests,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save profile");
        setSaving(false);
      })
      .catch(() => {
        setError("Failed to save profile");
        setSaving(false);
      });
  };

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>Please login to view your profile.</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="flex items-center space-x-6 mb-8">
        <UserCircleIcon className="h-24 w-24 text-slate-300" />
        <div>
          <h1 className="text-3xl font-bold text-slate-800">{profile.name || "Your Name"}</h1>
          <p className="text-slate-500">{profile.email}</p>
        </div>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
          <input
            name="name"
            type="text"
            value={profile.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Home City</label>
          <input
            name="city"
            type="text"
            value={profile.city}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Short Bio</label>
          <textarea
            name="bio"
            rows="4"
            value={profile.bio}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">My Interests (comma separated)</label>
          <input
            name="interests"
            type="text"
            value={profile.interests.join(", ")}
            onChange={handleInterestsChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-md"
          />
        </div>
        <div className="pt-4">
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
