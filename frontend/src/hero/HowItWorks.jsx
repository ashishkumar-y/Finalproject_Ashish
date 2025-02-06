import React from 'react'
import { HOWITWORKS } from '../data/data'
import '../index.css'
import { motion } from "framer-motion"


const HowItWorks = () => {
    return (
        <div className='p-16 mt-10 mb-1 '>

            <motion.h1
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 1 }}
                className='m-8 text-4xl font-bold flex justify-center items-center p-1'>
                {HOWITWORKS.tittle}
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 1 }}
            className='text-gray-400 mx-auto max-w-lg text-center p-1 mt-2 text-lg'>
                {HOWITWORKS.description}
            </motion.p>

            <div className='flex flex-col sm:flex-row p-10 mt-10'>
                {/* Left Image Section */}
                <motion.div
                 initial={{ opacity: 0, x: -100 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -100 }}
                 transition={{ duration: 1 }}
                className="left w-full h-fit sm:w-1/2 flex justify-center ">
                    <img
                        className="object-cover" style={{ height: '450px' }}
                        src={HOWITWORKS.image.img}
                        alt={HOWITWORKS.image.alt}
                    />
                </motion.div>

                {/* Right Steps Section */}
                <motion.div 
                 initial={{ opacity: 0, x: 100 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -100 }}
                 transition={{ duration: 1 }}
                className="right flex flex-col justify-center items-center w-full sm:w-1/2 p-5">
                    <div className='p-4 '>
                        {HOWITWORKS.steps.map((items, index) => (
                            <div key={index} className="p-10 rounded mb-5 flex items-center justify-start">
                                <div className=' primary-bg  min-h-fit p-3 rounded-full '><img
                                    src={items.img}
                                    alt={items.alt}
                                    className="w-12 h-12 object-contain bg-transparent"
                                /></div>
                                <span className='pl-2.5'>
                                    <h2 className="text-lg font-semibold text-gray-200">{items.heading}</h2>
                                    <p className="text-gray-400">{items.explanation}</p>
                                </span>
                            </div>
                        ))}</div>
                </motion.div>
            </div>
        </div>
    )
}

export default HowItWorks
