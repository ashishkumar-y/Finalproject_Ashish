import React from 'react'
import { USERSREVIEWS } from '../data/data'
import { Star, StarOff } from "lucide-react";

const StarRating = ({ stars }) => {
    return (
        <div className="flex text-yellow-500">
            {[...Array(5)].map((_, index) => {
                if (index < stars) {
                    return <Star key={index} fill="currentColor" className="w-5 h-5" />;
                } else {
                    return <StarOff key={index} className="w-5 h-5 text-gray-400" />;
                }
            })}
        </div>
    );
};


const UsersReview = () => {
    return (
        <div className='m-6 pt-10'>

            <h1 className='m-8 text-4xl font-bold flex justify-center items-center p-1 mb-6'>
                {USERSREVIEWS.tittle}
            </h1>

            <div className=' sm:flex-wrap md:flex p-4 gap-6 w-full'>

                {USERSREVIEWS.users.map((items, index) => (
                    <div key={index} className='w-full sm:w-12 primary-border cursor-pointer rounded-xl p-2  mb-5 '>
                        <span className='flex '>
                            <img src={items.profile} alt="" style={{ height: 60 }} className='rounded-full' />
                            <span className='w-full p-2'>
                                <h3 className='font-bold text-lg'>{items.name}</h3>
                                <StarRating stars={items.stars} />
                            </span>
                        </span>
                        <p className='text-gray-400 text-sm'>{items.review}</p>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default UsersReview;
