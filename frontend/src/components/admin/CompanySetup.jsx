import axios from 'axios'
import { Label, TextInput } from 'flowbite-react'
import { ArrowLeft, Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { COMPANY_API_END_POINT } from '../../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setAllSingleCompany } from '../../redux/companyslice'

const CompanySetup = () => {
    const { userToken } = useSelector(store => store.auth)
    const { singleCompany } = useSelector(store => store.company)
    const params = useParams()
    const companyId = params.id
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        logo: "",
    })

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    },
                    withCredentials: true
                })
                if (res.data?.success) {
                    dispatch(setAllSingleCompany(res.data?.data))
                    setInput({
                        name: res.data.data.name || "",
                        description: res.data.data.description || "",
                        website: res.data.data.website || "",
                        location: res.data.data.location || "",
                        logo: res.data.data.logo || "",
                    })
                }
            } catch (error) {
                console.error("Error fetching company data:", error)
            }
        }
        if (companyId) fetchCompanyData()
    }, [companyId, dispatch, userToken])

    const handleChange = (e) => {
        setInput({ ...input, [e.target?.name]: e.target.value })
    }

    const handleFile = (e) => {
        const file = e?.target?.files?.[0]
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        if (!input.name) {
            alert(`name can't be empty`)
        }

        const formData = new FormData()
        formData.append("name", input.name)
        formData.append("description", input.description)
        formData.append("website", input.website)
        formData.append("location", input.location)

        if (input.logo) {
            formData.append("logo", input.logo)
        }

        try {
            setLoading(true)
            const res = await axios.post(`${COMPANY_API_END_POINT}/updateCompany/${companyId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${userToken}`
                },
                withCredentials: true
            })

            if (res.data?.success) {
                dispatch(setAllSingleCompany(res.data?.data))
                alert(res.data.message)
                navigate("/admin/companies")
            } else {
                alert("Unexpected response format")
            }
        } catch (error) {
            console.error("Error:", error)
            alert(error.response?.data?.message || "An error occurred")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='h-screen w-full py-24'>
            <div className='flex justify-between max-w-4xl mx-auto items-center gap-5 p-2'>
                <button onClick={() => navigate(-1)} className='flex items-center gap-2 rounded border px-4 py-2'>
                    <ArrowLeft />
                    <span>Back</span>
                </button>
                <h1 className='font-bold text-2xl'>Company Setup:</h1>
            </div>
            <div className='max-w-2xl mx-auto my-5 border p-5 bg-white rounded-xl'>
                <form onSubmit={submitHandler} className='p-2 sm:p-8 flex flex-col gap-4 pb-5'>
                    <div className='sm:flex justify-between gap-5'>
                        <div className='mt-2 w-full sm:w-1/2'>
                            <Label htmlFor="name" value="Name:" />
                            <TextInput id="name" type="text" name='name' placeholder="Jake" disabled={loading} value={input.name} onChange={handleChange} />
                        </div>

                        <div className='mt-2 w-full sm:w-1/2'>
                            <Label htmlFor="description" value="Description:" />
                            <TextInput id="description" name='description' placeholder="Enter Description" disabled={loading} value={input.description} onChange={handleChange} />
                        </div>
                    </div>

                    <div className='sm:flex justify-between gap-5'>
                        <div className='mt-2 w-full sm:w-1/2'>
                            <Label htmlFor="website" value="Website:" />
                            <TextInput id="website" type="text" name='website' placeholder="" disabled={loading} value={input.website} onChange={handleChange} />
                        </div>
                        <div className='mt-2 w-full sm:w-1/2'>
                            <Label htmlFor="location" value="Location:" />
                            <TextInput id="location" type="text" name='location' placeholder="" disabled={loading} value={input.location} onChange={handleChange} />
                        </div>
                    </div>

                    <div className='w-full sm:1/2'>
                        <Label htmlFor="logo" value="Logo:" />
                        <input id="logo" name='logo' type="file" accept="image/*" disabled={loading} onChange={handleFile} className="block w-full sm:w-1/2 text-sm text-gray-900 border rounded-lg cursor-pointer bg-gray-50 focus:outline-none" />
                    </div>

                    {/* // Submit Button */ }
                    {loading ? (
                        <button className='bg-gray-400 cursor-not-allowed py-2 rounded flex justify-center' type="submit" disabled>
                            <Loader2 className='mr-2 animate-spin text-2xl' /> Updating...
                        </button>
                    ) : (
                        <button className='border primary-bg primary-border py-2 rounded' type="submit">
                            Update
                        </button>
                    )}
                </form>
            </div>
        </div>
    )
}

export default CompanySetup
