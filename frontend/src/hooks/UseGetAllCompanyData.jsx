import axios from 'axios';
import React from 'react';
import { COMPANY_API_END_POINT, } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setAllCompanies } from '../redux/companyslice';

const UseGetAllCompanies = () => {
    const { userToken } = useSelector(store => store.auth)
    const dispatch = useDispatch()

    const fetchAllCompanies = async () => {
        try {
            const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
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
                dispatch(setAllCompanies(res.data.data))
                console.log(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    fetchAllCompanies()
};

export default UseGetAllCompanies;
