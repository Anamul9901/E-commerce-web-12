import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

 

const useUser = () => {
    const axiosPublic = useAxiosPublic();
    const {data: allUser = [], isPending: loading } = useQuery({
        queryKey: ['allUser'],
        queryFn: async () =>{
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    })
    return [allUser, loading]
};

export default useUser;