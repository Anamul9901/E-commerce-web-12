import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useProduct from "../../../hooks/useProduct";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";




const MyProducts = () => {
    const [allProduct, , refetch] = useProduct();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const axiosSecue = useAxiosSecure();
    const [shopUser, setShopUser] = useState();

    useEffect(() => {
        axiosSecue.get('/users')
            .then(res => {
                setShopUser(res?.data);
            })
    }, [axiosSecue])

    const userFilter = shopUser?.filter(shopUs => shopUs?.email === user?.email)
    const productLimit = userFilter?.[0]?.productLimit;

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/products/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Product delete successfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            refetch();

                        }
                        axiosPublic.delete(`/sold-product/${id}`)
                            .then(() => {
                            })
                            .catch(() => {
                            })
                    })
                    .catch(() => {
                        Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: "Product not delete",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
            }
        });
    }



    return (
        <>
            {
                allProduct.length === 0 ?
                    <div>
                        <h2 className="font-bold text-center">You can add <span className="text-[#f76b00]">{productLimit}</span> products</h2>
                        <div className="flex justify-center text-center p-6">
                            <div>
                                <h2 className="text-center text-2xl font-semibold p-6">You have no products</h2>
                                <Link to='/dashboard/addproduct'>
                                    <button className="btn btn-sm bg-[#f76b00] text-white">Add Products</button></Link>

                            </div>
                        </div>
                    </div>
                    :

                    <div>
                        <h2 className="font-bold text-center">You can add <span className="text-[#f76b00]">{productLimit}</span> products</h2>
                        <div className="flex justify-around p-2 my-3">
                            <h2 className="text-xl font-bold">Total <span className="text-[#f76b00]">{allProduct.length}</span> Product Added </h2>
                            <Link to='/dashboard/addproduct'>
                                <button className="btn btn-sm bg-[#f76b00] text-white">Add Products</button></Link>
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
                                            <th>Location</th>
                                            <th>Sale Count</th>
                                            <th>Update</th>
                                            <th>Delete</th>
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
                                                <div className="font-bold">{product.productName}</div>
                                            </td>
                                            <td>
                                                {product.quantity}
                                                <br />

                                            </td>
                                            <td>{product.location}</td>
                                            <td>
                                                {product.saleCount}
                                            </td>
                                            <th>
                                                <Link to={`/dashboard/updateProduct/${product._id}`}>
                                                    <button

                                                        className="btn btn-ghost btn-lg "><FaEdit className="text-green-500" /></button></Link>
                                            </th>
                                            <th>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="btn  btn-ghost btn-lg"><FaTrash className="text-red-500" /></button>
                                            </th>
                                        </tr>)}


                                    </tbody>



                                </table>
                            </div>
                        </div>
                    </div>
            }
        </>
    );
};

export default MyProducts;