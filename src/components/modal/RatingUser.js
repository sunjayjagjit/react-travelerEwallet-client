import React, { useState } from "react";
import { Modal, Button } from 'antd';
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";


const RatingUser = ({ children }) => {

    const { user } = useSelector((state) => ({ ...state }));
    const [modalVisible, setModalVisible] = useState(false);

    let history = useHistory();
    let { slug } = useParams();
    // console.log("slug", slug);

    const handleModal = () => {
        if (user && user.token) {
            setModalVisible(true)
        } else {
            history.push({
                pathname: "/login",
                state: { from: `/package/${slug}` },
            });
        }
    };

    return (
        // Children props to the SinglePackage star ratings
        <>
            <div onClick={handleModal}>
                {/* button to leave star rating */}
                <StarOutlined className="text-info" /> <br />{" "}
                {user ? "Leave Rating" : "Login to Leave Rating"}
            </div>
            <Modal
                title="Leave Rating"
                centered
                visible={modalVisible}
                onOk={() => {
                    setModalVisible(false)
                    toast.success("Thank for your Rating.");
                }}
                onCancel={() => {
                    setModalVisible(false)
                }}
            >
                {children}
            </Modal>
        </>
    )

}

export default RatingUser;