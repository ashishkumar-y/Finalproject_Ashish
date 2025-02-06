import Navbar from './components/Navbar'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import './index.css'
import 'flowbite/dist/flowbite.css';
import { ToastContainer } from 'react-toastify'
import FooterComponent from './components/Footer'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Jobs from './components/Jobs'
import Browser from './components/Browser'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CreateCompany from './components/admin/CreateCompany'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import CreateJob from './components/admin/CreateJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoutes from './components/admin/ProctedRoutes';



function App() {

  const router = createBrowserRouter([{
    path: '/',
    element: (
      <div className="flex flex-col ">
        <Navbar />
        <div className="flex-1 min-h-screen">
          <Outlet />
        </div>
        <FooterComponent />
      </div>
    ),
    children: [
      {
        path: '/',
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/jobs',
        element: <Jobs />
      }, {
        path: '/job/description/:id',
        element: <JobDescription />
      },
      {
        path: '/browse',
        element: <Browser />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      ///admin
      {
        path: "/admin/companies",
        element: <ProtectedRoutes> <Companies /></ProtectedRoutes>
      },
      {
        path: "/admin/companies/create",
        element: <ProtectedRoutes> <CreateCompany /></ProtectedRoutes>
      },
      {
        path: "/admin/companies/:id",
        element:<ProtectedRoutes><CompanySetup /></ProtectedRoutes> 
      },
      {
        path: "/admin/jobs",
        element: <ProtectedRoutes><AdminJobs /></ProtectedRoutes>
      },
      {
        path: "/admin/jobs/create",
        element: <ProtectedRoutes><CreateJob /></ProtectedRoutes>
      },
      {
        path: "/admin/job/:id/applicant",
        element: <ProtectedRoutes><Applicants /> </ProtectedRoutes>
      },
    ]
  }])
  return (
    <div>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="colored" />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
