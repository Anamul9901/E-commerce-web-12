
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import useModarator from "../../hooks/useModarator";

const CreateShope = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [isAdmin, , refetch] = useAdmin();
    const [isModarator, , ModaRefe] = useModarator();
    

    refetch();
    ModaRefe();

    if (isAdmin || isModarator) {
        refetch();
        ModaRefe();
        navigate('/dashboard')
    }


    const handleShopSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const shopName = form.shopName.value;
        const shopLogo = form.shopLogo.value;
        const shopLocation = form.shopLocation.value;
        const shopInfo = form.shopInfo.value;
        const ownerName = form.ownerName.value;
        const ownerEmail = form.ownerEmail.value;
        const productLimit = 3;
        const storeInfo = {
            shopName, shopLogo, shopLocation, shopInfo, ownerName, ownerEmail, productLimit
        }
        const storeInf = {
            shopName, shopLogo, productLimit
        }
        axiosPublic.post('/store', storeInfo)
            .then(() => {

                axiosPublic.patch(`/users/modarator/${ownerEmail}`, storeInf)
                    .then(() => {
                        navigate('/dashboard')
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Your Store successfully created",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Something went wrong!",
                        });
                    })
            })
            .catch(() => {
            })


        // reset();
    }

    return (
        <div className="styleAddProduct min-h-screen pt-10">
            <div className=" p-1 flex justify-center">
                <div className="card glass text-black bg-[#ffd9bb60] w-full md:w-1/2 shadow-xl pb-12 px-2">
                    <h2 className="text-center text-3xl font-bold mb-6 pt-10 pb-6">Create Your Shop</h2>
                    <div className="flex justify-center">
                        <form onSubmit={handleShopSubmit}>
                            <div className="">
                                <div className="md:flex gap-5 mb-5">
                                    <div className="w-full">
                                        <h2>Shop Name</h2>
                                        <input type="text" name="shopName" placeholder="Shop Name"
                                            required className="input input-bordered w-full" />
                                    </div>
                                    <div className="w-full">
                                        <h2>Shop Logo URL</h2>
                                        <input type="img" name="shopLogo" placeholder="Shop Logo URL"
                                            required className="input input-bordered w-full" />
                                    </div>
                                </div>

                                <div className="md:flex gap-5  mb-5">
                                    <div className="w-full">
                                        <h2>Shop Location</h2>
                                        <input type="text" name="shopLocation" placeholder="Shop Location"
                                            required
                                            className="input input-bordered  w-full" />
                                    </div>
                                    <div className="w-full">
                                        <h2>Shop info</h2>
                                        <input type="text" name="shopInfo" placeholder="Shop Info" required className="input input-bordered w-full " />
                                    </div>

                                </div>

                                <div className="flex gap-5 mb-5">
                                    <div className="w-full">
                                        <h2>Owner Name</h2>
                                        <input type="text" defaultValue={user.displayName} disabled name="ownerName" required placeholder="Owner Name" className="input input-bordered w-full  " />
                                    </div>
                                    <div className="w-full">
                                        <h2>Owner Email</h2>
                                        <input type="name" defaultValue={user.email} disabled name="ownerEmail" required placeholder="Owner Email" className="input input-bordered w-full  " />
                                    </div>
                                </div>


                                <button type="submit" className="btn glass w-full bg-[#f76b00] font-bold hover:text-[#EC7755]">S u b m i t</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateShope;