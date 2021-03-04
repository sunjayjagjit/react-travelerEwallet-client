import axios from "axios";

export const createPaymentIntent = (authtoken, reward) =>

    axios.post(`${process.env.REACT_APP_API}/create-payment-intent`,
        { rewardApplied: reward },
        {
            headers: {
                authtoken,
            },
        }
    );

