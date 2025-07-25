export const mockEvents = [
  { id: 1, title: 'Indie Music Fest', date: 'AUG 15, 2025', location: 'Piedmont Park, Atlanta', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80' },
  { id: 2, title: 'Atlanta Hawks vs. Celtics', date: 'AUG 18, 2025', location: 'State Farm Arena', img: 'https://sportsradioamerica.com/wp-content/uploads/1200x628.png' },
  { id: 3, title: 'Tech Meetup & Networking', date: 'AUG 21, 2025', location: 'KSU Marietta Campus', img: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' },
  { id: 4, title: 'Modern Art Exhibit', date: 'AUG 24, 2025', location: 'High Museum of Art', img: 'https://www.ajc.com/resizer/v2/5A3I2CM7YWU475BEVGPMYYXBE4.jpg?auth=32ad4d049ce9a861fe8e29b77e65bf11b6ea5bbe184b9e01ceaa067f1d453eee&width=1600&height=900&smart=true'},
  { id: 5, title: 'K-Pop Dance Workshop', date: 'SEP 02, 2025', location: 'Downtown Dance Studio', img: 'https://filelist.tudelft.nl/_processed_/8/8/csm_kpop%20dance_1b968dea68.jpg' },
  { id: 6, title: 'Summer Food Truck Festival', date: 'SEP 05, 2025', location: 'Kennesaw Town Center', img: 'https://media.timeout.com/images/106036323/750/422/image.jpg' },
];

export const mockUsers = [
  { id: 101, name: 'Alex Johnson', bio: 'Loves live music and exploring new places.', avatar: `https://i.pravatar.cc/150?u=alex` },
  { id: 102, name: 'Brenda Smith', bio: 'Big sports fan, especially basketball.', avatar: `https://i.pravatar.cc/150?u=brenda` },
  { id: 103, name: 'Carlos Gomez', bio: 'Tech enthusiast and aspiring developer.', avatar: `https://i.pravatar.cc/150?u=carlos` },
  { id: 104, name: 'Diana Chen', bio: 'Art, history, and good conversation.', avatar: `https://i.pravatar.cc/150?u=diana` },
];

export const mockCurrentUser = {
  name: 'Frank Yaho',
  email: 'frank.yaho@kennesaw.edu',
  bio: 'Frontend Lead for EventFriend. Passionate about creating intuitive and responsive user experiences with React and TailwindCSS.',
  interests: ['live music', 'sports', 'art', 'tech'],
  city: 'Atlanta',
  interestedEvents: [1, 4],
  matches: [
      { 
        connectionId: 'Alex',
        user: mockUsers[0], 
        event: mockEvents[0] 
      },
      { 
        connectionId: 'Diana',
        user: mockUsers[3], 
        event: mockEvents[3] 
      },
  ]
};