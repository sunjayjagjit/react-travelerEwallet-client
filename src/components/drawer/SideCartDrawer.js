import React from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import kuala from "../../images/kuala.png";

const SideCartDrawer = ({ children }) => {

    const dispatch = useDispatch();
    const { drawer, cart } = useSelector((state) => ({ ...state }));

    const imagesCart = {
        width: "100%",
        height: "50px",
        objectFit: "cover"
    }

    return <Drawer
        className="text-center"
        title={`Cart / ${cart.length} Packages`}
        placement="right"
        closable={false}
        onClose={() => {
            dispatch({
                type: "SET_VISIBLE",
                payload: false,
            });
        }}
        visible={drawer}>
        {/* {JSON.stringify(cart)} */}
        {cart.map((p) => (
            <div key={p._id} className="row">
                <div className="col">
                    {p.images[0] ? (
                        <>
                            <img src={p.images[0].url} style={imagesCart} alt="My Awesome Image" />
                            <p className="text-center bg-secondary text-light">{p.title} x {p.count}</p>
                        </>
                    ) : (
                            <>
                                <img src={kuala} style={imagesCart} alt="My Awesome Image" />
                                <p className="text-center bg-secondary text-light">{p.title} x {p.count}</p>
                            </>
                        )}
                </div>
            </div>
        ))}
        <Link to="/cart">
            <button onClick={() =>
                dispatch({
                    type: "SET_VISIBLE",
                    payload: false,
                })
            } className="text-center btn btn-primary btn-raised btn-block">
                Cart
            </button>
        </Link>
    </Drawer>

}

export default SideCartDrawer;