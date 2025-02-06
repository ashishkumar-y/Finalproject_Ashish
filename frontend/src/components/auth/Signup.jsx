import React, { useState } from 'react'
import { Button, Checkbox, Label, Radio, TextInput, Toast } from 'flowbite-react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import axios from 'axios'
import { handleError, handleSuccess, USER_API_END_POINT } from '../../utils/constant.js';
import { toast, ToastContainer } from 'react-toastify';
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import store from '../../redux/store.js';
import { setLoading, setProfilePhotoUrl } from '../../redux/authSlice.js';


const Signup = () => {
    const [input, setInput] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        profilePhoto: ''
    })

    const { profilePhotoUrl } = useSelector(store => store.auth);
    const { loading } = useSelector(store => store.auth);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();



    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    };

    const handleFile = (e) => {
        console.log(e.target.files);
        setInput({ ...input, profilePhoto: e.target.files?.[0] })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(setLoading(true))
            const formData = new FormData()
            formData.append("name", input.name),
                formData.append("email", input.email),
                formData.append("phoneNumber", input.phoneNumber),
                formData.append("password", input.password),
                formData.append("role", input.role)
          
            if (input.profilePhoto) {
                formData.append("profilePhoto", input.profilePhoto)
            }

            const res = await axios.post(`${USER_API_END_POINT}/signUp`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })
            console.log(res);
            console.log(res.data.profilePhotoPath);

            if (!res.ok) {
                handleError(res.data.message)
            }
            console.log(res.data.message);

            if (res.data.success) {
                handleSuccess(res.data.message),
                    navigate("/login");
            } else {
                handleError(res.data.error)
            }
        } catch (error) {
            console.error("Error during signup:", error.response.data.error);
            toast.error(error.response.data.error || "An error occurred. Please try again.")
        } finally {
            dispatch(setLoading(false))
        }
    }




    return (
        <div className=' flex justify-center items-center w-full min-h-screen pt-24 '>

            <ToastContainer />

            <form onSubmit={handleSubmit} encType='multipart/form-data' className={`border p-8 flex flex-col gap-4 rounded-xl shadow pb-5 ${loading ? "cursor-not-allowed" : ""} `} >
                <h1 className='text-3xl primary-color font-extrabold' >Sign Up</h1>
                <div className='mt-2'>
                    <Label htmlFor="name" value="Name :" className='text-white' />
                    <TextInput
                        id="name"
                        type="text"
                        name='name'
                        placeholder="Jake"
                        value={input.name}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />
                </div>
                <div className=' sm:flex gap-4 justify-between'>
                    <div className='sm:mt-3 w-full'>
                        <Label htmlFor="email" value="Email :" className='text-white' />
                        <TextInput
                            id="email"
                            type="email"
                            name='email'
                            placeholder="Jake@gmail.com"
                            value={input.email}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className='sm:mt-3 w-full'>
                        <Label htmlFor="phoneNumber" value="Phone Number :" className='text-white' />
                        <TextInput
                            id="phoneNumber"
                            type="text"
                            name='phoneNumber'
                            placeholder="838942****"
                            value={input.phoneNumber}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                    </div>
                </div>

                {/* //password */}
                <div className="mt-3" >
                    <Label htmlFor="password" value="Password :" className="text-white" />
                    <span className='flex border rounded-lg bg-white overflow-hidden'>
                        <TextInput
                            id="password"
                            type={showPassword ? "text" : "password"}
                            // type="password"
                            name="password"
                            placeholder="Enter password"
                            value={input.password}
                            onChange={handleChange}
                            disabled={loading}
                            required
                            className="overflow-hidden bg-transparent  outline-none focus:outline-none w-full text-black"

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

                <div className=' sm:flex  gap-16'>
                    <div>
                        <Label htmlFor="role" value="Select Role :" className='text-white' />
                        <fieldset className="flex max-w-md gap-4 p-1 ">
                            <div className="flex items-center gap-2 ">
                                <Radio className='cursor-pointer' id="student" name="role" value="student" checked={input.role === 'student'} disabled={loading} onChange={handleChange} />
                                <Label htmlFor="student" className='text-white cursor-pointer'>student</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Radio className='cursor-pointer' id="recruiter" name="role" value="recruiter" checked={input.role === 'recruiter'} disabled={loading} onChange={handleChange} />
                                <Label htmlFor="recruiter" className='text-white cursor-pointer'>Recruiter</Label>
                            </div>
                        </fieldset>
                    </div>


                    <div>
                        <Label htmlFor="profilePhoto" value="Profile :" className="text-white" />
                        <input
                            id="profilePhoto"
                            name='profilePhoto'
                            type="file"
                            accept="image/*"
                            disabled={loading}
                            onChange={handleFile}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                        />
                    </div>
                </div>

                {loading ? <button className='border prima primary-border py-2 rounded text-center flex items-center justify-center'><Loader2 className='mr-2   animate-spin text-2xl bg-transparent '> </Loader2>Loading... </button> : <button className="border primary-bg primary-border py-2 rounded" type="submit">
                    SignUp
                </button>}

                <div className="flex text-sm justify-center items-center p-1">
                    <span className='flex items-center '>Already have an account ?<Link to="/login" className="flex gap-2 text-[12px] justify-center items-center font-semibold px-3 py-1.5 primary-color cursor-pointer "> Login</Link> </span>
                </div>

            </form>
        
        </div>
    )
}

export default Signup
