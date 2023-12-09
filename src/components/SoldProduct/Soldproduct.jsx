import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";


const Soldproduct = () => {
    const axiosPublic = useAxiosPublic();
    const [soldProduct, setSolfProduct] = useState([]);
    useEffect(() => {
        axiosPublic.get('/sold-product')
            .then(res => {
                setSolfProduct(res.data);
            })
            .catch(() => {
            })
    }, [axiosPublic])
    // const soldFilter = soldProduct.filter(sold => sold.sold === 'yes');
    // console.log(soldFilter)

    const handlePayment = product => {
        localStorage.setItem('userMoney', product?.sellingPrice)
        localStorage.setItem('shopEmail', product?.userEmail)
        localStorage.setItem('productId', product?._id)

    }

    return (
        <div className="py-16 mb-10">
        <h2 className="md:text-4xl text-xl pb-10 text-center font-bold">Just For You <span className="text-sm text-[#f76b00]">(Sold Products)</span></h2>
            <div className=" ">
                <div className="grid  grid-cols-2 px-1 md:px-0 md:grid-cols-4 lg:grid-cols-5 gap-3  ">
                    {
                        soldProduct.map(product =>
                            <div key={product._id}>

                                <Link to='/user-payment'>
                                    <div onClick={() => handlePayment(product)} className=" bg-base-100 shadow-xl  h-full">
                                        <figure >
                                            <img src={product?.productImage} alt="Shoes" className="w-full h-40 " />
                                        </figure>
                                        <div className="flex items-center pb-3 ">
                                            <div className="px-3">
                                                <h2 className="text-xl font-semibold ">{product?.productName}</h2>
                                                <p>{product?.description}</p>
                                                <p >Price: <span className="font-bold text-lg text-[#f76b00]">${product?.sellingPrice?.toFixed(2)}</span></p>
                                                <p>Discount: <span className="font-bold text-lg text-[#f76b00]"> {product?.discount}%</span> </p>

                                            </div>
                                        </div>
                                    </div></Link>

                            </div>)
                    }
                </div>
            </div>

        </div>
    );
};

export default Soldproduct;