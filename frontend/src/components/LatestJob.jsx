import React from 'react';
import LatestJobCards from './LatestJobCards';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {motion} from "framer-motion";


const LatestJob = () => {
    const allJobs = useSelector(state => state.job.allJobs);

    return (
        <div className='px-16 pt-10 mt-5 pb-5'>
            <motion.h1
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 1 }}
                className='m-8 text-4xl font-bold flex justify-center items-center p-1 pb-10 gap-2'>
                <span className='primary-color'>Latest & Top </span> Job openings
            </motion.h1>
            <div className='grid sm:grid-cols-2   md:grid-cols-2 lg:grid-cols-3 gap-4 my-5 p-1'>
                {allJobs.length < 0 ? <span className='text-gray-700'>No Job Available</span> : allJobs.slice(0, 6).map((job) => (
                    <LatestJobCards key={job._id} job={job} />
                ))}
            </div>
            <Link to="/jobs" className='text-blue-600 text-xl p-1 '>View more...... </Link>
        </div>
    )
}

export default LatestJob;
