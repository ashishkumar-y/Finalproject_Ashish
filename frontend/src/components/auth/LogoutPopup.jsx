import React from 'react'
import { Button, Modal,  } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut } from 'lucide-react';
import { setUser } from '../../redux/authSlice';
import { toast, ToastContainer } from 'react-toastify';


const LogoutPopup = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);

    function submitFn(e) {
        e.preventDefault()
        try {
            setLoading(true)
            dispatch(setUser(null))
            setOpen(false)
            if (user == null) {
                setLoading(false)
                navigate('/');
                alert(`Logout successfully`)
                toast.success('Logout successfully')
            }
        } catch (error) {
            console.log("error",error);
        }
    }
    return (
        <div>
    
            <Link onClick={() => setOpen(true)} className="text-white border font-medium primary-bg rounded-lg text-sm px-2 py-1 mx-1 text-center items-center flex w-full gap-2 "> <LogOut color='white' /> LogOut</Link>

            <Modal style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', padding: "0px", borderRadius: "20px", overflowX: "hidden", overflowY: "scroll", }} show={open} popup size="xl" onClose={() => setOpen(false)}>
                <Modal.Header className='main-background-color p-5 ' ><span className='text-white text-2xl font-bold '>LogOut :</span></Modal.Header>
                <Modal.Body>
                    <div className=' h-56 flex justify-center items-center'>
                        <div className="text-center">
                            <h3 className="mb-5 text-xl font-normal text-gray-500 dark:text-gray-400"> Are you sure you want to logout ?   </h3>
                            <div className="flex justify-center gap-4">
                                <Button type='submit' className='primary-bg' onClick={submitFn} >
                                    {"Yes, I'm sure"}
                                </Button>
                                <Button color="gray" onClick={() => setOpen(false)}>
                                    No, cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>

    )
}

export default LogoutPopup;

