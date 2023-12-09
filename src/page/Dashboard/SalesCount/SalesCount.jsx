import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";



const SalesCount = () => {
    const [shopUser, setShopUser] = useState()
    const axiosSecue = useAxiosSecure();
    const {user} = useAuth();

    useEffect(() => {
        axiosSecue.get('/users')
            .then(res => {
                setShopUser(res?.data);
            })
    }, [axiosSecue])

    const userFilter = shopUser?.filter(shopUs => shopUs?.email === user?.email)
    // console.log(userFilter)
    const TotalCost = userFilter?.[0]?.totalCost;
    const totalSale = userFilter?.[0]?.totalSale;
    
    const totalProfit = totalSale - TotalCost;

    return (
        <div>
            <h2 className="text-center text-2xl font-bold pb-10">Invest & Profit Calculation</h2>
            <div className="md:flex gap-5 justify-center">


                <div className="stats shadow mb-3 bg-yellow-200">
                    <div className="stat">
                        <div className="stat-title"></div>
                        <div className="font-bold text-center text-xl">Total Sale</div>
                        <div className="stat-value text-center mb-3">${totalSale ? totalSale?.toFixed(2) : 0}</div>
                    </div>
                </div>

                <div className="stats shadow mb-3 bg-yellow-400">
                    <div className="stat">
                        <div className="stat-title"></div>
                        <div className="font-bold text-center text-xl">Total Invest</div>
                        <div className="stat-value text-center mb-3">${TotalCost ? TotalCost.toFixed(2) : 0}</div>
                    </div>
                </div>

                <div className="stats shadow mb-3 bg-yellow-500">
                    <div className="stat">
                        <div className="stat-title"></div>
                        <div className="font-bold text-center text-xl">Total Profit</div>
                        <div className="stat-value text-center mb-3">${totalProfit ? totalProfit?.toFixed(2) : 0}</div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default SalesCount;