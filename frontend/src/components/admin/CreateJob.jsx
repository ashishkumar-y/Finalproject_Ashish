import axios from 'axios'
import {  Label, Textarea, TextInput, Select } from 'flowbite-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { JOBS_API_END_POINT, } from '../../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setAllSingleCompany, } from '../../redux/companyslice'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { setAllJobs } from '../../redux/jobSlice'


const CreateJob = () => {
    const { userToken, user } = useSelector(store => store.auth);
    const companyArray = [];

    const [input, setInput] = useState({
        tittle: "",
        description: "",
        requirements: "",
        jobType: "",
        salary: "",
        location: "",
        experience: "",
        position: "",
        companyId: ""
    })

    const { allCompanies } = useSelector(store => store.company)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)


    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value },)
    }

    const handleSelectChange = (value) => {
        console.log(value);
        const selectedCompany = allCompanies.find((company) => company.name.toLowerCase() === value)
        console.log(selectedCompany);
        setInput({ ...input, companyId: selectedCompany?._id })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(input);

        try {
            setLoading(true);
            const res = await axios.post(`${JOBS_API_END_POINT}/add`, input, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`
                },
                withCredentials: true
            })

            if (res?.data?.success) {
                alert(res.data.message)
                navigate(`/admin/jobs`)
            }
        } catch (error) {
            console.error("Error:", error.response?.data?.error || "Something went wrong");
            alert(error.response?.data?.error || "Something went wrong");
        } finally { setLoading(false) }
    }

    return (
        <div className=' pt-24'>
            <div className='max-w-4xl mx-auto'>
                {
                    user ?

                        <div >
                            <div className='flex justify-between max-w-4xl mx-auto items-center gap-5 p-2'>
                                <button onClick={() => navigate(-1)} className='flex items-center gap-2 rounded border px-4 py-2'>
                                    <ArrowLeft />
                                    <span>Back</span>
                                </button>
                                <h1 className='font-bold text-2xl'>Job Create:</h1>
                            </div>
                            <div className='max-w-2xl mx-auto my-5 border pt-2 p-5 bg-white rounded-xl'>
                                <form onSubmit={handleSubmit} className='p-2 sm:p-8 flex flex-col gap-4 pb-5'>
                                    <div className='sm:flex justify-between gap-5'>
                                        <div className='mt-2 w-full sm:w-1/2'>
                                            <Label htmlFor="tittle" value="Job Tittle:" />
                                            <TextInput id="tittle" type="text" name='tittle' placeholder="ex: Fullstack" disabled={loading} value={input.tittle} onChange={handleChange} />
                                        </div>
                                        <div className='mt-2 w-full sm:w-1/2'>
                                            <Label htmlFor="description" value="Description:" />
                                            <Textarea id="description" name='description' placeholder="Enter Description" disabled={loading} value={input.description} onChange={handleChange} />
                                        </div>
                                    </div>

                                    <div className='sm:flex justify-between items-center gap-5'>
                                        <div className='sm:mt-2 w-full sm:w-1/2'>
                                            <Label htmlFor="jobType" value="Job Type:" />
                                            <TextInput id="jobType" type="text" name='jobType' placeholder="full Time  / part Time" disabled={loading} value={input.jobType} onChange={handleChange} />
                                        </div>
                                        <div className='mt-2 w-full sm:w-1/2'>
                                            <Label htmlFor="salary" value="Salary:" />
                                            <TextInput id="salary" type="number" name='salary' placeholder="" disabled={loading} value={input.salary} onChange={handleChange} />
                                        </div>
                                    </div>

                                    <div className='sm:flex justify-between gap-5 items-center'>
                                        <div className='sm:mt-2 w-full sm:w-1/2'>
                                            <Label htmlFor="location" value="location:" />
                                            <TextInput id="location" type="text" name='location' placeholder="chandigarh , Mumbai, etc" disabled={loading} value={input.location} onChange={handleChange} />
                                        </div>
                                        <div className='mt-2 w-full sm:w-1/2'>
                                            <Label htmlFor="experience" value="Experience Required:" />
                                            <TextInput id="experience" type="number" name='experience' placeholder="" disabled={loading} value={input.experience} onChange={handleChange} />
                                        </div>
                                    </div>

                                    <div className='sm:flex justify-between gap-5 items-center'>
                                        <div className='sm:mt-2 w-full sm:w-1/2'>
                                            <Label htmlFor="position" value="No of position:" />
                                            <TextInput id="position" type="number" name='position' placeholder="" disabled={loading} value={input.position} onChange={handleChange} />
                                        </div>
                                        <div className='mt-2 w-full sm:w-1/2'>
                                            <Label htmlFor="requirements" value="Skills Requirements:" />
                                            <TextInput id="requirements" type="text" name='requirements' placeholder="" disabled={loading} value={input.requirements} onChange={handleChange} />
                                        </div>
                                    </div>


                                    {allCompanies.length <= 0 ? <span>No Companies</span> :

                                        <div className="max-w-sm">
                                            <div className="mb-2 block ">
                                                <Label htmlFor="company" value="Select your company" />
                                            </div>
                                            <Select className=' max-w-sm ' onChange={(e) => handleSelectChange((e.target.value))} id="company" required>
                                                <option>Select company</option>
                                                {
                                                    allCompanies.map((items) => (
                                                        <option key={items?._id} value={items?.name?.toLowerCase()}>{items?.name}</option>
                                                    ))
                                                }
                                            </Select>
                                        </div>

                                    }

                                    {/* // Submit Button */}
                                    {loading ? (
                                        <button className='bg-gray-400 cursor-not-allowed py-2 rounded flex justify-center' type="submit" disabled>
                                            <Loader2 className='mr-2 animate-spin text-2xl' /> Creating...
                                        </button>
                                    ) : (
                                        <button className='border primary-bg primary-border py-2 rounded' type="submit">
                                            Create
                                        </button>
                                    )}
                                </form>

                                {
                                    allCompanies?.length <= 0 ? <span className='text-red-700'>Please register Company First</span> : ""
                                }
                            </div>
                        </div> :
                        <div className='max-w-4xl h-screen mx-auto'>
                            <div className='mt-10 max-w-4xl border mx-auto border-gray-200 shadow-xl bg-white rounded-lg my-5 p-8 flex flex-col gap-4'>
                                <h1 className='primary-color text-4xl font-bold flex justify-center items-center'>
                                    Sorry, You are Not Logged In!
                                </h1>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default CreateJob
