import React, { useState } from 'react';
import { Avatar, Tooltip } from 'flowbite-react';
import { Contact, Mail, ShieldCheck, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import avatarIcon1 from '../assets/asset 1.png';
import { USER_API_END_POINT } from '../utils/constant';
import UseGetAppliedJobs from '../hooks/UseGetAppliedJobs';

const Profile = () => {
  UseGetAppliedJobs()
  const isResume = true;
  const { user, profilePhotoUrl } = useSelector(store => store.auth);
  const [open, setOpen] = useState(false);

  return (
    <div className={` ${user?.role === 'recruiter' ? "h-screen" : "min-h-screen"} pt-10`}>
      {user ? (
        <div className='max-w-4xl mx-auto'>
     
          <div className='mt-10 max-w-4xl border mx-auto border-gray-200 shadow-xl bg-white rounded-lg my-5 p-8 flex flex-col gap-4'>
            <div className='flex justify-between'>
             
              <div className='sm:flex items-center gap-4'>
                <Avatar
                  className='cursor-pointer inline-flex p-1 text-2xl border rounded-full'
                  size='xl'
                  img={user.profile.profilePhoto ? `${USER_API_END_POINT}/${user.profile.profilePhoto}` : avatarIcon1}
                  alt='profile'
                  rounded
                />
                <div className='mt-3 capitalize'>
                  <Tooltip content={user?.role === 'recruiter' ? 'Verified as Recruiter' : 'User'}>
                    <h2 className='text-gray-900 font-semibold text-2xl flex items-center gap-2 cursor-pointer'>
                      {user.name}{' '}
                      <span className='text-gray-500 text-sm'>
                        {user.role === 'recruiter' ? <ShieldCheck color='black' size={30} /> : <User />}
                      </span>
                    </h2>
                  </Tooltip>
                  <p className='text-gray-400 sm:ml-1'>{user.profile.profession || 'Enter profession'}</p>
                </div>
              </div>
              <UpdateProfileDialog open={open} setOpen={setOpen} />
            </div>

         
            <div className='sm:mt-4 w-full'>
              <p className='text-gray-800 max-w-xl'>{user.profile.bio || 'Enter bio'}</p>
            </div>

      
            <div className='mt-4'>
              <h1 className='text-gray-800 font-bold'>Contacts</h1>
              <div className='flex gap-4 items-center my-2'>
                <Mail color='black' />
                <span className='text-gray-800'>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </span>
              </div>
              <div className='flex gap-4 items-center my-2'>
                <Contact color='black' />
                <span className='text-gray-800'>{user.phoneNumber}</span>
              </div>
            </div>


            {user?.role === 'recruiter' ? "" : <div className='my-3'>
              <h1 className='text-gray-800 font-bold'>Skills</h1>
              <div className='px-5 flex flex-wrap gap-1'>
                {user.profile.skills.length !== 0 ? (
                  user.profile.skills.map((skill, index) => (
                    <span key={index} className='bg-gray-900 border border-black text-sm p-0.5 rounded-xl px-3 text-gray-50'>
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className='text-gray-900'>NA</span>
                )}
              </div>
            </div>
            }

          </div>

          {user?.role === 'recruiter' ? "" :

            <div className='border bg-white rounded-lg my-5 p-8 shadow-xl'>
              <h1 className='text-gray-900 text-lg font-bold'>Applied Jobs</h1>
              <AppliedJobTable />
            </div>}
        </div>
      ) : (
        <div className='max-w-4xl h-screen mx-auto'>
          <div className='mt-10 max-w-4xl border mx-auto border-gray-200 shadow-xl bg-white rounded-lg my-5 p-8 flex flex-col gap-4'>
            <h1 className='primary-color text-4xl font-bold flex justify-center items-center'>
              Sorry, You are Not Logged In!
            </h1>
          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;
