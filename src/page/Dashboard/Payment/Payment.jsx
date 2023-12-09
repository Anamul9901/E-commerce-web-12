import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet-async";


const stripePromise = loadStripe(import.meta.env.VITE_payment_PK);
const Payment = () => {
    const totalPrice = parseFloat(localStorage.getItem('money')) 
    return (
        <div  >
            <Helmet>
                <title>e-SHOP || Payment</title>
            </Helmet>
            <h2 className="text-3xl text-center pb-10 font-bold">Total Amount: <span className="text-green-500">${totalPrice ? totalPrice?.toFixed(2) : 0}</span></h2>
            <hr />
            <div className="flex justify-center">
                <div className="pt-10 w-80 ">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;