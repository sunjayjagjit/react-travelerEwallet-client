import React, { useState, useEffect } from 'react';
import UserNav from '../../components/nav/UserNav';
import { getUserOrders } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";


const History = () => {

    const [orders, setOrders] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadUserOrders()
    }, [])

    const loadUserOrders = () => getUserOrders(user.token)
        .then((res) => {
            console.log(JSON.stringify(res.data, null, 4));
            setOrders(res.data);
        });

    //each order have many packages  loop the packages

    const displayOrderTable = (order) =>
        <table className="table table-bordered">
            <thead className="thead-dark">
                <tr className="table-info">
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Category</th>
                    <th scope="col">Person</th>
                    <th scope="col">Quantity</th>
                </tr>
            </thead>

            <tbody>
                {order.packages.map((p, i) => (
                    <tr key={i}>
                        <td>
                            <b>{p.package.title} </b>
                        </td>
                        <td>{p.package.price}</td>
                        <td>{p.package.packagetype}</td>
                        <td>{p.person}</td>
                        <td>{p.count}</td>

                    </tr>
                ))}
            </tbody>
        </table>

    const displayUserOders = () =>
        orders.map((order, i) => (
            <div
                key={i}
                className="m-5 p-3 card"
            >
                <p>Payment Info</p>
                {displayOrderTable(order)}
                <div className="row">
                    <div className="col">
                        <p>Dowload Pdf Reference</p>
                    </div>
                </div>
            </div>
        ))

    return (


        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col text-center">
                    <h4>
                        {orders.length > 0 ? "User Purchase Packages Order" : "No Packages Order"}
                    </h4>
                    {displayUserOders()}
                </div>
            </div>


        </div>
    );
};





export default History;