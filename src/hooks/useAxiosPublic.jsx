import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://assignment-12-server-eta-inky.vercel.app',
    withCredentials: true
})
const useAxiosPublic = () => {
    return axiosPublic;
};

// https://assignment-12-server-eta-inky.vercel.//app
//http://localhost://5000
export default useAxiosPublic;