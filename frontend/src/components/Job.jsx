import { Avatar, } from 'flowbite-react'
import { Bookmark } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'


const Job = ({ job }) => {

  const navigate = useNavigate()
  const daysAgoFn = (mongoDbTime) => {
    const createdAt = new Date(mongoDbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60))
  }

  return (
    <div className='shadow-xl p-5 rounded-xl bg-white border border-gray-800' >

      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500 m-0'>{daysAgoFn(job?.createdAt) == 0 ? "Today" : ` ${daysAgoFn(job?.createdAt)}`}{daysAgoFn(job?.createdAt) == 0 ? "" : "Days ago"} </p>
        <button className='rounded-full shadow-xl p-2 '><Bookmark className='text-black' stroke="black" /></button>
      </div>
      <div className='flex gap-2 my-1 items-start w-fit'>
        <button className='p-0 w-fit'>
          <Avatar img={'https://i.pinimg.com/736x/db/4b/bd/db4bbdb49d44d22ec2ecc467a77c8182.jpg'} />
        </button>
        <div>
          <h1 className='text-gray-900 font-bold text-lg'>{job?.company}</h1>
          <p className='text-gray-500 text-sm'>{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className='text-gray-600 text-lg font-extrabold my-2'>{job?.tittle}</h1>
        <p className='font-normal text-sm text-gray-700 dark:text-gray-400'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4  '>
        <span className='bg-gray-200 border border-black text-sm p-0.5 rounded-xl px-2 font-bold text-blue-600'>{job?.position} Positions</span>
        <span className='bg-gray-200 border border-black text-sm  p-0.5 rounded-xl px-2 font-bold text-red-600'>{job?.jobType}</span>
        <span className='bg-gray-200 border border-black text-sm p-0.5 rounded-xl px-2 font-bold text-purple-600'>{job?.salary}LPA</span>
      </div>
      <div className='p-1 flex  items-center gap-4 mt-4'>
        <button type="button" onClick={() => navigate(`/job/description/${job?._id}`)} class="text-gray-800 bg-gray-200 bg-gradient-to-r  hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Details</button>
        <button type="button" className="text-white bg-gradient-to-r primary-bg hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Save for later</button>
      </div>

    </div>
  )
}

export default Job
