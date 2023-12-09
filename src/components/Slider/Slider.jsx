/* eslint-disable react/no-unescaped-entities */
import { GoDot } from "react-icons/go";

const Slider = () => {

    return (
        <div className="pt-3 md:flex md:flex-row flex flex-col-reverse">
            <div className="pr-3 md:py-2">
                <div className="card md:w-56 w-full flex items-center bg-base-100 shadow-xl">
                    <div className="flex md:flex-col">
                        <div>
                            <button className="flex justify-start"> <h2 className="hover:text-[#f76b00] flex gap-2 items-center ml-2 text-sm md:pb-2"> <GoDot />Health & Beauty</h2></button>
                            <button className="flex justify-start"> <h2 className="hover:text-[#f76b00] flex gap-2 items-center ml-2 text-sm md:pb-2"> <GoDot />Watches, Bags, jewellery</h2></button>
                            <button className="flex justify-start"> <h2 className="hover:text-[#f76b00] flex gap-2 items-center ml-2 text-sm md:pb-2"> <GoDot />Women's & Girl's Fashion</h2></button>
                            <button className="flex justify-start"> <h2 className="hover:text-[#f76b00] flex gap-2 items-center ml-2 text-sm md:pb-2"> <GoDot />Men's & Boy's Fashion</h2></button>
                            <button className="flex justify-start"> <h2 className="hover:text-[#f76b00] flex gap-2 items-center ml-2 text-sm md:pb-2"> <GoDot />Mother & Baby</h2></button>
                            <button className="flex justify-start"> <h2 className="hover:text-[#f76b00] flex gap-2 items-center ml-2 text-sm md:pb-2"> <GoDot />Electronic Accessories</h2></button>
                        </div>
                        <div>
                            <button className="flex justify-start"> <h2 className="hover:text-[#f76b00] flex gap-2 items-center ml-2 text-sm md:pb-2"> <GoDot />TV & Home Appliances</h2></button>
                            <button className="flex justify-start"> <h2 className="hover:text-[#f76b00] flex gap-2 items-center ml-2 text-sm md:pb-2"> <GoDot />Elextronics Devices</h2></button>
                            <button className="flex justify-start"> <h2 className="hover:text-[#f76b00] flex gap-2 items-center ml-2 text-sm md:pb-2"> <GoDot />Groceeries</h2></button>
                            <button className="flex justify-start"> <h2 className="hover:text-[#f76b00] flex gap-2 items-center ml-2 text-sm md:pb-2"> <GoDot />Home & Lifestyle</h2></button>
                            <button className="flex justify-start"> <h2 className="hover:text-[#f76b00] flex gap-2 items-center ml-2 text-sm md:pb-2"> <GoDot />Sports & Outdoors</h2></button>
                            <button className="flex justify-start"> <h2 className="hover:text-[#f76b00] flex gap-2 items-center ml-2 text-sm md:pb-2"> <GoDot />Automotive & Motorbike</h2></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="carousel w-full md:h-[345px] h-[250px] pb-8 md:pb-0">
                <div id="slide1" className="carousel-item relative w-full">
                    <img src={'https://i.ibb.co/XzfDhGs/ecfcb747-0e8c-4c16-a6a2-88b810351aeb-jpg-1200x1200.jpg'} className='w-full rounded-xl' />

                   
                    <div className="absolute flex justify-end gap-5 transform -translate-y-1/2 left-5 right-5 bottom-0">
                        <a href="#slide4" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>

                <div id="slide2" className="carousel-item relative w-full">
                    <img src={'https://i.ibb.co/pjTvQ5k/04e410e9-cc86-4418-ae0b-41121190d863.jpg'} className='w-full rounded-xl' />

                   


                    <div className="absolute flex justify-end gap-5 transform -translate-y-1/2 left-5 right-5 bottom-0">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <img src={'https://i.ibb.co/Sf0K4Y9/a75a39bf-54c8-466b-b7a8-f04b8a4deeb0.jpg'} className='w-full rounded-xl' />

                   


                    <div className="absolute flex justify-end gap-5 transform -translate-y-1/2 left-5 right-5 bottom-0">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide4" className="carousel-item relative w-full">
                    <img src={'https://i.ibb.co/ZBcCJf8/0e145108-0982-4e86-a88b-9b1803f5490d.jpg'} className='w-full rounded-xl' />

                  


                    <div className="absolute flex justify-end gap-5 transform -translate-y-1/2 left-5 right-5 bottom-0">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Slider;