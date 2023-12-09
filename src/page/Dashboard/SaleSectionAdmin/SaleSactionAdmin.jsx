import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";



const SaleSactionAdmin = () => {
    const axiosSecue = useAxiosSecure();
    const [allUser, setAlluser] = useState([]);
    const [allProduct, setAllProuct] = useState([]);


    useEffect(() => {
        axiosSecue.get('/users')
            .then(res => {
                setAlluser(res?.data)
            })
            .catch(() => { })
    }, [axiosSecue])

    const adminEmail = allUser?.filter(adminE => adminE?.role === 'admin');
    const adminIncome = adminEmail?.[0]?.adminIncome;

    useEffect(() => {
        axiosSecue.get('/products')
            .then(res => {
                setAllProuct(res.data);
            })
            .catch(() => { })
    }, [axiosSecue])

    const productLangth = allProduct?.length


    return (
        <div>
            <h2 className="text-3xl text-center font-bold pb-10">Sale saction</h2>

            <div className="md:flex gap-5 justify-center">

                <div className="stats shadow mb-3 bg-yellow-200">
                    <div className="stat">
                        <div className="stat-title"></div>
                        <div className="font-bold text-center text-xl">Total Income</div>
                        <div className="stat-value text-center mb-3">${adminIncome ? adminIncome?.toFixed(2) : 0}</div>
                    </div>
                </div>

                <div className="stats shadow mb-3 bg-yellow-400">
                    <div className="stat">
                        <div className="stat-title"></div>
                        <div className="font-bold text-center text-xl">Total Product</div>
                        <div className="stat-value text-center mb-3">{productLangth ? productLangth : 0}</div>
                    </div>
                </div>

                <div className="stats shadow mb-3 bg-yellow-500">
                    <div className="stat">
                        <div className="stat-title"></div>
                        <div className="font-bold text-center text-xl">Total Sales</div>
                        <div className="stat-value text-center mb-3">$0.00</div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default SaleSactionAdmin;