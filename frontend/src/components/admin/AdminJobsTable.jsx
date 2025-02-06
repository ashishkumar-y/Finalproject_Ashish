import { Avatar, Popover, Table, TableRow } from 'flowbite-react'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import store from '../../redux/store'

const AdminJobTable = () => {
    const navigate = useNavigate()
    const { allAdminJobs } = useSelector(store => store.job)

    return (
        <div>
            <div className="overflow-x-auto hide-scrollbar">
                <Table className='my-4 border border-black flex-nowrap shrink-0 overflow-x-scroll max-w-[600px] '>
                    <Table.Head className='shadow-lg '>
                        <Table.HeadCell className='text-gray-800'>Company Name</Table.HeadCell>
                        <Table.HeadCell className='text-gray-800 '>Role</Table.HeadCell>
                        <Table.HeadCell className='text-gray-800'>Date</Table.HeadCell>
                        <Table.HeadCell className='text-gray-800'>Action</Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                        {
                            allAdminJobs.length < 0 ? <span>No jobs !</span>
                                :
                                (<>
                                    {allAdminJobs.map((items) => (
                                        <TableRow key={items._id} className='shadow-sm'>
                                            <Table.Cell className='text-gray-700'>{items.company}</Table.Cell>
                                            <Table.Cell className='text-gray-700'>{items.tittle}</Table.Cell>
                                            <Table.Cell className='text-gray-700 flex shrink-0 whitespace-nowrap sm:whitespace-normal md:whitespace-nowrap'>{items.createdAt.split("T")[0]}</Table.Cell>
                                            <Table.Cell className='text-gray-700 cursor-pointer'>
                                                <Popover aria-labelledby="default-popover" placement="right" className='cursor-pointer' content={
                                                    <div className='border cursor-pointer gap-3  bg-white shadow-xl p-1  rounded-md px-2 py  '>
                                                        <div onClick={() => navigate(`/admin/job/${items._id}/applicant`)} className=' cursor-pointer flex gap-3   rounded-md px-4 py-3 '>
                                                            <Eye size={20} />
                                                            <span>Applicant</span>
                                                        </div>
                                                    </div>
                                                } >
                                                    <MoreHorizontal />
                                                </Popover>
                                            </Table.Cell>
                                        </TableRow>
                                    ))}
                                </>)}
                    </Table.Body>
                </Table>
            </div>
        </div>
    )
}

export default AdminJobTable 
