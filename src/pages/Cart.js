import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PackagesCheckout from "../components/cards/PackagesCheckout";
import { userCart } from "../functions/user";

const Cart = ({ history }) => {
    const { cart, user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch;

    const getTotalPackages = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0);
    };

    const saveOrderDb = () => {
        // alert("Succesfully save order to database");
        // console.log("cart", JSON.stringify(cart, null, 4));
        userCart(cart, user.token)
            .then((res) => {
                console.log("Cart Post Respond", res)
                if (res.data.ok) history.push("/checkout");
            })
            .catch((err) => console.log("cart have error", err));
    };

    const displayCartPackage = () => (
        <table className="table table-bordered" >
            <thead className="thead-light">
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Category</th>
                    <th scope="col">Person</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Remove</th>
                </tr>
            </thead>
            {cart.map((p) => (
                <PackagesCheckout key={p._id} p={p} />
            ))}
        </table>
    );


    return (
        <div className="container-fluid pt-2">
            <div className="row">
                <div className="col-md-8">
                    <h4>Packages Cart</h4>
                    {!cart.length ? (
                        <p>
                            No Package In Cart. <Link to="/shop"> Continue to browser Package</Link>
                        </p>) : (
                            // "Display Package Cart"
                            displayCartPackage()
                        )}
                </div>
                <div className="col-,d-4">
                    <h3>Order Summary</h3>
                    <hr />
                    <p>Packages Vacation</p>
                    {cart.map((a, i) => (
                        <div key={i}>
                            {/* <p>title x quantity = $total</p> */}
                            <p>{a.title} x {a.count} = Rm{a.price * a.count}</p>
                        </div>
                    ))}
                    <hr />
                    Total: <b>Rm{getTotalPackages()}</b>
                    <hr />
                    {
                        user ? (
                            <button
                                onClick={saveOrderDb}
                                className="btn btn-sm btn-primary mt-2"
                                disabled={!cart.length}
                            >
                                Checkout
                            </button>
                        ) : (
                                <button className="btn btn-sm btn-primary mt-2">
                                    <Link to={{
                                        pathname: "/login",
                                        state: { from: "cart" },
                                    }}>
                                        Login To Checkout
                                   </Link>
                                </button>
                            )
                    }
                </div>
            </div>

        </div>
    );
};

export default Cart;