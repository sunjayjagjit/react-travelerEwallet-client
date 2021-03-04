import axios from "axios"

export const userCart = async (cart, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/user/cart`, { cart }, {
        headers: {
            authtoken,
        },
    },
    );

export const retrieveUserCart = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
        headers: {
            authtoken,
        },
    },
    );


export const removeUserCartDetails = async (authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/user/cart`, {}, {
        headers: {
            authtoken,
        },
    },
    );

export const saveUserDetails = async (authtoken, address) =>
    await axios.post(`${process.env.REACT_APP_API}/user/details`, { address }, {
        headers: {
            authtoken,
        },
    },
    );

export const applyReward = async (authtoken, reward) =>
    await axios.post(`${process.env.REACT_APP_API}/user/cart/reward`, { reward }, {
        headers: {
            authtoken,
        },
    },
    );

export const saveOrder = async (stripeReponse, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/user/order`, { stripeReponse }, {
        headers: {
            authtoken,
        },
    },
    );

export const getUserOrders = async (authtoken) =>
    await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
        headers: {
            authtoken,
        },
    },
    );