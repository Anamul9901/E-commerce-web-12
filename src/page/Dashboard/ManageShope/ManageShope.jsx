import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";



const ManageShope = () => {
    const axiosSecue = useAxiosSecure();
    const [allStore, setAllStore] = useState([]);
    // const [allUser, setAllUser] = useState([]);

    // useEffect(() => {
    //     axiosSecue.get('/users')
    //         .then(res => {
    //             setAllUser(res.data)
    //         })
    //         .catch(() => { })
    // }, [axiosSecue])
    // console.log(allUser);

    axiosSecue.get('/store')
        .then(res => {
            setAllStore(res.data)
        })
        .catch(() => {
        })
    return (
        <div>
            <h2 className="text-3xl text-center font-bold pb-10">All Shop</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th> # </th>
                            <th>Shop Logo</th>
                            <th>Shop Name</th>
                            <th>Email</th>
                            <th>Info</th>
                            <th>Send Notic</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allStore.map((store, idx) =>
                            <tr key={store._id}>
                                <th>
                                    {idx + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={store?.shopLogo} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>{store?.shopName}
                                </td>
                                <td>{store?.ownerEmail}</td>
                                <td>{store?.shopInfo}</td>
                                <th>
                                    <button className="btn btn-primary btn-xs ">Notice</button>
                                </th>
                            </tr>)}


                    </tbody>



                </table>
            </div>

        </div>
    );
};

export default ManageShope;