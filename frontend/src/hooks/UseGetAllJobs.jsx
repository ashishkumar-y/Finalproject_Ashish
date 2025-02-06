import axios from 'axios';
import React, { useEffect } from 'react';
import { JOBS_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setAllJobs } from '../redux/jobSlice';

const UseGetAllJobs = () => {
    const { userToken } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const { searchQuery } = useSelector(store => store.job);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOBS_API_END_POINT}/get?keyword=${searchQuery}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userToken}`
                    },
                    withCredentials: true
                })
         
                if (!res) {
                    console.log(res.data.message);
                }
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs))
                    console.log(res.data.message);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs()
    }, []);
}

export default UseGetAllJobs
