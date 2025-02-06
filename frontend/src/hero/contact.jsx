import React from 'react';
import { CONTACT_DATA } from '../data/data';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Contact = () => {

    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    const submitFn = (e) => {
        e.preventDefault()

        if (!user) {
            navigate('/signup')
        }
        if (user) {
            toast.error('Already Login')
        }
    }
    return (
        <div className='w-full p-5 px-40 mt-10 mb-7 fle justify-center ' >
            <div className='justify-center items-center gap-6 m-10 p-4 border w-[800px] rounded-xl overflow-hidden  flex'>
                <div className='px-5 text-center'>
                    <h1 className='m-8 text-4xl font-bold flex justify-center items-center p-1'> {CONTACT_DATA.tittle} </h1>
                </div>
                <button onClick={submitFn}
                    className=' shadow text-3xl p-6 rounded-xl  primary-bg cursor-pointer font-bold w-52 text-center transition delay-75'>
                    {CONTACT_DATA.btn}
                </button>
            </div>
        </div>
    )
}

export default Contact
