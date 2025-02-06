import axios from 'axios';
import React, { useEffect } from 'react';
import { COMPANY_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setAllSingleCompany } from '../redux/companyslice';

const UseGetCompanyById = (companyId) => {
    const { userToken } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get${companyId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userToken}`
                    },
                    withCredentials: true
                });
                if (res.data.success) {
                    console.log(res);
                    dispatch(setAllSingleCompany(res.data.company))
                    console.log(res.data.message);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleCompany()
    }, [companyId, dispatch])
}

export default UseGetCompanyById;
