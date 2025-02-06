import React from 'react'
import Hero1 from '../hero/Hero1'
import WorkingPartners from '../hero/WorkingPartners'
import HowItWorks from '../hero/HowItWorks'
import UsersReview from '../hero/UsersReview'
import Contact from '../hero/contact'
import LatestJob from './LatestJob'
import { ToastContainer } from 'react-toastify'
import UseGetAllJobs from '../hooks/UseGetAllJobs'

const Home = () => {
    UseGetAllJobs()
    return (
        <>
            <Hero1 />
            <WorkingPartners />
            <LatestJob />
            <HowItWorks />
            <UsersReview />
            <Contact />
          
            <ToastContainer />
        </ >
    )
}
export default Home;