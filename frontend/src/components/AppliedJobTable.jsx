import React from 'react'
import { Table, TableRow } from "flowbite-react";
import { useSelector } from 'react-redux';



const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector((store) => store.job)

    return (
        <div className=' '>
            <div className="overflow-x-auto hide-scrollbar">
                <Table className='my-4 border border-black flex-nowrap shrink-0 overflow-x-scroll max-w-[600px] '>
                    <Table.Head className='shadow-lg '>
                        <Table.HeadCell className='text-gray-800'>Date</Table.HeadCell>
                        <Table.HeadCell className='text-gray-800'>Job role</Table.HeadCell>
                        <Table.HeadCell className='text-gray-800'>Company</Table.HeadCell>
                        <Table.HeadCell className='text-gray-800'>Status</Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                        {allAppliedJobs <= 0 ? <span className='text-gray-400'>No Jobs Applied</span> :
                            allAppliedJobs.map((items, index) => (
                                <TableRow key={index} className='shadow-sm'>
                                    <Table.Cell className='text-gray-700 flex shrink-0 whitespace-nowrap sm:whitespace-normal md:whitespace-nowrap'> {items.job.createdAt.split("T")[0]}</Table.Cell>
                                    <Table.Cell className='text-gray-700'>{items.job.tittle}</Table.Cell>
                                    <Table.Cell className='text-gray-700'>{items.job.company}</Table.Cell>
                                    <Table.Cell className='text-gray-700'>
                                        <span className={` border ${items.status.toLowerCase() === "accepted"? "bg-green-400" : ""} ${items.status.toLowerCase() === "rejected"? "bg-red-500" : ""} bg-gray-500 border-black text-sm p-0.5 rounded-xl py-1 px-3 text-white`}>{items.status.toUpperCase()}</span>
                                    </Table.Cell>
                                </TableRow>
                            ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    )
}

export default AppliedJobTable
