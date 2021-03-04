import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { retrieveUserCart, removeUserCartDetails, saveUserDetails, applyReward } from "../functions/user";
import ReactQuill from "react-quill";
// import "react-quill/dist/quill.bubble.css"
import "react-quill/dist/quill.snow.css"




const PackagesCheckout = ({ history }) => {

    const [packages, setPackages] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState("");
    const [addressSave, setAddressSave] = useState(false);
    const [reward, setReward] = useState("");

    const [totalDiscount, setTotalDiscount] = useState(0);
    const [rewardError, setRewardError] = useState("");

    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        retrieveUserCart(user.token).then((res) => {
            console.log("user cart data res", JSON.stringify(res.data, null, 4));
            setPackages(res.data.packages);
            setTotal(res.data.cartTotal);
        });
    }, []);



    const removeCart = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("cart")
        }

        dispatch({
            type: "ADD_TO_CART",
            payload: [],
        });

        removeUserCartDetails(user.token)
            .then((res) => {
                setPackages([]);
                setTotal(0);
                setTotalDiscount(0)
                setReward("");
                toast.success("Cart is reset/empty")
            });

    };


    const saveDetailstoDb = () => {
        // console.log(address);
        saveUserDetails(user.token, address).then((res) => {
            if (res.data.ok) {
                setAddressSave(true)
                toast.success("Information details saved");
            }
        });
    };

    const applyDiscountRewards = () => {
        console.log("send rewards to Backend", reward);
        applyReward(user.token, reward)
            .then((res) => {
                console.log("RES on Rewards applied", res.data);
                if (res.data) {
                    setTotalDiscount(res.data)
                    dispatch({
                        type: "REWARD_APPLIED",
                        payload: true,
                    });
                }

                if (res.data.err) {
                    setRewardError(res.data.err)
                    dispatch({
                        type: "REWARD_APPLIED",
                        payload: false,
                    });
                }
            });

    };

    const showDetailsUser = () => (
        <>
            <ReactQuill
                theme="snow"

            />
            <br />
            <h3>Save Address:</h3>
            <br />
            <ReactQuill
                theme="snow"
                value={address}
                onChange={setAddress}
            />
            <h3>Phone Number:</h3>
            <ReactQuill
                theme="snow"
            />
        </>
    )





    const showPackageSummary = () => {
        return packages.map((p, i) => (
            <div key={i}>
                <p>{p.package.title} ({p.person}) x {p.count} ={" "}
                    {p.package.price * p.count}
                </p>
            </div>
        ));
    };

    const showApplyRewards = () => (
        <>
            <input
                onChange={(e) => {
                    setReward(e.target.value)
                    setRewardError("");
                }}
                value={reward}
                type="text"
                className="form-control"
            />
            <button
                onClick={applyDiscountRewards}
                className="btn btn-primary mt-2"
            >
                Redeem
         </button>
        </>

    )



    return (
        <div className="row">
            <div className="col-md-6">
                <h3>Name:</h3>
                <br />
                {showDetailsUser()}
                <br />
                <button className="btn btn-primary mt-2" onClick={saveDetailstoDb}>Save</button>
                <hr />
                <h3>Redeem Rewards</h3>
                <br />
                {showApplyRewards()}

                {rewardError && <p className="text-danger p-2">{rewardError}</p>}

            </div>

            <div className="col-md-6">
                <h4>Packages Summary</h4>
                <h1>{total}</h1>
                {/* {JSON.stringify(packages)} */}
                <hr />
                <p> Packages {packages.length} </p>
                <hr />
                <p>List Of Packages</p>
                {showPackageSummary()}
                <h4 />
                <p>Packages Total: {total}</p>
                <br />
                {totalDiscount > 0 && (
                    <p className="text-danger p-2"> Reward Applied: Current Total: RM{totalDiscount}</p>
                )}

                <div className="row">
                    <div className="col-md-6">
                        <button
                            className="btn btn-primary"
                            disabled={!addressSave || !packages.length}
                            onClick={() => history.push("/payment")}
                        >
                            CheckOut Now
                             </button>

                    </div>

                    <div className="col-md-6">
                        <button
                            disabled={!packages.length}
                            onClick={removeCart}
                            className="btn btn-primary"
                        >
                            Empty Cart
                        </button>

                    </div>


                    <div class="mb-3">
                        <div class="pt-5">
                            <h5 class="mb-6">We accept</h5>
                            <img class="mr-2" width="45px"
                                src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                                alt="Visa" />
                            <img class="mr-2" width="45px"
                                src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                                alt="Mastercard" />
                        </div>
                    </div>

                </div>
            </div>

        </div>


    );
};

export default PackagesCheckout;