import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { setSingleJob } from '../redux/jobSlice';
import axios from 'axios';
import { APPLICATION_JOB_API_END_POINT, JOBS_API_END_POINT } from '../utils/constant';
import store from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Eye, EyeOff, Loader2 } from "lucide-react";


const JobDescription = () => {
    const { userToken, user } = useSelector(store => store.auth);
    const singleJob = useSelector(state => state.job.singleJob);
    const dispatch = useDispatch();
    const params = useParams();
    const [loading, setLoading] = useState(false)
    const jobId = params.id;
    const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant == user?._id) || false
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const applyJobHandler = async () => {
        if (!userToken) {
            toast.error("Please Login to Apply")
            return
        };
        try {

            const res = await axios.get(`${APPLICATION_JOB_API_END_POINT}/apply/${jobId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                },
                withCredentials: true
            })

            if (res.data.success) {
                setIsApplied(true)
                alert("Job Applied Successfully!");
                const updateSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updateSingleJob))
            }
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong");
            console.log(error.response);
        }
    };

    useEffect(() => {
        const fetchSingleJobs = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`${JOBS_API_END_POINT}/get/${jobId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userToken}`
                    },
                    withCredentials: true
                })

                if (res.data.success) {
                    dispatch(setSingleJob(res.data.data))
                    setIsApplied(res.data.data.applications.some(application => application.applicant === user?._id))
                }
            } catch (error) {
                console.log("Error fetching job details:", error);
            } finally { setLoading(false) }
        }
        if (userToken) fetchSingleJobs();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='h-screen pt-10 '>
            <div className='sm:py-10 sm:px-5 ' >
                {
                    user ?
                        <div className={` ${loading? 'pt-24' : ""  } justify-center items-center min-h-96 `}>

                            {loading ? <Loader2 size={100} className=' mx-auto animate-spin  bg-transparent '> </Loader2> :
                                <div className={`${loading ? 'bg-gray-300' : 'bg-white'} mt-10 max-w-4xl border mx-auto border-gray-200 shadow-xl  rounded-lg my-5 p-8 flex  flex-col gap-4`}>

                                    <div className='flex justify-between'>
                                        <div className=''>
                                            <h1 className='font-bold text-2xl  text-gray-900'>{singleJob?.tittle}</h1>
                                            <div className='flex items-center gap-2 mt-4  '>
                                                <span className='bg-gray-200 border border-black text-sm p-0.5 rounded-xl px-2 font-bold text-blue-600'>{singleJob?.position} Positions</span>
                                                <span className='bg-gray-200 border border-black text-sm  p-0.5 rounded-xl px-2 font-bold text-red-600'>{singleJob?.jobType}</span>
                                                <span className='bg-gray-200 border border-black text-sm p-0.5 rounded-xl px-2 font-bold text-purple-600'>{singleJob?.salary} LPA</span>
                                            </div>
                                        </div>
                                        <button disabled={isApplied} type="button" onClick={applyJobHandler} className={`text-gray-100 mt-5 h-10 ${isApplied ? "bg-gray-500 cursor-not-allowed" : "primary-bg"} shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 `}>
                                            {isApplied ? "Already Applied" : "Apply Now"}
                                        </button>

                                    </div>
                                    <h1 className='text-gray-900 font-medium border-b-2 border-b-gray-300 py-4'>{singleJob?.description}</h1>
                                    <div className='mb-4'>
                                        <h1 className='font-bold my-1  text-gray-900'>Role: <span className='pl-3 font-normal text-gray-600'>{singleJob?.tittle}</span></h1>
                                        <h1 className='font-bold my-1  text-gray-900'>Location: <span className='pl-3 font-normal text-gray-600'>{singleJob?.location}</span></h1>
                                        <h1 className='font-bold my-1  text-gray-900'>Description: <span className='pl-3 font-normal text-gray-600'>{singleJob?.description}</span></h1>
                                        {/* <h1 className='font-bold my-1  text-gray-900'>Requirements : <span className='pl-3 font-normal text-gray-600'>{singleJob?.requirement.split(",")[0]}</span></h1> */}
                                        <h1 className='font-bold my-1  text-gray-900'>Experience: <span className='pl-3 font-normal text-gray-600'>{singleJob?.experience} Yrs</span></h1>
                                        <h1 className='font-bold my-1  text-gray-900'>Salary: <span className='pl-3 font-normal text-gray-600'>{singleJob?.salary} LPA</span></h1>
                                        <h1 className='font-bold my-1  text-gray-900'>Total Applicants: <span className='pl-3 font-normal text-gray-600'>{singleJob?.applications.length}</span></h1>
                                        <h1 className='font-bold my-1  text-gray-900'>Company : <span className='pl-3 font-normal text-gray-600'>{singleJob?.companyId?.name}</span></h1>
                                        <h1 className='font-bold my-1  text-gray-900'>Posted Date: <span className='pl-3 font-normal text-gray-600'>{singleJob?.createdAt.split("T")[0]}</span></h1>
                                    </div>
                                </div>
                            }


                        </div>
                        : <div className=' mt-10 max-w-4xl border mx-auto border-gray-200 shadow-xl bg-white rounded-lg my-5 p-8 flex  flex-col gap-4'>
                            <h1 className='primary-color text-4xl font-bold flex justify-center items-center'>
                                Sorry, You are Not Logged In!
                            </h1>
                        </div>}
            </div>

        </div>
    )
}

export default JobDescription
