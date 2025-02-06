import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Avatar, Button, Popover, Tooltip } from "flowbite-react";
import { NAVIGATION_ADMIN_LINKS, NAVIGATION_LOGO, NAVIGATION_USER_LINKS } from '../data/data.jsx';
import { useSelector } from 'react-redux';
import avatarIcon1 from "../assets/asset 1.png"
import LogoutPopup from './auth/LogoutPopup.jsx';
import { ShieldCheck, User } from 'lucide-react';
import { USER_API_END_POINT } from '../utils/constant.js';


const Navbar = () => {
  const { open, setOpen } = useState(false);
  const { user, profilePhotoUrl } = useSelector(store => store.auth);

  return (
    <>
      <nav className='w-auto flex justify-center items-center  '>
        <div className=' flex p-5 items-center main-background-color  justify-between max-w-7xl h-16 top-0 fixed w-full mx-auto rounded-xl z-50  main-background-color'>
          <div >
            {NAVIGATION_LOGO.logo}
          </div>
          <div className='flex  gap-12 relative'>
            <ul className=' flex items-center gap-5 '>
              {user?.role == 'recruiter' ?
                NAVIGATION_ADMIN_LINKS.map((items, index) =>
                (<li key={index} >
                  <NavLink className=" p-0.5 " to={items.to}>{items.label}</NavLink>
                </li>)
                )
                : NAVIGATION_USER_LINKS.map((items, index) =>
                (<li key={index} >
                  <NavLink className=" p-0.5 " to={items.to}>{items.label}</NavLink>
                </li>)
                )
              }
            </ul>
            {!user ? <div className="flex text-sm justify-between items-center p-1 gap-3 ">
              <Link to="/login" className="flex gap-2 primary-border text-black text-[10px] justify-center items-center font-semibold px-3 py-1.5 rounded-lg border " >
                LogIn
              </Link>
              <Link to="/signup" className="primary-bg text-white flex gap-2 justify-center font-semibold items-center text-[10px] px-3 py-1.5 rounded-lg border" >
                SignUp
              </Link>
            </div> : (

              <Popover className=' pl-1 bg-white rounded-xl shadow-lg mt-10 delay-75 '
                content={
                  <div className="w-64 p-3 ">
                    <div className="flex items-center justify-between  mb-2">
                      <Avatar className='cursor-pointer border rounded-full p-1' img={user.profile.profilePhoto ? `${USER_API_END_POINT}/${user.profile.profilePhoto}` : avatarIcon1} alt="userImg" rounded />
                    </div>
                    <Tooltip content={` ${user.role == 'recruiter' ? 'Verified as Recruiter' : "User"}`} animation="duration-500" placement="left" >
                      <h1 className=" cursor-pointer inline-flex text-lg font-semibold text-gray-900 flx gap-2">{user.name} <span className='text-gray-500 text-sm '>{user.role == 'recruiter' ? <ShieldCheck color='black' /> : <User />}</span></h1>
                    </Tooltip>
                    <p className="text-sm mb-1 text-gray-400">{user.profile.profession}</p>
                    <div className='p-1 flex  justify-around w-full  items-center'>
                      <Link to='/profile' className="text-gray-800 hover:bg-gray-100 border primary-border  font-medium rounded-lg text-sm px-2 py-1 mx-1 text-center items-center flex w-full gap-2 "> <User color='black' /> Profile</Link>
                      <LogoutPopup open={open} setOpen={setOpen} />
                    </div>
                  </div>
                } >
                <Avatar className='cursor-pointer border rounded-full' img={user.profile.profilePhoto ? `${USER_API_END_POINT}/${user.profile.profilePhoto}` : avatarIcon1} alt="avatar of Jese" rounded />
              </Popover>
            )}
          </div >
        </div >
      </nav >
    </>
  )
}

export default Navbar
