import React, { useState } from 'react';
import { Button, Label, Modal, Textarea, TextInput } from "flowbite-react";
import { Pen, Loader2 } from 'lucide-react';
import { setUser } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { handleError, handleSuccess, USER_API_END_POINT } from '../utils/constant';
import { toast } from 'react-toastify';


const UpdateProfileDialog = ({ open, setOpen }) => {
    const { user, userToken, profilePhotoUrl } = useSelector(store => store.auth);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        name: user?.name,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        profession: user?.profile?.profession,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map(skill => skill),
    });

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("profession", input.profession);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        formData.append("profilePhoto", profilePhotoUrl)


        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${userToken}`
                },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setUser(res.data.data));
                toast.success('Updated successfully');
                setOpen(false);
            }
        } catch (err) {
            toast.error('Failed to update data');
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Button onClick={() => setOpen(true)} className='border p-0 focus:outline-none hover:bg-gray-100'>
                <Pen color='black' size={67} className='border px-5 rounded-lg' />
            </Button>

            <Modal show={open} popup size="2xl" onClose={() => setOpen(false)}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: "20px", backdropFilter: "blur(10px)", padding: "0px", overflow: "hidden" }}>
                <Modal.Header className=' p-5  bg-gray-800 rounded-t-lg'>
                    <span className='text-white text-2xl font-bold'>Update Profile :</span>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} className='p-2 sm:p-8 flex flex-col gap-4 pb-5'>
                        {/* Name and Email Fields */}
                        <div className='sm:flex justify-between gap-5'>
                            <div className='mt-2 w-full sm:w-1/2'>
                                <Label htmlFor="name" value="Name :" />
                                <TextInput id="name" type="text" name='name' placeholder="Jake" disabled={loading} value={input.name} onChange={handleChange} />
                            </div>
                            <div className='mt-2 w-full sm:w-1/2'>
                                <Label htmlFor="email" value="Email :" />
                                <TextInput id="email" type="email" name='email' placeholder="Jake@gmail.com" disabled={loading} value={input.email} onChange={handleChange} />
                            </div>
                        </div>

                        {/* Phone Number and Profession Fields */}
                        <div className='sm:flex justify-between gap-5'>
                            <div className='mt-2 w-full sm:w-1/2'>
                                <Label htmlFor="phoneNumber" value="Phone Number :" />
                                <TextInput id="phoneNumber" type="number" name='phoneNumber' placeholder="838942****" disabled={loading} value={input.phoneNumber} onChange={handleChange} />
                            </div>
                            <div className='mt-2 w-full sm:w-1/2'>
                                <Label htmlFor="profession" value="Profession :" />
                                <TextInput id="profession" type="text" name='profession' placeholder="Profession" disabled={loading} value={input.profession} onChange={handleChange} />
                            </div>
                        </div>

                        {/* Bio Field */}
                        <div className='mt-2'>
                            <Label htmlFor="bio" value="Bio :" />
                            <Textarea id="bio" name='bio' placeholder="Bio" disabled={loading} value={input.bio} onChange={handleChange} />
                        </div>

                        {/* Skills Field */}
                        <div className='mt-2'>
                            <Label htmlFor="skills" value="Skills :" />
                            <TextInput id="skills" type="text" name='skills' placeholder="" disabled={loading} value={input.skills} onChange={handleChange} />
                        </div>

                        {loading ? (
                            <button className='bg-gray-400 cursor-not-allowed py-2 rounded flex justify-center' type="submit" disabled>
                                <Loader2 className='mr-2 animate-spin text-2xl' /> Updating...
                            </button>
                        ) : (
                            <button className='border primary-bg primary-border py-2 rounded' type="submit">
                                Update Profile
                            </button>
                        )}
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default UpdateProfileDialog;
