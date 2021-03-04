import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import kuala from "../../images/kuala.png"
import PackageListVacation from "../cards/PackageListVacation";
import StarRatings from "react-star-ratings";
import RatingUser from "../modal/RatingUser";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";


const { TabPane } = Tabs;
const SinglePackage = ({ packagevac, onStarRatingClick, star, packagevact }) => {
    const [tooltip, setToolTip] = useState("Add to Cart")
    const dispatch = useDispatch()
    const { title, images, description, _id } = packagevac

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
    }

    return (
        <>

            <div className="col-md-7">
                {images && images.length ? (
                    <Carousel showArrows={true} autoPlay infiniteLoop>
                        {/* loop the images in the carousel */}
                        {images && images.map((i) => <img src={i.url} alt="Vacation Packages" key={i.public_id} />)}
                    </Carousel>
                ) : (
                        <Card
                            cover={
                                <img
                                    src={kuala}
                                    className="mb-3 card image"
                                />
                            }>
                        </Card>
                    )}

                <Tabs type="card">
                    <TabPane tab="Description" key="1">
                        {description && description}
                    </TabPane>
                    <TabPane tab="Description" key="2">
                        Able to Pay With MetMask
                    </TabPane>
                </Tabs>
            </div>

            <div className="col-md-5">
                {/* Package info */}
                {/* {packagevac.title} */}
                <h1 className="bgcolor p-3">{title}</h1>
                {/* <StarRatings /> */}

                <Card
                    actions={[
                        <Tooltip title={tooltip}>
                            <a onClick={handleAddToCart}>
                                <HeartOutlined className="text-danger" /> <br /> Add to Cart
                            </a>
                        </Tooltip>,
                        <Link to={"/"}>
                            <HeartOutlined className="text-info" /> <br />Add to Wishlist
                    </Link>,
                        <RatingUser>
                            <StarRatings
                                name={_id}
                                numberOfStars={5}
                                rating={star}
                                changeRating={onStarRatingClick}
                                isSelectable={true}
                                starRatedColor="blue"

                            />
                        </RatingUser>

                    ]}

                >
                    <p>
                        {/* price/category/subs/Number of Peson/Packages quantity/ Date of Travel */}
                        <PackageListVacation packagevac={packagevac} />

                    </p>
                </Card>

            </div>

        </>
    )
}

export default SinglePackage;
