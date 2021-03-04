import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../functions/stripe";
import { Card } from "antd";
import { DollarOutlined, CheckOutlined } from "@ant-design/icons";
import paymentb from "../images/paymentb.png"
import { saveOrder, removeUserCartDetails } from "../functions/user";

//MetMask
import useStoreApi from "../storeApi";
import useWeb3 from "../getWeb3"
import { Button, TextField } from "@material-ui/core";

const StripeCheckoutPayment = ({ history }) => {

    const dispatch = useDispatch()
    const { user, reward } = useSelector((state) => ({ ...state }));

    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState("");

    const [cartTotal, setCartTotal] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [payable, setPayable] = useState(0);

    const stripe = useStripe()
    const elements = useElements();

    //MeteMask

    const { address, balance, message, setBalance, setAddress } = useStoreApi();
    const web3 = useWeb3();

    useEffect(() => {
        createPaymentIntent(user.token, reward)
            .then((res) => {
                console.log("create payment intent", res.data);
                setClientSecret(res.data.clientSecret);

                //Received Successfully Afer user made payment
                setCartTotal(res.data.cartTotal)
                setTotalDiscount(res.data.totalDiscount);
                setPayable(res.data.payable);

            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true)

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: e.target.name.value,
                },
            },
        });

        if (payload.error) {
            setError(`Payment Failed ${payload.error.message}`)
            setProcessing(false);
        } else {

            saveOrder(payload, user.token)
                .then((res) => {
                    if (res.data.ok) {
                        if (typeof window !== "undefined") localStorage.removeItem("cart");
                        dispatch({
                            type: "ADD_TO_CART",
                            payload: [],
                        });
                        dispatch({
                            type: "REWARD_APPLIED",
                            payload: false,
                        });

                        removeUserCartDetails(user.token);
                    }
                })

            console.log(JSON.stringify(payload, null, 4));
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    };

    const handleChange = async (e) => {
        setDisabled(e.empty); // error user cant  proceed to pay
        setError(e.error ? e.error.message : "");
    };

    //MetMask
    const setUserAccount = async () => {
        if (window.ethereum) {
            await window.ethereum.enable();
            web3.eth.getAccounts().then(accounts => {
                setAddress(accounts[0]);
                setUserBalance(accounts[0])
            });
        }
    };

    const setUserBalance = async (fromAddress) => {
        await web3.eth.getBalance(fromAddress).then(value => {
            const metacredit = web3.utils.fromWei(value, "ether")
            setBalance(metacredit)
        });
    };

    //MeteMask transfer one account into another account
    const sendTransaction = async (e) => {
        e.preventDefault();
        const amount = e.target[0].value;
        const receiver = e.target[1].value;

        await web3.eth.sendTransaction({
            from: address,
            to: receiver,
            value: web3.utils.toWei(amount, 'ether')
        })
        setBalance(address)
    }


    const cartStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: "Arial, sans-serif",
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d",
                },
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
            },
        },
    };

    return (
        <>
            <p className={succeeded ? "result-message" : "result-message hidden"}>
                Payment Successful.
               <Link to="/user/history">Packages History</Link>
            </p>
            {
                !succeeded && (<div>
                    {reward && totalDiscount !== undefined ? (
                        <p className="alert alert-success">{`Total After Discount: RM${totalDiscount}`}</p>
                    ) : (
                            <p className="alert alert-danger">No Reward Applied</p>

                        )}
                </div>
                )}




            <div className="text-center pb-5">
                <Card
                    cover={
                        <img
                            src={paymentb}
                            style={{
                                height: "200px",
                                objectFit: "cover",
                                marginBottom: "-50px",
                            }}
                        />
                    }
                    actions={[
                        <>
                            <DollarOutlined className="text-info" /> <br /> Total: RM {cartTotal}
                        </>,
                        <>
                            <CheckOutlined className="text-info" /> <br /> Total Payment: RM
                            {(payable / 100).toFixed(2)}
                        </>,

                    ]}

                />
            </div>

            <form
                id="payment-form"
                className="stripe-form"
                onSubmit={handleSubmit}
            >
                {/* User enter Payment Details */}
                <CardElement
                    id="card-element"
                    options={cartStyle}
                    onChange={handleChange}
                />
                <button
                    className="stripe-button"
                    disabled={processing || disabled || succeeded}
                >
                    <span id="button-text">
                        {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
                    </span>
                </button>
                <br />
                {error && (
                    <div className="card-error" role="alert">{error}</div>)}

            </form>
            <p>
                <code>Pay With MetMask</code>
            </p>

            { address ? (
                <>
                    <p>Your Meta Address: {address}</p>
                    <p>Ether Balance: {balance}</p>
                </>
            ) : null}
            <Button
                style={{ marginBottom: "15px" }}
                variant="outlined"
                color="secondary"
                onClick={() => setUserAccount()}>
                Connect to MetaMask
            </Button>
            <form onSubmit={(e) => sendTransaction(e)}>
                <TextField
                    inputProps={{ step: "any" }}
                    label="Amount Ether"
                    id="filled-margin-none"
                    placeholder="100"
                    helperText="Some important text"
                    variant="filled"
                    type="number"

                />
                <TextField

                    label="Traveler-Ewallet"
                    placeholder="#0xbCD4bdFC137Fb25f3eC27B19d64A01a3062a54fa"
                    variant="filled"


                />

                <Button
                    style={{ margin: "15px" }}
                    variant="outlined"
                    color="secondary"
                    type="submit">
                    Send Trasaction
            </Button>
            </form>
        </>

    );

};


export default StripeCheckoutPayment;