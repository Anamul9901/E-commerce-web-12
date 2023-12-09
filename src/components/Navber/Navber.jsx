import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useModarator from "../../hooks/useModarator";
import Swal from "sweetalert2";
import useAdmin from "../../hooks/useAdmin";
import { LuLogOut } from "react-icons/lu";


const Navber = () => {
    const { logOut, user } = useAuth();
    const [isModarator] = useModarator();
    const [isAdmin] = useAdmin();


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
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!"
                });
            })
    }




    const navitem = <>
        <li>
            <NavLink to='/' className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? 'text-[#050506] underline font-black md:text-xl ' : "lg:text-white text-[#f76b00] font-bold md:text-xl"
            }>Home</NavLink>
        </li>
        {
            isModarator || isAdmin ?
                <li>
                    <NavLink to='/dashboard' className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? 'text-[#050506] underline font-black md:text-xl ' : "lg:text-white text-[#f76b00] font-bold md:text-xl"
                    }>Dashboard</NavLink>
                </li>
                :
                <li>
                    <NavLink to='/create-store' className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? 'text-[#050506] underline font-black md:text-xl ' : "lg:text-white text-[#f76b00] font-bold md:text-xl"
                    }>Create-Store</NavLink>
                </li>
        }


        <li>
            <NavLink to="https://www.youtube.com/watch?v=pJQXGmMofro" target="_blan" className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? 'text-[#050506] underline font-black md:text-xl ' : "lg:text-white text-[#f76b00] font-bold md:text-xl"
            }>Watch Demo</NavLink>
        </li>

    </>
    return (
        <div className="bg-[#f76b00] text-white">
            <div className='max-w-[1300px] mx-auto w-full'>
                <div className="navbar   ">
                    <div className="navbar-start ">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                {navitem}
                            </ul>
                        </div>
                        <Link to='/'>
                            <div className="flex items-center">
                                <img className="md:w-[15%] w-[28%]" src={'https://i.ibb.co/LZsK9YV/pngwing-com-15.png'} alt="" />
                                <h2 className="font-bold md:text-xl">e-SHOP</h2>
                            </div>
                        </Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {navitem}
                        </ul>
                    </div>
                    <div className="navbar-end">
                        {user ?
                            <div className="flex items-center">
                                <div className="flex flex-row-reverse items-center">

                                    <div>
                                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                            <div className="w-10 rounded-full">
                                                <img src={user?.photoURL} />
                                            </div>
                                        </label>
                                    </div>
                                    <div className="">
                                        <span className="text-xs md:text-lg font-bold">
                                            {user?.displayName}
                                        </span>
                                    </div>
                                </div>
                                <button onClick={handleLogOut} className=" ">
                                    <LuLogOut className="text-2xl" />
                                </button>
                            </div>
                            :
                            <Link to='/login'>
                                <button className="btn btn-sm bg-white hover:text-[#080403] text-black font-bold">Log In</button>
                            </Link>
                        }



                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navber;