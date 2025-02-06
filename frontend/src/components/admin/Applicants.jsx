import React, { useEffect } from 'react'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_JOB_API_END_POINT } from '../../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setAllApplicants } from '../../redux/applicationSlice';
import { ArrowLeft } from 'lucide-react'


function Applicants() {
    const { userToken } = useSelector(store => store.auth)
    const params = useParams()
    const dispatch = useDispatch()
    const { applicants } = useSelector(store => store.application)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchAllApplications = async () => {
            try {
                const res = await axios.get(`${APPLICATION_JOB_API_END_POINT}/${params.id}/applicants`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userToken}`
                    },
                    withCredentials: true
                })

                if (res.data.success) {
                    console.log(res.data)
                    dispatch(setAllApplicants(res.data.job.applications))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplications()
    }, []);

    return (
        <div className='h-screen py-24'>

            <div className='flex justify-between max-w-4xl mx-auto items-center gap-5 p-2'>
                <button onClick={() => navigate(-1)} className='flex items-center gap-2 rounded border px-4 py-2'>
                    <ArrowLeft />
                    <span>Back</span>
                </button>
              
            </div>
            <div className='border max-w-4xl mx-auto p-3 rounded-xl bg-white'>
                <h1 className='text-gray-900 font-bold text-xl my-5'>Applicants ({applicants.length})</h1>
                <ApplicantsTable />
                <p className='text-gray-400 text-sm flex justify-center'>A list of recent Applied Users</p>
            </div>
        </div>
    )
}

export default Applicants
