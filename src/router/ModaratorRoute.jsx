/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useModarator from "../hooks/useModarator";



const ModaratorRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isModarator, isModaratorLoading] = useModarator();

    if (loading || isModaratorLoading) {
        return <div className="flex justify-center pt-10"><span className="loading loading-spinner text-[#f76b00] loading-lg"></span></div>
    }
    if (user && isModarator) {
        return children;
    }
    return <Navigate to='/' state={loading} replace></Navigate>
};

export default ModaratorRoute;