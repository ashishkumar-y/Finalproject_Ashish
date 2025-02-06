# Frontend for Job Application Management System

## Project Overview
This is the frontend of the Job Application Management System, built using React and Vite. It provides a user-friendly interface for managing companies, job postings, and applicants.

## Tech Stack
- **Framework:** React (with Vite for fast builds)
- **State Management:** Redux Toolkit
- **UI Components:** Flowbite React, Tailwind CSS, Lucide Icons
- **Animations:** Framer Motion
- **HTTP Requests:** Axios
- **Routing:** React Router DOM
- **Marquee Effect:** React Fast Marquee

## Installation & Setup

### Prerequisites
Make sure you have Node.js and npm installed on your system.

### Steps to Run the Project

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   or
   npm start
   ```
3. Open the app in your browser at `http://localhost:5173/`

## Project Structure
```
frontendd/
│── src/
│   ├── assets/           # Images, fonts, and other static resources
│   ├── components/       # Reusable UI components
│   ├── data/             # Centralized data for UI elements (text, navbar links, etc.)
│   ├── hero/             # Home page components and sections
│   ├── hooks/            # Custom React hooks
│   ├── redux/            # Redux store, slices, and state management
│   ├── utils/            # Utility functions and constants
│   ├── App.jsx           # Main application component
│   ├── index.css         # Global styles
│   ├── main.jsx          # Entry point of the application
│── public/               # Static assets like favicon, robots.txt, etc.
|--index.html
│── package.json          # Project dependencies and scripts
│── tailwind.config.js    # Tailwind CSS configuration
│── vite.config.js        # Vite configuration
│── README.md             # Project documentation
```

## Features
- Company Management
- Job Listings
- Applicant Tracking
- Status Updates (Accept/Reject)
- Authentication (with token-based authorization)
- UI Components using Flowbite React
- Toast notifications for user feedback
- **Job Search Bar in Home Page Hero** – Users can filter jobs by name

## Contributing
Feel free to fork the repository and submit pull requests.

