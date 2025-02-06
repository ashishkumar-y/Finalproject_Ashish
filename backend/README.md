# Backend for Job Khojo

## 📌 Project Description

Job Khojo is a job search platform that connects job seekers with employers. This backend provides authentication, job listings, user roles, and job applications management.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (MongoDB Atlas)
- **Authentication:** JWT & Passport.js
 

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```sh
git clone <your-github-repo-url>
cd backend
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```env
MONGO_URI=mongodb+srv://ashishkumar:ashish123@jobkhojocluster0.2bhwv.mongodb.net/?retryWrites=true&w=majority&appName=jobKhojoCluster0
PORT=8000
SECRET_KEY=ABC123
```

### 4️⃣ Run the Server

```sh
npm start
```

Server will start at `http://localhost:8000`

## 📡 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/logout` - Logout user

### Users

- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user details
- `DELETE /api/users/:id` - Delete user (Admin only)

### Jobs

- `GET /api/jobs` - Get all job listings
- `GET /api/jobs/:id` - Get a single job
- `POST /api/jobs` - Add a new job (Admin only)
- `PUT /api/jobs/:id` - Update a job (Admin only)
- `DELETE /api/jobs/:id` - Delete a job (Admin only)

### Applications

- `POST /api/applications` - Apply for a job
- `GET /api/applications/:id` - Get application details
- `GET /api/applications/user/:id` - Get applications by user
- `DELETE /api/applications/:id` - Delete an application


## 📌 Contributors

- **Ashish Kumar** - Backend Developer
