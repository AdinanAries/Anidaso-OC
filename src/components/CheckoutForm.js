import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CheckoutForm = (props) => {

    const {
        checkoutOnComplete
    } = props;

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error(error);
        } else {
            console.log('PaymentMethod:', paymentMethod);
            // Send paymentMethod.id to your backend for subscription creation
            checkoutOnComplete();
        }
    };

    return (
        <div style={{marginTop: 10, backgroundColor: "white", padding: 20, borderRadius: 8}}>
            <p style={{marginBottom: 20, fontSize: 13, color: "rgba(0,0,0,0.9)", fontWeight: "bolder"}}>
                Please add your card below and submit payment!
            </p>
            <form onSubmit={handleSubmit}>
            <CardElement />
            <button style={{color: "white", cursor: "pointer", fontSize: 13, padding: 15, backgroundColor: "darkslateblue", textAlign: "center", borderRadius: 50, marginTop: 20, border: "none", width: "100%"}}
                type="submit" disabled={!stripe}>
                Subscribe
            </button>
            </form>
        </div>
    );
};

export default CheckoutForm;
