import React from 'react'
import Marquee from "react-fast-marquee";
import { WORKINGPARTNERS } from '../data/data.jsx'
import { motion } from "framer-motion"

const WorkingPartners = () => {
    return (
        <div className='gap-16 p-5 pt-0 mb-10'>

            <motion.h1
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 1 }}
                className='text-4xl font-bold m-auto justify-center flex items-center'>{WORKINGPARTNERS.tittle}</motion.h1>
            <Marquee className='mt-10' speed={50} pauseOnHover >
                <div className='flex gap-16 m-5 animate-marquee'> {WORKINGPARTNERS.CompaniesLogo.map((items, index) => (
                    <img key={index} src={items.img} alt={items.alt} className='rounded-xl p-1  cursor-pointer' style={{ width: "150px", height: "auto" }} />
                ))}
                </div>
            </Marquee>
        </div>
    )
}

export default WorkingPartners
