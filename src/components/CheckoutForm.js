import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { createSubscription } from '../services/paymentServices';
import { useState } from 'react';

const CheckoutForm = (props) => {

    const {
        checkoutOnComplete,
        userDetails,
        price_amount,
        PaymentFor,
    } = props;

    const __PAYMENT_FOR_SUBSCRIPTION="subscription";
    const [ isLoading, setIsLoading ] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setIsLoading(true);
        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error(error);
        } else {
            console.log('PaymentMethod:', paymentMethod);
            if(PaymentFor===__PAYMENT_FOR_SUBSCRIPTION){
                const __post_obj = {
                    paymentMethodId: paymentMethod.id, 
                    customerEmail: userDetails?.email,
                    welldugo_product_constant_number: price_amount
                };
                const __res = await createSubscription(__post_obj);
                console.log(__res);
            }
            checkoutOnComplete();
            setIsLoading(false)
        }
    };

    return (
        <div style={{marginTop: 10, backgroundColor: "white", padding: 20, borderRadius: 8}}>
            <p style={{marginBottom: 20, fontSize: 13, color: "rgba(0,0,0,0.9)", fontWeight: "bolder"}}>
                Please add your card below and submit payment!
            </p>
            <form onSubmit={handleSubmit}>
                <CardElement />
                {
                    isLoading ?
                    <div style={{color: "white", cursor: "pointer", fontSize: 13, padding: 15, backgroundColor: "green", textAlign: "center", marginTop: 20, border: "none", width: "100%"}}>
                        <i style={{marginRight: 10, color: "lightgreen"}} className='fa-solid fa-spinner'></i>
                        Processing... Please Wait...
                    </div> :
                    <button style={{color: "white", cursor: "pointer", fontSize: 13, padding: 15, backgroundColor: "darkslateblue", textAlign: "center", borderRadius: 50, marginTop: 20, border: "none", width: "100%"}}
                        type="submit" disabled={!stripe}>
                        Submit
                    </button>
                }
            </form>
        </div>
    );
};

export default CheckoutForm;
