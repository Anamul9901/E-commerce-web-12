import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";




const useAdmin = () => {
    const { user, loading } = useAuth();
    const axiosSecue = useAxiosSecure();
    const { data: isAdmin, isPending: isAdminLoading, refetch } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecue.get(`/users/admin/${user.email}`);
            return res.data?.admin;
        }
    })
    return [isAdmin, isAdminLoading, refetch]
};

export default useAdmin;