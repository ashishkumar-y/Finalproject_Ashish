import { Avatar, Popover, Table, TableRow } from 'flowbite-react'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import store from '../../redux/store'
import axios from 'axios'
import { APPLICATION_JOB_API_END_POINT } from '../../utils/constant'

const ApplicantsTable = () => {

    const navigate = useNavigate()
    const { allCompanies } = useSelector(store => store.company)
    const { allAdminJobs } = useSelector(store => store.job)
    const { applicants } = useSelector(store => store.application)
    const { userToken, user } = useSelector(store => store.auth);

    const ShortList = ["Accepted", "Rejected"];

    const statusHandler = async (status, Id) => {
        try {
            console.log(`${APPLICATION_JOB_API_END_POINT}/status/${Id}/update`);
            const res = await axios.post(`${APPLICATION_JOB_API_END_POINT}/status/${Id}/update`, { status }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                },
                withCredentials: true
            })

            if (res.data.success) {
                alert(res.data.message)
                console.log(res.data);


            }

        } catch (error) {
            console.log(error);
            alert(error.response.data.message)
        }

    }

    return (
        <div>
            <div className="overflow-x-auto hide-scrollbar">
                <Table className='my-4 border border-black flex-nowrap shrink-0 overflow-x-scroll max-w-[600px] '>
                    <Table.Head className='shadow-lg '>
                        <Table.HeadCell className='text-gray-800'>Name</Table.HeadCell>
                        <Table.HeadCell className='text-gray-800 '>Email</Table.HeadCell>
                        <Table.HeadCell className='text-gray-800'>Contact</Table.HeadCell>
                        <Table.HeadCell className='text-gray-800'>Date</Table.HeadCell>
                        <Table.HeadCell className='text-gray-800'>Action</Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                        {
                            applicants.length <= 0 ? ""
                                :
                                (<>
                                    {applicants.map((items) => (
                                        <TableRow key={items._id} className='shadow-sm'>
                                            <Table.Cell className='text-gray-700'>{items.applicant.name}</Table.Cell>
                                            <Table.Cell className='text-gray-700'>{items.applicant.email}</Table.Cell>
                                            <Table.Cell className='text-gray-700'>{items.applicant.phoneNumber}</Table.Cell>
                                            <Table.Cell className='text-gray-700 flex shrink-0 whitespace-nowrap sm:whitespace-normal md:whitespace-nowrap'>{items.createdAt.split("T")[0]}</Table.Cell>
                                            <Table.Cell className='text-gray-700 cursor-pointer'>
                                                <Popover aria-labelledby="default-popover" placement="right" className='cursor-pointer' content={
                                                    <div className='border cursor-pointer gap-3  bg-white shadow-xl p-1 fle rounded-md px-2 py  '>
                                                        {ShortList.map((status, index) => (
                                                            <div onClick={()=>statusHandler(status, items?._id)} key={index} className=' cursor-pointer flex gap-3  rounded-md px-2 py-1 '>
                                                                {/* <Edit2 size={20} /> */}
                                                                <span className='' >{status}</span>
                                                            </div>

                                                        ))}

                                                    </div>
                                                } >
                                                    <MoreHorizontal />
                                                </Popover>
                                            </Table.Cell>
                                        </TableRow>

                                    ))
                                    }


                                </>)

                        }

                    </Table.Body>
                </Table>
            </div>

        </div>
    )
}

export default ApplicantsTable 
