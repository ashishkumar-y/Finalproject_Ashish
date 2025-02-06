import { toast } from "react-toastify";

// API Endpoints
export const USER_API_END_POINT = `https://jobkhojoo.vercel.app/api/v1/user`;
export const JOBS_API_END_POINT = `https://jobkhojoo.vercel.app/api/v1/job`;
export const APPLICATION_JOB_API_END_POINT = `https://jobkhojoo.vercel.app/api/v1/application`;
export const COMPANY_API_END_POINT =`https://jobkhojoo.vercel.app/api/v1/company`;

// export const USER_API_END_POINT = `http://localhost:8000/api/v1/user`;
// export const JOBS_API_END_POINT = `http://localhost:8000/api/v1/job`;
// export const APPLICATION_JOB_API_END_POINT = `http://localhost:8000/api/v1/application`;
// export const COMPANY_API_END_POINT =`http://localhost:8000/api/v1/company`;

export const handleSuccess = (msg) => {
    toast.success(msg, {
        position: 'bottom-right'
    })
}

export const handleError = (msg) => {
    toast.error(msg, {
        position: 'bottom-right'
    })
}
