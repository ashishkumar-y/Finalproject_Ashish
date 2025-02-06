import React from 'react'

const LatestJobCards = ({job}) => {
    return (
        <div className='p-5 rounded-md shadow-xl border bg-white hover:shadow-yellow-400 cursor-pointer '>

            <div>
                <h1 className='text-xl font-bold tracking-tight m-0 text-gray-900 dark:text-white'>{job?.company}</h1>
                <p className='text-sm text-gray-500 m-0'>{job?.location}</p>
            </div>
            <div>
                <h2 className='text-gray-600 text-lg font-extrabold my-2 capitalize'>{job?.tittle}</h2>
                <p className='font-normal text-sm text-gray-700 dark:text-gray-400'>{job?.description}</p>
            </div>

            <div className='flex items-center gap-2 mt-4  '>
                <span className='bg-gray-200 border border-black text-sm p-0.5 rounded-xl px-4 font-bold text-blue-600'>{job?.position} Position</span>
                <span className='bg-gray-200 border border-black text-sm  p-0.5 rounded-xl px-4 font-bold text-red-600'>{job?.jobType}</span>
                <span className='bg-gray-200 border border-black text-sm p-0.5 rounded-xl px-4 font-bold text-purple-600'>{job?.salary}LPA</span>
            </div>

        </div>
    )
}

export default LatestJobCards
