import axios from 'axios';
import { Button, Label, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { COMPANY_API_END_POINT, } from '../../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setAllSingleCompany, } from '../../redux/companyslice';

const CreateCompany = () => {
    const { userToken, user } = useSelector(store => store.auth);
    const [companyName, setCompanyName] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            alert("Please enter a valid company name.");
            return;
        }
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { name: companyName }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                },
                withCredentials: true
            })

            if (res?.data?.success) {
                dispatch(setAllSingleCompany(res.data?.data))
                const companyId = res?.data?.data?._id
                alert(res.data.message)
                navigate(`/admin/companies/${companyId}`)
            }

        } catch (error) {
            console.error("Error:", error.response?.data?.error || "Something went wrong");
            alert(error.response?.data?.error || "Something went wrong");
        }
    }

    return (
        <div className='h-screen pt-10'>
            <div className='max-w-4xl h-screen mx-auto'>
                {
                    user ? <div className='mt-10 max-w-4xl border mx-auto border-gray-200 shadow-xl bg-white rounded-lg my-5 p-8 flex flex-col gap-4'>
                        <div>
                            <h1 className='primary-color text-3xl font-bold flex  items-center'>Your company name</h1>
                            <p className='text-gray-900'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus, saepe.</p>
                        </div>

                        <Label className="text-gray-900 font-bold text-lg">Company Name</Label>
                        <TextInput onChange={(e) => setCompanyName(e.target.value)} placeholder='JobHunt, Company Name' />


                        <div className='flex items-center gap-2 my-10 p-1'>
                            <Button onClick={() => navigate("/admin/companies")} className='border shadow-xl border-black primary-color'>Cancel</Button>
                            <Button onClick={registerNewCompany} className='primary-bg shadow-xl'>Continue</Button>
                        </div>


                    </div> :
                        <div className='max-w-4xl h-screen mx-auto'>
                            <div className='mt-10 max-w-4xl border mx-auto border-gray-200 shadow-xl bg-white rounded-lg my-5 p-8 flex flex-col gap-4'>
                                <h1 className='primary-color text-4xl font-bold flex justify-center items-center'>
                                    Sorry, You are Not Logged In!
                                </h1>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default CreateCompany
