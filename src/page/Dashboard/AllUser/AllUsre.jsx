import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";



const AllUsre = () => {
    const axiosSecue = useAxiosSecure();
    const [allUser, setAllUser] = useState([]);

    // const findUser = allUser?.find(user => user?.email === user?.email)
    // console.log(findUser?.email)
    // const filterUser = allUser?.filter(user => user?.email !== findUser?.email)
    // console.log(filterUser)

    useEffect(() => {
        axiosSecue.get('/users')
            .then(res => { 
                setAllUser(res.data)
            })
            .catch(() => { 
            })
    }, [axiosSecue]) 
    return (
        <div>
            <h2 className="text-3xl text-center font-bold pb-10">All User</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUser.map((user, idx) =>
                            <tr key={user._id}>
                                <th>{idx + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role || <>user      <button className="btn btn-sm btn-primary  ">Email</button></>}</td>
                            </tr>)}


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsre;