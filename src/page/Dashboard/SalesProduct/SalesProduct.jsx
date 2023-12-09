import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useProduct from "../../../hooks/useProduct";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";

const SalesProduct = () => {
    const [allProduct, , refetch] = useProduct();
    const axiosSecue = useAxiosSecure();
    const { user } = useAuth();
    const [shopUser, setShopUser] = useState()

    useEffect(() => {
        axiosSecue.get('/users')
            .then(res => {
                setShopUser(res?.data);
            })
    }, [axiosSecue])

    // const userFilter = shopUser?.filter(shopUs => shopUs?.email === user?.email)
    // const TotalCost = userFilter?.[0]?.totalCost; 


    const handlSold = (product) => {
        axiosSecue.patch(`/products-sold/${product._id}`)
            .then(() => {
                const userEmail = product.userEmail;
                const productName = product.productName;
                const productImage = product.productImage;
                const quantity = product.quantity;
                const location = product.location;
                const cost = product.cost;
                const profit = product.profit;
                const discount = product.discount;
                const description = product.description;
                const sellingPrice = product.sellingPrice;
                console.log(quantity)

                const soldProduct = { _id: product._id, userEmail, productName, productImage, quantity, location, cost, profit, discount, description, sellingPrice }
                

                 


                axiosSecue.post('/sold-product', soldProduct)
                    .then(res => {
                        if (res.data.insertedId) {
                            refetch();
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${product.productName} successfully sold`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
                    .catch(() => {
                    })

            })
            .catch(() => {
            })
    }

    return (
        <div>

            <div>
                <div className="text-center text-3xl font-bold py-3 mb-3">
                    <h2>Sold products for customer</h2>

                </div>
                <div>

                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>

                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Discount</th>
                                    <th>Selling Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allProduct.map((product, idx) => <tr key={product._id}>
                                    <th>
                                        {idx + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={product.productImage} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="">{product.productName}</div>
                                    </td>
                                    <td>
                                        {product.quantity}
                                        <br />

                                    </td>
                                    <td >{product.discount}%</td>
                                    <td className="text-end">
                                        ${product.sellingPrice?.toFixed(2)}
                                    </td>
                                    <th>
                                    </th>
                                    <th className="text-center">
                                        {
                                            product.sold === 'yes' ? <span className="text-[#f76b00]">Sold</span> :

                                                <button
                                                    onClick={() => handlSold(product)}
                                                    className="btn bg-[#f76b00] text-white btn-sm">Sold to customer</button>
                                        }
                                    </th>
                                </tr>)}


                            </tbody>



                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesProduct;