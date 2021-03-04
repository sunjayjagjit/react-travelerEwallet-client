import React from "react";
import { Card } from "antd";
import kuala from "../../images/kuala.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

const AdminPackageCard = ({ packagevac, handleRemove }) => {

    const { title, description, images, slug } = packagevac;


    return (
        <Card
            cover={
                <img
                    src={images && images.length ? images[0].url : kuala}
                    style={{ height: "150px", objectFit: "cover" }}
                    className="p-1"
                />
            }
            actions={[
                <Link to={`/admin/package/${slug}`}>
                    <EditOutlined className="text-primary" />
                </Link>,
                <DeleteOutlined
                    onClick={() => handleRemove(slug)}
                    className="text-danger"
                />,
            ]}
        >
            <Meta title={title} description={`${description && description.substring(0, 45)}...`}></Meta>
        </Card>
    );

};

export default AdminPackageCard;
