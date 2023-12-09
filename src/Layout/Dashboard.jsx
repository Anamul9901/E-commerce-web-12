import { FaHouseMedicalFlag, FaIdCard, FaProductHunt, FaUsersGear } from "react-icons/fa6";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useAdmin from "../hooks/useAdmin";
import useModarator from "../hooks/useModarator";
import { RiProductHuntLine } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import Footer from "../components/Footer/Footer";
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";


const Dashboard = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    const [isAdmin] = useAdmin();
    const [isModarator] = useModarator();
    const { user } = useAuth();
    const [shopUser, setShopUser] = useState([])
    const axiosSecue = useAxiosSecure();

    useEffect(() => {
        axiosSecue.get('/users')
            .then(res => {
                setShopUser(res.data)
            })
    }, [axiosSecue, user?.email])

    const filterUser = shopUser?.filter(shopUs => shopUs?.email === user?.email)


    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Log Out successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/')
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!"
                });
            })
    }
    return (
        <div>
            <Helmet>
                <title>e-SHOP || Dashboard</title>
            </Helmet>
            <div className="flex max-w-[1300px] mx-auto w-full">
                {/* dashboard side bar */}
                <div className="w-64 pt-6 min-h-screen bg-[#f76b00] text-white">
                    {
                        isModarator &&
                        <ul className="menu">

                            <Link to='/dashboard'>
                                <div className="flex items-center gap-2 justify-center mb-2">
                                    <img className="w-[15%] rounded mb-5" src={filterUser?.[0]?.shopLogo} alt="" />
                                    <h2 className="text-center font-bold">{filterUser?.[0]?.shopName}</h2>
                                </div>
                            </Link>
                            <hr className="my-4 mx-2" />


                            <li>
                                <NavLink to="my-product">
                                    <RiProductHuntLine />
                                    My Products</NavLink>
                            </li>

                            {/* <li>
                            <NavLink to="adminHome">
                                <FaHouseMedicalFlag />
                                Menu</NavLink>
                        </li> */}
                            <li>
                                <NavLink to="sales-product">
                                    <FaProductHunt />
                                    Sale Products</NavLink>
                            </li>
                            <li>
                                <NavLink to="sales-count">
                                    <BsGraphUpArrow />
                                    Sales Count</NavLink>
                            </li>

                            <li>
                                <NavLink to="subscription">
                                    <FaIdCard />
                                    Subscription </NavLink>
                            </li>
                            <hr className="my-4 mx-2" />
                            <li>
                                <NavLink to="/">
                                    <FaHouseMedicalFlag />
                                    Home</NavLink>
                            </li>

                            <li>
                                <NavLink onClick={handleLogOut} to="/dashboard/adminHome">
                                    <IoIosLogOut />
                                    Log-Out</NavLink>
                            </li>
                        </ul>
                    }
                    {
                        isAdmin &&
                        <ul className="menu">

                            <Link to='/dashboard'>
                                <div className="flex items-center justify-center mb-2">
                                    <img className="w-[15%]  " src={'https://i.ibb.co/LZsK9YV/pngwing-com-15.png'} alt="" />
                                    <h2 className="font-bold text-xl">i-SHOP</h2>
                                </div>
                            </Link>
                            <hr className="my-4 mx-2" />
                            <li>
                                <NavLink to='manage-shop'>
                                    <MdManageAccounts />
                                    Manage Shop</NavLink>
                            </li>
                            <li>
                                <NavLink to='sales-sectin'>
                                    <BsGraphUpArrow />
                                    Sales Section</NavLink>
                            </li>
                            <li>
                                <NavLink to='manage-user'>
                                    <FaUsersGear />
                                    Users Section</NavLink>
                            </li>

                            <hr className="my-4 mx-2" />
                            <li>
                                <NavLink to="/">
                                    <FaHouseMedicalFlag />
                                    Home</NavLink>
                            </li>
                            <li>
                                <NavLink onClick={handleLogOut} to="/dashboard/adminHome">
                                    <IoIosLogOut />
                                    Log-Out</NavLink>
                            </li>
                        </ul>
                    }

                </div>
                {/* dashboard content */}
                <div className="flex-1 p-8">
                    <Outlet />

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;