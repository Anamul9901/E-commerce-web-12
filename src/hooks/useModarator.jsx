import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";



const useModarator = () => {
    const { user, loading } = useAuth();
    const axiosSecue = useAxiosSecure();
    const { data: isModarator, isPending: isModaratorLoading, refetch:ModaRefe } = useQuery({
        queryKey: [user?.email, 'isModarator'],
        enabled: !loading,
        queryFn: async()=>{
            const res = await axiosSecue.get(`/users/modarator/${user.email}`);
            return res.data?.modarator;
        }
    })
    return [isModarator, isModaratorLoading, ModaRefe]
};

export default useModarator;