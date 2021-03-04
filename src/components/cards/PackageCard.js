import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { AimOutlined, HeartOutlined } from "@ant-design/icons";
import kuala from "../../images/kuala.png";
import { Link } from "react-router-dom";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";

const { Meta } = Card;
const PackageCard = ({ packagevact }) => {

    const [tooltip, setToolTip] = useState("Add to Cart")
    const dispatch = useDispatch()
    const { user, cart } = useSelector((state) => ({ ...state }));

    const handleAddToCart = () => {

        //card that will save in local Storage
        let cart = [];
        if (typeof window !== "undefined") {
            //if cart in local Storage to retreive the package
            if (localStorage.getItem("cart")) {
                cart = JSON.parse(localStorage.getItem("cart"))
            }
            cart.push({
                ...packagevact,
                count: 1
            });
            let unique = _.uniqWith(cart, _.isEqual);
            console.log("unique", unique);
            localStorage.setItem("cart", JSON.stringify(unique));
            setToolTip("Added");

            dispatch({
                type: "ADD_TO_CART",
                payload: unique,
            });

            dispatch({
                type: "SET_VISIBLE",
                payload: true,
            });
        }
    };
    const { images, title, description, slug, price } = packagevact;
    return (

        <Card cover={
            <img
                src={images && images.length ? images[0].url : kuala}
                style={{ height: "150px", objectFit: "cover" }}
                className="p-1"
            />
        }
            actions={[
                <Link to={`/package/${slug}`}>
                    <AimOutlined className="text-primary" /><br /> View Package
            </Link>,
                <Tooltip title={tooltip}>
                    <a onClick={handleAddToCart} disabled={packagevact.quantity < 1} >
                        <HeartOutlined className="text-danger" /> <br />
                        {packagevact.quantity < 1 ? "Out of stock" : "Add To Cart"}
                    </a>
                </Tooltip>,
            ]}
        >
            <Meta
                title={`${title} RM${price}`}
                description={`${description && description.substring(0, 45)}...`}
            />


        </Card>
    );
};

export default PackageCard;