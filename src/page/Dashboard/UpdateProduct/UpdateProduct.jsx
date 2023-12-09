import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";


const UpdateProduct = () => {
    const axiosPublic = useAxiosPublic();
    const allProduct = useLoaderData();
    const { productName, productImage, quantity, location, cost, profit, discount, description, saleCount } = allProduct;
    const { user } = useAuth();
    const userEmail = user.email;

    const handleUpdateProduct = e => {
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
        const saleCount2 = saleCount;


        const profitParProduct = (profit / 100) * cost;
        // console.log('profitParProduct: ', profitParProduct);
        const totalMoney = cost + profitParProduct;
        // console.log('total taka ', totalMoney)
        const taxt = 0.075 * cost;
        // console.log('taxt: ', taxt);
        const sellingPrice = totalMoney + taxt;
        // console.log('sellingPrice: ', sellingPrice);



        const allUpdatedProduct = { userEmail, productName, productImage, quantity, location, cost, profit, discount, description, sellingPrice, saleCount2 };

        axiosPublic.put(`/products/${allProduct._id}`, allUpdatedProduct)
            .then(res => {
                axiosPublic.put(`/sold-product/${allProduct._id}`, allUpdatedProduct)
                    .then(res => {
                        console.log("sold update", res.data)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Update Successfuly",
                        showConfirmButton: false,
                        timer: 1500
                    });
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
    return (
        <div className="styleAddProduct min-h-screen pt-10">
            <div className=" p-1 flex justify-center">
                <div className="card text-black bg-[#ffc49760] w-full md:w-1/2 shadow-2xl pb-12 px-2">
                    <h2 className="text-center text-3xl font-bold mb-6 pt-10 pb-6">Update product</h2>
                    <div className="flex justify-center">
                        <form onSubmit={handleUpdateProduct}>
                            <div className="">
                                <div className="md:flex gap-5 mb-5">
                                    <div className="w-full">
                                        <h2>Product Name</h2>
                                        <input defaultValue={productName} type="text" name="productName" placeholder="Product Name"
                                            required className="input input-bordered w-full" />
                                    </div>
                                    <div className="w-full">
                                        <h2>Product Image URL</h2>
                                        <input defaultValue={productImage} type="img" name="productImage" placeholder="Product Image URL"
                                            required className="input input-bordered w-full" />
                                    </div>
                                </div>

                                <div className="md:flex gap-5  mb-5">
                                    <div className="w-full">
                                        <h2>Quantity</h2>
                                        <input defaultValue={quantity} type="number" name="quantity" placeholder="Quantity"
                                            required
                                            className="input input-bordered  w-full" />
                                    </div>
                                    <div className="w-full">
                                        <h2>Location</h2>
                                        <input defaultValue={location} type="text" name="location" placeholder="Location" required className="input input-bordered w-full " />
                                    </div>

                                </div>

                                <div className="flex gap-5 mb-5">
                                    <div className="w-full">
                                        <h2>Production Cost</h2>
                                        <input defaultValue={cost} type="text" name="cost" required placeholder="Production Cost" className="input input-bordered w-full  " />
                                    </div>
                                    <div className="w-full">
                                        <h2>Profit Margin(%)</h2>
                                        <input defaultValue={profit} type="number" name="profit" required placeholder="Profit Margin(%)" className="input input-bordered w-full  " />
                                    </div>
                                </div>
                                <div className="md:flex gap-5 mb-5">
                                    <div className="w-full">
                                        <h2>Discount</h2>
                                        <input defaultValue={discount} type="number" name="discount" required placeholder="Discount " className="input input-bordered w-full  " />
                                    </div>
                                    <div className="w-full">
                                        <h2>Description</h2>
                                        <input defaultValue={description} type="name" name="description" required placeholder="Description" className="input input-bordered w-full  " />
                                    </div>
                                </div>


                                <button type="submit" className="btn glass w-full bg-[#f76b00] font-bold hover:text-[#EC7755]">Update Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;