import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import UserCheckoutFrom from "./UserCheckoutFrom";
import { Helmet } from "react-helmet-async";


const stripePromise = loadStripe(import.meta.env.VITE_payment_PK); 
const UserPayment = () => {
    const localStoregPrice = parseFloat(localStorage.getItem('userMoney'))
    const totalPrice = localStoregPrice ? localStoregPrice : 0;
    
    
    return (
        <div className="h-[70vh] pt-10" >
            <Helmet>
                <title>e-SHOP || Payment</title>
            </Helmet>
            <h2 className="text-3xl text-center pb-10 font-bold">Total Amount: <span className="text-green-500">${totalPrice?.toFixed(2)}</span></h2>
            <hr />
            <div className="flex justify-center">
                <div className="pt-10 w-80 ">
                    <Elements stripe={stripePromise}>
                        <UserCheckoutFrom />
                    </Elements>
                </div>
            </div>
        </div>
    );

};

export default UserPayment;