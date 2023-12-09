/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";



const AdminRoute = ({children}) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className="flex justify-center pt-10"><span className="loading loading-spinner text-[#f76b00] loading-lg"></span></div>
    }
    if(user && isAdmin){
        return children;
    }
    return <Navigate to='/' state={location} replace></Navigate>
};

export default AdminRoute;