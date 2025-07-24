# EventFriend - A Social Event Discovery App

EventFriend is a web application designed to help users discover local events and connect with others who share similar interests. Users can browse events, mark their interest, and find friends to attend with.

This is the frontend repository, built with React. For the application to function, it must be run alongside the backend server.

## Core Technologies

*   **Frontend:** React, React Router, Tailwind CSS
*   **Backend:** Node.js, Express.js
*   **Database & Services:** Firebase (Authentication, Firestore, Cloud Functions)

## Getting Started: Full Local Development Setup

These instructions will guide you through cloning both required repositories and running the full application on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js:** The LTS version is recommended. You can download it from [nodejs.org](https://nodejs.org/).
*   **Git:** For cloning the repositories.
*   **Firebase CLI:** The command-line tool for managing and emulating the Firebase backend. If you don't have it, install it globally by running:
    ```bash
    npm install -g firebase-tools
    ```
    > **Note:** On macOS/Linux, you might need to use `sudo`. On Windows, you may need to run this in a terminal with administrator privileges.

### Step 1: Clone Both Repositories

You need to clone both the frontend and backend repositories. It's best to place them in the same parent folder.

```bash
# Navigate to a folder where you keep your projects
cd path/to/your/projects

# Clone the Frontend (this repository)
git clone https://github.com/bmoniquesullivan/EventFriendFrontEnd.git

# Clone the Backend
git clone https://github.com/DavonApp/Event-Friend.git
```

### Step 2: Set Up the Backend

The backend server requires initial setup and configuration for the Firebase emulators.

1.  **Navigate to the backend directory:**
    ```bash
    cd Event-Friend
    ```

2.  **Log in to the Firebase CLI:** This is required to initialize the project correctly.
    ```bash
    firebase login
    ```
    A browser window will open. Sign in with the Google account associated with your Firebase project.

3.  **Install backend dependencies:** The Cloud Functions have their own `package.json` file.
    ```bash
    cd functions
    npm install
    cd ..
    ```

4.  **Configure Emulators (One-Time Setup):** If this is your first time setting up the project, you must tell Firebase which services to emulate.
    ```bash
    firebase init emulators
    ```
    Follow the prompts carefully:
    *   **"Which emulators do you want to set up?"**: Use the **arrow keys** and **spacebar** to select `Authentication Emulator`, `Functions Emulator`, and `Firestore Emulator`.
    *   **"Which port do you want to use for...?"**: Press **Enter** to accept the defaults for each port.
    *   **"Would you like to enable the Emulator UI?"**: Type **`Y`** and press **Enter**.
    *   **"Would you like to download the Emulator UI now?"**: Type **`Y`** and press **Enter**.

### Step 3: Set Up the Frontend

Now, set up the React application.

1.  **Navigate to the frontend directory:**
    ```bash
    # Make sure you are back in your main projects folder first
    cd ../EventFriendFrontEnd
    ```

2.  **Install frontend dependencies:**
    ```bash
    npm install
    ```

### Step 4: Run the Full Application

The application requires **two separate terminals** running at the same time: one for the backend emulators and one for the frontend React server.

**Terminal 1: Start the Backend**

1.  Navigate to the backend project root: `cd path/to/your/projects/Event-Friend`
2.  Run the emulators:
    ```bash
    firebase emulators:start
    ```
3.  Leave this terminal running. It is now your local server. You can view the Emulator UI at [http://localhost:4000](http://localhost:4000).

**Terminal 2: Start the Frontend**

1.  Navigate to the frontend project root: `cd path/to/your/projects/EventFriendFrontEnd`
2.  Run the React development server:
    ```bash
    npm start
    ```
3.  This will automatically open the EventFriend application in your browser, usually at [http://localhost:3000](http://localhost:3000). The app is now ready to use.

---

## Troubleshooting Common Issues

*   **Error on Frontend: `Failed to Fetch`**
    *   **Cause:** This almost always means the **backend server is not running**.
    *   **Solution:** Make sure you have started the backend in a separate terminal using `firebase emulators:start` and that it loaded the `api` function without errors.

*   **Error on Backend: `firebase: command not found`**
    *   **Cause:** The Firebase CLI is not installed or not in your system's PATH.
    *   **Solution:** Run `npm install -g firebase-tools`. Close and reopen your terminal before trying again.

*   **Error on Backend: `Failed to load function definition from source` or `Cannot find package 'express'`**
    *   **Cause:** You haven't installed the dependencies for the Cloud Functions.
    *   **Solution:** Stop the emulator. In the `Event-Friend` directory, run `cd functions`, then `npm install`, then `cd ..`, and finally restart the emulators.

*   **Error on Frontend: `Something is already running on port 3000`**
    *   **Cause:** A previous `npm start` session didn't close properly.
    *   **Solution 1 (Easy):** When prompted `Would you like to run the app on another port instead? (Y/n)`, type **`Y`** and press **Enter**. The app will run on port `3001`.
    *   **Solution 2 (Force Quit):** Find and stop the process manually. See online guides for "kill process on port 3000" for your specific OS (macOS, Windows, or Linux).

## Available Scripts (Frontend)

In the frontend directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.