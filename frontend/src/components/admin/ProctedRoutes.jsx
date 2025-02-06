import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoutes = ({ children }) => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== "recruiter") {
            navigate("/");
        }
    }, [user, navigate]); // Added dependencies

    return <>{children}</>;
};

export default ProtectedRoutes;
