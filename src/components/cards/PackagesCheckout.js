import React from "react";
import ModalImage from "react-modal-image";
import kuala from "../../images/kuala.png";
import { useDispatch } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";

const PackagesCheckout = ({ p }) => {
    const persons = ["2person", "4person", "6person", "10person"];
    let dispatch = useDispatch();

    const handleChangePerson = (e) => {
        console.log("person update", e.target.value);
        let cart = [];
        if (typeof window !== "undefined") {
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }
            cart.map((packagevac, i) => {
                if (packagevac._id === p._id) {
                    cart[i].color = e.target.value;
                }
            });
            localStorage.setItem("cart", JSON.stringify(cart));
            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            });
        }
    };

    const handleRemove = () => {
        // console.log(p._id, "Successfully remove cart");

        let cart = [];
        if (typeof window !== "undefined") {
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"));
            }
            cart.map((packagevac, i) => {
                if (packagevac._id === p._id) {
                    cart.splice(i, 1)
                }
            });
            localStorage.setItem("cart", JSON.stringify(cart));
            dispatch({
                type: "ADD_TO_CART",
                payload: cart,
            });
        }
    };

    return (
        <tbody>
            <tr>
                <td>
                    <div style={{ width: "100px", height: "auto" }}>
                        {p.images.length ? (
                            <ModalImage small={p.images[0].url} large={p.images[0].url} />
                        ) : (
                                <ModalImage small={kuala} large={kuala} />
                            )}
                    </div>
                </td>
                <td>{p.title}</td>
                <td>{p.price}</td>
                <td>{p.packagetype}</td>
                <td>
                    <select
                        onChange={handleChangePerson}
                        name="person"
                        className="form-control"
                    >
                        {p.color ? (
                            <option value={p.color}>{p.color}</option>
                        ) : (
                                <option>Select</option>
                            )}
                        {persons.filter((c) => c !== p.color).map((c) =>
                        (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </td>
                <td>{p.count}</td>
                <td>
                    <CloseOutlined
                        onClick={handleRemove}
                        className="text-danger"
                    />

                </td>


            </tr>
        </tbody>
    );
};

export default PackagesCheckout;