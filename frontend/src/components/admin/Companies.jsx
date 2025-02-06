import { Button } from 'flowbite-react';
import React, { useState } from 'react';
import CompanyTable from './CompanyTable';
import { useNavigate } from 'react-router-dom';
import UseGetAllCompanies from '../../hooks/UseGetAllCompanyData';

const Companies = () => {
  
  // Custom hook to fetch all companies data
  UseGetAllCompanies();
  const navigate = useNavigate();


  return (
    <div className='py-24 min-h-screen'>
      <div className='mt-5 max-w-4xl mx-auto shadow-xl bg-white rounded-lg my-5 py-8 px-4 flex flex-col gap-4'>
        <div className='flex justify-between'>
          {/* Button to navigate to the company creation page */}
          <Button onClick={() => { navigate("/admin/companies/create") }} className='flex w-fit flex-row px-6 border primary-bg'>
            New Company
          </Button>
        </div>
        <h1 className='text-gray-900 text-lg font-bold'>All Companies</h1>
        <CompanyTable />
      </div>
    </div>
  );
}

export default Companies;
