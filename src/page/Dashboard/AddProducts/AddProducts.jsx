import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useProduct from "../../../hooks/useProduct";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";



const AddProducts = () => {
    const { user } = useAuth();
    const userEmail = user.email
    const [allProduct, , refetch] = useProduct();
    const axiosSecue = useAxiosSecure();
    const [shopUser, setShopUser] = useState([])
    const {
        register,
        reset,
    } = useForm()
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecue.get('/users')
            .then(res => {
                setShopUser(res.data)
            })
    }, [axiosSecue, user?.email])

    const filterUser = shopUser.filter(shopUs => shopUs.email === user.email)



    const handleAddProduct = e => {
        e.preventDefault();
        const form = e.target;
        const productName = form.productName.value;
        const productImage = form.productImage.value;
        const quantity = form.quantity.value;
        const location = form.location.value;
        const cost = parseFloat(form.cost.value);
        const profit = parseFloat(form.profit.value);
        const discount = parseFloat(form.discount.value);
        const description = form.description.value;
        const saleCount = 0;


        const profitParProduct = (profit / 100) * cost;
        // console.log('profitParProduct: ', profitParProduct);
        const totalMoney = cost + profitParProduct;
        // console.log('total taka ', totalMoney)
        const taxt = 0.075 * cost;
        // console.log('taxt: ', taxt);
        const sellingPrice = totalMoney + taxt;
        // console.log('sellingPrice: ', sellingPrice);

      

        const addProduct = { userEmail, productName, productImage, quantity, location, cost, profit, discount, description, saleCount, sellingPrice }

        if (allProduct?.length < filterUser[0]?.productLimit) {
            axiosPublic.post('/products', addProduct)
                .then(res => {
                    if (res.data.insertedId) {

                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Product successfully added.",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        reset();
                        refetch();
                    }
                })
                .catch(() => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                    });
                })
        }
        else {

            Swal.fire({
                icon: "error",
                title: "No Subscription",
                text: "Not added more products",
            });
            navigate('/dashboard/subscription')
        }
    }

    return (
        <div className="styleAddProduct min-h-screen pt-10">
            <div className=" p-1 flex justify-center">
                <div className="card text-black bg-[#ffc49760] w-full md:w-1/2 shadow-2xl pb-12 px-2">
                    <h2 className="text-center text-3xl font-bold mb-6 pt-10 pb-6">Add Product</h2>
                    <div className="flex justify-center">
                        <form onSubmit={handleAddProduct}>
                            <div className="">
                                <div className="md:flex gap-5 mb-5">
                                    <div className="w-full">
                                        <h2>Product Name</h2>
                                        <input  {...register("productName", { required: true })} type="text" name="productName" placeholder="Product Name"
                                            required className="input input-bordered w-full" />
                                    </div>
                                    <div className="w-full">
                                        <h2>Product Image URL</h2>
                                        <input  {...register("productImage", { required: true })} type="img" name="productImage" placeholder="Product Image URL"
                                            required className="input input-bordered w-full" />
                                    </div>
                                </div>

                                <div className="md:flex gap-5  mb-5">
                                    <div className="w-full">
                                        <h2>Quantity</h2>
                                        <input  {...register("quantity", { required: true })} type="number" name="quantity" placeholder="Quantity"
                                            required
                                            className="input input-bordered  w-full" />
                                    </div>
                                    <div className="w-full">
                                        <h2>Location</h2>
                                        <input  {...register("location", { required: true })} type="text" name="location" placeholder="Location" required className="input input-bordered w-full " />
                                    </div>

                                </div>

                                <div className="flex gap-5 mb-5">
                                    <div className="w-full">
                                        <h2>Production Cost</h2>
                                        <input  {...register("cost", { required: true })} type="text" name="cost" required placeholder="Production Cost" className="input input-bordered w-full  " />
                                    </div>
                                    <div className="w-full">
                                        <h2>Profit Margin (%)</h2>
                                        <input type="number" {...register("profit", { required: true })} name="profit" required placeholder="Profit (%)" className="input input-bordered w-full  " />
                                    </div>
                                </div>
                                <div className="md:flex gap-5 mb-5">
                                    <div className="w-full">
                                        <h2>Discount (%)</h2>
                                        <input  {...register("discount", { required: true })} type="number" name="discount" required placeholder="Discount (%)" className="input input-bordered w-full  " />
                                    </div>
                                    <div className="w-full">
                                        <h2>Description</h2>
                                        <input type="name" {...register("description", { required: true })} name="description" required placeholder="Description" className="input input-bordered w-full  " />
                                    </div>
                                </div>


                                <button type="submit" className="btn glass w-full bg-[#f76b00] font-bold hover:text-[#EC7755]">Add Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProducts;