import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutPayment from "../components/StripeCheckoutPayment";
import "../stripe.css"

const loadstr = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const PackagesPayment = () => {

    return (
        <div className="container p-5 text-center ">

            <h4>Complete Payment</h4>
            <Elements stripe={loadstr}>

                <div className="col-md-8 offset-md-2">
                    <p>Stripe Checkout Packages</p>
                    <StripeCheckoutPayment />
                </div>

            </Elements>


        </div>
    )
}

export default PackagesPayment;