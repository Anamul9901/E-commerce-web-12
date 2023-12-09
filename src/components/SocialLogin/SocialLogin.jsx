import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

// created by ANAMUL HAQUE
const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();


    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((res) => {
                
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "LogIn Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                const userInfo = {
                    email: res?.user?.email,
                    name: res?.user?.displayName
                }
                axiosPublic.post('/users', userInfo)
                .then(() =>{
                    navigate(location?.state ? location.state : '/')
                })
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!"
                });
            })
    }
    return (
        <div>
            <button onClick={handleGoogleSignIn} className="btn">
                <FcGoogle />
                Google
            </button>
        </div>
    );
};

export default SocialLogin;