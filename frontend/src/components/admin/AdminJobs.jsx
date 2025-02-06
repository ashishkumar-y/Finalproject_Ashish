import { Button, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import CompanyTable from './CompanyTable'
import { useNavigate } from 'react-router-dom'
import UseGetAllCompanies from '../../hooks/UseGetAllCompanyData'
import AdminJobTable from './AdminJobsTable'
import UseGetAllAdminJobs from '../../hooks/UseGetAllAdminJobs'

const AdminJobs = () => {
    UseGetAllAdminJobs()
    UseGetAllCompanies();
    const navigate = useNavigate()
    const [input, setInput] = useState("");

    return (
        <div className=' py-24 min-h-screen'>
            <div className='mt-5 max-w-4xl mx-auto  shadow-xl bg-white rounded-lg my-5 py-8 px-4 flex flex-col gap-4'>
                <div className='flex  justify-between'>
                    <Button onClick={() => { navigate("/admin/jobs/create") }} className='flex w-fit flex-row px-6 border primary-bg'>New job</Button>
                </div>
                <h1 className='text-gray-900 text-lg font-bold'>All Jobs</h1>
                <AdminJobTable />
                <p className='text-gray-300 text-sm flex justify-center'>A list of your recent Posted jobs</p>
            </div>
        </div>
    )
}

export default AdminJobs;