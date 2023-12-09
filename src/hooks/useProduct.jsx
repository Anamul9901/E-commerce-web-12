import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";


const useProduct = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: allProduct = [], isPending: loading, refetch } = useQuery({
        queryKey: ['product'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products?userEmail=${user.email}`);
            return res.data;
        }
    })
    return [allProduct, loading, refetch]
};

export default useProduct;