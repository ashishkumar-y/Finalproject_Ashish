import React from 'react'
import FilterCards from './FilterCards'
import Job from './Job'
import { useSelector } from 'react-redux';
import { motion } from "framer-motion"


const Jobs = () => {
 const { user } = useSelector(store => store.auth)
 const { allJobs } = useSelector(store => store.job)

    return (
        <div className='    '>
            <div className='max-w-7xl mx-auto min-h-screen mt-10 pt-16 hide-scrollbar' >

                {!user ? <div className='max-w-4xl h-screen mx-auto'>
                    <div className='mt-10 max-w-4xl border mx-auto border-gray-200 shadow-xl bg-white rounded-lg my-5 p-8 flex flex-col gap-4'>
                        <h1 className='primary-color text-4xl font-bold flex justify-center items-center'>
                            Sorry, You are Not Logged In!
                        </h1>
                    </div>
                </div> :
                    <div className='flex gap-5'>
                        <div className=' w-1/5 '> <FilterCards /></div>
                        {
                            allJobs.length <= 0 ? <span>Job Not Found</span> :
                                <div className='pb-5 flex-1 h-[88vh border] overflow-y-auto'>

                                    <div className='grid grid-cols-3 gap-4'>
                                        {allJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{duration:1}}
                                                key={job._id} >
                                                <Job job={job} />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                        }
                    </div>
                }
            </div>

        </div>

    )
}

export default Jobs
