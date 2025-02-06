# Job Khojo

Job Khojo is a comprehensive job application platform that connects job seekers with companies. It allows users to apply for job openings seamlessly while enabling companies to efficiently manage and review applications.

## Features

### For Job Seekers:
- Browse and apply for job listings
- Track application status

### For Employers:
- Post job openings
- View and manage applicants
- Update application statuses (Accepted/Rejected)

## Technologies Used
- **Frontend:** React, Flowbite-React, Redux, React Router
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT-based authentication
- **API Communication:** Axios



## Environment Variables
Create a `.env` file in the backend directory and add the following:
```
MONGO_URI= mongodb+srv://ashishkumar:ashish123@jobkhojocluster0.2bhwv.mongodb.net/?retryWrites=true&w=majority&appName=jobKhojoCluster0
SECRET_KEY=ABC123
PORT=8000
```



### Backend Setup
```sh
cd backend
npm install
npm start
```

### Frontend Setup
```sh
cd frontend
npm install
npm run dev
```


