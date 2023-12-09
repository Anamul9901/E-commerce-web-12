import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";



const CheckoutForm = () => {
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('')
    const [shopUser, setShopUser] = useState()
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecue = useAxiosSecure();
    const { user } = useAuth();
    const totalPrice = parseFloat(localStorage.getItem('money')) 


    useEffect(() => {
        axiosSecue.get('/users')
            .then(res => {
                setShopUser(res.data)
            })
    }, [axiosSecue, user?.email])

    const filterUser = shopUser?.filter(shopUs => shopUs?.email === user?.email)
    const previourProuctLimit = parseInt(filterUser?.[0].productLimit); 

    const filterAdmin = shopUser?.filter(shopUs => shopUs.role === 'admin')
    const adminEmail = filterAdmin?.[0]?.email;
    const adminCurrentIncome = filterAdmin?.[0]?.adminIncome; 
    useEffect(() => {
        axiosSecue.post('/create-payment-intent', { price: totalPrice })
            .then(res => { 
                setClientSecret(res.data.clientSecret)
            })
    }, [axiosSecue, totalPrice])

    const handleSubmit = async (event) => {

        const adminNewIncome = adminCurrentIncome + totalPrice; 
        const adminIncome = { adminNewIncome }
        axiosSecue.patch(`/users/admin/${adminEmail}`, adminIncome)
            .then(() => { 
            })
            .catch(() => { 
            })




        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement)

        if (card === null) {
            return;
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) { 
            setError(error.message)
            setTransactionId('')
        }
        else { 

            setError('')
            setTransactionId('')
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            // console.log('confirm error');
        }
        else { 
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Payment successful",
                    showConfirmButton: false,
                    timer: 1500
                })

            }
        }


        if (totalPrice == 10) {
            const Limit = previourProuctLimit + 200;
            const productLimit = { Limit }
            axiosSecue.patch(`/users/${user?.email}`, productLimit)
        }
        else if (totalPrice == 20) {
            const Limit = previourProuctLimit + 450;
            const productLimit = { Limit }
            axiosSecue.patch(`/users/${user?.email}`, productLimit)
        }
        else if (totalPrice == 50) {
            const Limit = previourProuctLimit + 1500;
            const productLimit = { Limit }
            axiosSecue.patch(`/users/${user?.email}`, productLimit)
        }


    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" className="btn btn-sm text-white bg-[#f76b00] my-4" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-500">{error}</p>
            {transactionId && <p className="text-green-600">Your transxtom id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;