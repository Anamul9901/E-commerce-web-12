import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";


export const axiosSecue = axios.create({
    baseURL: 'https://assignment-12-server-eta-inky.vercel.app',
    withCredentials: true
})
const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    axiosSecue.interceptors.request.use(function (config) {
        return config;
    }, function (error) {
        return Promise.reject(error)
    });

    axiosSecue.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        if (status === 401 || status === 403) {
            await logOut();
            navigate('/login')
        }
        return Promise.reject(error);
    })

    return axiosSecue;
};

export default useAxiosSecure;