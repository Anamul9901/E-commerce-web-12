/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

 

const PrivetRoute = ({children}) => {
    const location = useLocation();
    const {user, loading} = useAuth();
    if(loading){
        return <div className="flex justify-center pt-10"><span className="loading loading-spinner text-[#f76b00] loading-lg"></span></div>
    }
    if(user){
        return children;
    }
    return <Navigate to='/login' state={location.pathname}></Navigate>
};

export default PrivetRoute;