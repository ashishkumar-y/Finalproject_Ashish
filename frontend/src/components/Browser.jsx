import React, { useEffect } from 'react'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import store from '../redux/store'
import { setSearchQuery } from '../redux/jobSlice'
import UseGetAllJobs from '../hooks/UseGetAllJobs'
import { motion } from "framer-motion"

const Browser = () => {

    UseGetAllJobs()
    const { allJobs } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        return () => {
            dispatch(setSearchQuery(""))
        }
    }, [])

    return (
        <div className='min-h-screen px-4 pt-24 '>

            {!user ? <div className='max-w-4xl h-screen mx-auto'>
                <div className='mt-10 max-w-4xl border mx-auto border-gray-200 shadow-xl bg-white rounded-lg my-5 p-8 flex flex-col gap-4'>
                    <h1 className='primary-color text-4xl font-bold flex justify-center items-center'>
                        Sorry, You are Not Logged In!
                    </h1>
                </div>
            </div> :

                <div className='max-w-7xl mx-auto p-2 '>
                    <h1>Search Result ({allJobs.length})</h1>
                    <div className='p-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {allJobs.map((job) => {
                            return (
                                <motion.div
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{duration:1}}
                                key={job._id} 
                                className=' shadow-lg rounded-xl'>
                                    <Job job={job} />
                                </motion.div>
                            )
                        })}
                    </div>

                </div>
            }
        </div>
    )
}

export default Browser
