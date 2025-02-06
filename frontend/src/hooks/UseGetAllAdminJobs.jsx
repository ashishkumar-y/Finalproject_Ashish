import axios from 'axios';
import React from 'react';
import { JOBS_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setAllAdminJobs, setAllJobs } from '../redux/jobSlice';

const UseGetAllAdminJobs = () => {
    const { userToken } = useSelector(store => store.auth)
    const dispatch = useDispatch()

        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOBS_API_END_POINT}/getAdminJobs`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userToken}`
                    },
                    withCredentials: true
                })
                console.log(res);
                if (!res) {
                    console.log(res.data.message);
                }
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.data))
                    console.log(res.data.message);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminJobs()
}

export default UseGetAllAdminJobs;
