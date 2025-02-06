import React, { useState } from 'react';
import heroImg from '../assets/asset 0.png';
import { HERO } from '../data/data.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../redux/jobSlice.js';
import store from '../redux/store.js';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const Hero1 = () => {

    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const { searchQuery } = useSelector(store => store.job);
    const navigate = useNavigate()

    const searchJobHandler = (e) => {
        e.preventDefault()
        dispatch(setSearchQuery(query))
        navigate("/browse")
    }

    return (
        <div className=' mt- sm:flex w-full  overflow-hidden  ' style={{ padding: '30px' }}>

            <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 1 }}
                className="left w-full sm:w-1/2 flex justify-center items-center">

                <div className='  h-fit text-start flex flex-col items-start pl-10 '>

                    <h1 className='text-7xl font-extrabold m-8 flex justify-center items-center p-1'>
                        {HERO.tittle}
                    </h1>
                    <p className='text-lg m-2 mt-4 text-gray-300 ' style={{ maxWidth: '540px' }}>{HERO.description}</p>

                    <form className="max-w-md mx-auto overflow-hidden bg-white w-full rounded-r-lg">
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium outline-none text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative ">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            </div>
                            <input type="search"
                                id="default-search"
                                name=''
                                onChange={(e) => setQuery(e.target.value)}
                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search Mockups, Logos..."
                                required />
                            <button type="submit"
                                onClick={searchJobHandler}
                                className="text-white absolute end-2.5 bottom-2.5 primary-bg focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </form>



                </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 1 }}
            className="right w-full sm:w-1/2 p-7 flex justify-center items-center pt-10">
                <img src={heroImg} className=' select-none object-cover' style={{ height: '500px', width: 'auto' }} alt="hero" />

            </motion.div>
        </div>
    )
}

export default Hero1
