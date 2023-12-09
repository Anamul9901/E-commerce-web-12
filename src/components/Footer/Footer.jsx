import { BsFacebook } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoLogoWhatsapp } from "react-icons/io";


const Footer = () => {
    return (
        <div className="">
            <footer className="w-full bg-gray-800 p-8 ">
                <div className="max-w-[1300px]  mx-auto">
                    <div>
                        <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12    text-center md:justify-between text-white">

                            <div  >
                                <Link to='/'>
                                    <div className="flex items-center justify-center">
                                        <img className="md:w-[15%] w-[10%]" src={'https://i.ibb.co/LZsK9YV/pngwing-com-15.png'} alt="" />
                                        <h2 className="font-bold md:text-xl text-[#f76b00]">e-SHOP</h2>
                                    </div>
                                </Link>
                            </div>



                            <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                                <div className="">
                                    <a >
                                        <img src={'https://i.ibb.co/161dhbQ/Anamul.jpg'} alt="logo-ct" className="w-10 rounded-3xl ml-8" />
                                        <p>Anamul Haque</p>
                                        <div className="flex">
                                        <p className="ml-5 pt-2">
                                            <a className="hover:text-pink-500 text-2xl text-blue-500" href="https://www.facebook.com/Anamul114" target="_blan"><BsFacebook  /></a>
                                        </p>
                                        <p className="ml-5 pt-2">
                                            <a className="hover:text-pink-500 text-2xl text-green-500" href="https://wa.me/+8801864668089" target="_blan"><IoLogoWhatsapp /></a>
                                        </p>
                                        </div>
                                    </a>
                                </div>

                                <div>
                                <li>
                                    <a
                                        href="https://www.facebook.com/Anamul114" target="_blan"
                                        className="block font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased transition-colors hover:text-pink-500 focus:text-pink-500"
                                    >
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <Link
                                        href="#"
                                        className="block font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased transition-colors hover:text-pink-500 focus:text-pink-500"
                                    >
                                        License
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="https://www.facebook.com/Anamul114" target="_blan"
                                        className="block font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased transition-colors hover:text-pink-500 focus:text-pink-500"
                                    >
                                        Contact Us
                                    </a>
                                </li>
                                </div>
                            </ul>
                        </div>
                        <hr className="my-8 border-blue-gray-50" />
                        <p className="block text-center   text-slate-400 pb-4">
                             Thank for visiting 
                            <p><small>&copy; 2023 Your e-SHOP. All rights reserved.</small></p>

                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;