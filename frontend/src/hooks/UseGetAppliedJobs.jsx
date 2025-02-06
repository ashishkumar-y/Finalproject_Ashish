import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_JOB_API_END_POINT } from "../utils/constant";
import { setAllAppliedJobs } from "../redux/jobSlice";

const useGetAppliedJobs = () => {
  const { userToken } = useSelector((store) => store.auth);
  const appliedJobs = useSelector((store) => store.job.appliedJobs);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_JOB_API_END_POINT}/get`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.data));
        }
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      }
    };

    if (userToken) {
      fetchAppliedJobs();
    }
  }, [userToken, dispatch]);// Dependencies ensure API call on userToken change

  return appliedJobs;
};

export default useGetAppliedJobs;
