import {  Label, Radio, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios';
import { handleError, handleSuccess, USER_API_END_POINT } from '../../utils/constant.js';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser, setUserToken } from '../../redux/authSlice.js';



const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const { loading, userToken } = useSelector(store => store.auth)
    const navigate1 = useNavigate()
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if (!res.ok) {
                handleError(res.data.message)
            }

            if (res.data.token) {
                {
                    res?.data?.user?.role == 'recruiter' ?
                        navigate1('/admin/companies')
                        :
                        navigate1('/')
                }

                toast.success(res.data.message);
                dispatch(setUser(res.data.user));
                dispatch(setUserToken(res.data.token));
                dispatch(setProfilePhotoUrl(res.data.user.profile.profilePhoto));

            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            
            toast.error(error.response?.data?.message || "An error occurred. Please try again.")
        } finally {
            dispatch(setLoading(false))
        }
    };

    return (
        <div className="flex justify-center items-center w-full h-screen">
            <form onSubmit={handleSubmit} className={`border p-5 flex flex-col gap-4 max-w-md w-full rounded-xl shadow pb-10  ${loading ? 'cursor-not-allowed' : ""} }`}>
                <h1 className="text-3xl primary-color font-extrabold">Log In</h1>

                <div className="mt-7">
                    <Label htmlFor="email" value="Email :" className="text-white" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={input.email}
                        onChange={handleChange}
                        disabled={loading}
                        className={loading ? "cursor-not-allowed text-gray-500" : ""}
                    />
                </div>

                {/* password  */}
                <div className="mt-3" >
                    <Label htmlFor="password" value="Password :" className="text-white" />
                    <span className='flex border rounded-lg bg-white overflow-hidden'>
                        <TextInput
                            id="password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter password"
                            value={input.password}
                            onChange={handleChange}
                            disabled={loading}
                            required
                            className={`bg-transparent border-none  round outline-none focus:outline-none w-full ${loading ? "text-gray-500" : "text-black"} `}

                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="inset-y-0 right-3 flex items-center bg-transparent rounded-full border-none p-2  "  >
                            {showPassword ? (
                                <EyeOff size={20} className="bg-transparent" style={{ stroke: "black" }} />
                            ) : (
                                <Eye size={20} className="bg-transparent" style={{ stroke: "black" }} />
                            )}
                        </button>

                    </span>
                </div>

                <div>
                    <Label htmlFor="role" value="Select Role :" className="text-white" />
                    <fieldset className="flex max-w-md gap-4 p-1">
                        <div className="flex items-center gap-2">
                            <Radio
                                id="student"
                                name="role"
                                value="student"
                                disabled={loading}
                                checked={input.role === "student"}
                                onChange={handleChange}
                            />
                            <Label htmlFor="student" className="text-white cursor-pointer">Student</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Radio
                                id="recruiter"
                                name="role"
                                value="recruiter"
                                checked={input.role === "recruiter"}
                                onChange={handleChange}
                                disabled={loading}
                            />
                            <Label htmlFor="recruiter" className="text-white cursor-pointer">Recruiter</Label>
                        </div>
                    </fieldset>
                </div>
                {loading ? <button className='border prima primary-border py-2 rounded text-center flex items-center justify-center'><Loader2 className='mr-2   animate-spin text-2xl bg-transparent '> </Loader2>Loading... </button> : <button className="border primary-bg primary-border py-2 rounded" type="submit">
                    Log In
                </button>}


                <div className="flex text-sm justify-center items-center p-1">
                    <span className="flex items-center">
                        Don't have an account?
                        <Link to="/signup" className="flex gap-2 text-[12px] justify-center items-center font-semibold px-3 py-1.5 primary-color cursor-pointer">
                            SignUp
                        </Link>
                    </span>
                </div>
            </form>
            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="colored" />
        </div>
    );
};

export default Login;
