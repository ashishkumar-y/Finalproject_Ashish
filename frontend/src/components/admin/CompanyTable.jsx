import { Avatar, Popover, Table, TableRow } from 'flowbite-react'
import { Edit2, MoreHorizontal } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompanyTable = () => {

    const navigate = useNavigate()
    const { allCompanies } = useSelector(store => store.company)

    return (
        <div>
            <div className="overflow-x-auto hide-scrollbar">
                <Table className='my-4 border border-black flex-nowrap shrink-0 overflow-x-scroll max-w-[600px] '>
                    <Table.Head className='shadow-lg '>
                        <Table.HeadCell className='text-gray-800'>Logo</Table.HeadCell>
                        <Table.HeadCell className='text-gray-800 '>Name</Table.HeadCell>
                        <Table.HeadCell className='text-gray-800'>Date</Table.HeadCell>
                        <Table.HeadCell className='text-gray-800'>Action</Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                        {
                            allCompanies.length < 0 ? <span>No companies !</span>
                                :
                                (<>
                                    {allCompanies.map((items) => (
                                        <TableRow key={items._id} className='shadow-sm'>
                                            <Table.Cell className='text-gray-700 flex '> <img className='h-12 m-0' src={'https://i.pinimg.com/736x/db/4b/bd/db4bbdb49d44d22ec2ecc467a77c8182.jpg'} /></Table.Cell>
                                            <Table.Cell className='text-gray-700'>{items.name}</Table.Cell>
                                            <Table.Cell className='text-gray-700 flex shrink-0 whitespace-nowrap sm:whitespace-normal md:whitespace-nowrap'>{items.createdAt.split("T")[0]}</Table.Cell>
                                            <Table.Cell className='text-gray-700 cursor-pointer'>
                                                <Popover aria-labelledby="default-popover" placement="right" className='cursor-pointer' content={
                                                    <div onClick={() => navigate(`/admin/companies/${items._id}`)} className='border cursor-pointer flex gap-3  bg-white shadow-xl  rounded-md px-4 py-3 '>
                                                        <Edit2 size={24} />
                                                        <span>Edit</span>
                                                    </div>
                                                } >
                                                    <MoreHorizontal />
                                                </Popover>
                                            </Table.Cell>
                                        </TableRow>
                                    ))
                                    }  </>)}
                    </Table.Body>
                </Table>
            </div>

        </div>
    )
}

export default CompanyTable
