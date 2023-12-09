import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import {  useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";


const UserCheckoutFrom = () => {
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [productSellCount, setProductSellCount] = useState();
    const [shopUser, setShopUser] = useState()
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecue = useAxiosSecure();
    const { user } = useAuth();
    const totalPrice = parseFloat(localStorage.getItem('userMoney'))
    const userEmail = localStorage.getItem('shopEmail');
    const productId = localStorage.getItem('productId')
    // const navigate = useNavigate();
    // console.log(productId)


    useEffect(() => {
        axiosSecue?.get(`/products/${productId}`)
            .then(res => {
                // console.log(res.data)
                setProductSellCount(res?.data)
            })
            .catch(() => {
            })
    }, [productId, axiosSecue])
    const currentSaleCount = parseInt(productSellCount?.saleCount);
    const currentCostCount = parseInt(productSellCount?.cost);

    // console.log(currentSaleCount);
    const currentQuantity = productSellCount?.quantity;
    // console.log(currentQuantity)



    useEffect(() => {
        axiosSecue.get('/users')
            .then(res => {
                setShopUser(res?.data);
            })
    }, [axiosSecue])

    const userFilter = shopUser?.filter(shopUs => shopUs?.email === userEmail)
    const currentTotalCost = userFilter?.[0]?.totalCost;
    const shopName = userFilter?.[0]?.shopName;
    const shopLogo = userFilter?.[0]?.shopLogo;
    const productLimit = userFilter?.[0]?.productLimit;
    const currentTotalSale = userFilter?.[0]?.totalSale ? userFilter?.[0]?.totalSale : 0;
    // console.log('cuToCo', shopName)

    const totalCost = currentTotalCost + currentCostCount;
    // console.log('totalCost', totalCost);
    const totalSale = totalPrice + currentTotalSale;
    // console.log('totalSale', totalSale)
    const data2 = { totalCost, totalSale, shopName, shopLogo, productLimit }


    useEffect(() => {
        axiosSecue?.post('/create-payment-intent', { price: totalPrice })
            .then(res => {
                setClientSecret(res.data.clientSecret)
            })
    }, [axiosSecue, totalPrice])









    const handleSubmit = async (event) => {
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
            Swal.fire({
                icon: "error",
                title: "You are not user!!",
                text: "Please Log in first",

            });
        }
        else {
            if (paymentIntent.status === 'succeeded') {

                const patchSaleCount = currentSaleCount + 1;
                const patchQuantity = currentQuantity - 1;
                // console.log(patchQuantity)
                const update = { patchSaleCount, patchQuantity }
                axiosSecue.patch(`/products/${productId}`, update)
                    .then(() => {
                    })
                    .catch(() => {
                    })


                axiosSecue.patch(`/users/modarator/${userEmail}`, data2)
                    .then(() => {
                        setTransactionId(paymentIntent.id);
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Payment successful",
                            showConfirmButton: false,
                            timer: 1500

                        })
                    })
                    .catch(() => {
                    })


            }
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
            <button type="submit" className="btn btn-sm bg-[#f76b00] text-white my-4" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-500">{error}</p>
            {transactionId && <p className="text-green-600">Your transxtom id: {transactionId}</p>}
        </form>
    );
};

export default UserCheckoutFrom;