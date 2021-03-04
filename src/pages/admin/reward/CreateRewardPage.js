import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { getRewards, removeReward, createReward } from "../../../functions/reward";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from "@ant-design/icons";
import AdminDashNav from "../../../components/nav/AdminDashNav";

const CreateRewardPage = () => {

    const [name, setName] = useState("");
    const [expirydate, setExpiryDate] = useState("");
    const [discount, setDiscount] = useState("");
    const [loading, setLoading] = useState("");
    const [rewards, setRewards] = useState([]);

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {

        getRewards().then((res) => setRewards(res.data));


    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        console.table(name, expirydate, discount);
        createReward({ name, expirydate, discount }, user.token)
            .then((res) => {
                setLoading(false)
                getRewards().then((res) => setRewards(res.data));
                setName("")
                setDiscount("")
                setExpiryDate("")
                toast.success(`"${res.data.name}" is created`);
            }).catch(err => console.log("createa coupon error --->", err));
    };

    const handleRemove = rewardId => {
        if (window.confirm("Delete Confirmation")) {
            setLoading(true)
            removeReward(rewardId, user.token).then((res) => {
                getRewards().then((res) => setRewards(res.data));
                setLoading(false)
                toast.error(` Reward "${res.data.name}" has been deleted`)
            }).catch((err) => console.log(err));
        }
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminDashNav />

                </div>

                <div className="col-md-10">
                    {loading ? <h4 className="text-danger">Loading</h4> : <h4> Rewards </h4>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="text-muted"> Name </label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                autoFocus
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="text-muted"> Rewards % </label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setDiscount(e.target.value)}
                                value={discount}
                                autoFocus
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="text-muted"> Expiry </label>
                            <br />
                            <DatePicker
                                className="form-control"
                                selected={new Date()}
                                value={expirydate}
                                onChange={(date) => setExpiryDate(date)}
                                required
                            />
                        </div>
                        <button className="btn btn-outline-primart">Save</button>
                    </form>

                    <h4> {rewards.length} Rewards List </h4>
                    <table className="table table-bordered">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Expiry Date</th>
                                <th scope="col">Discount</th>
                                <th scope="col">Remove</th>
                            </tr>
                        </thead>

                        <tbody>
                            {rewards.map((c) => (
                                <tr key={c._id}>
                                    <td>{c.name}</td>
                                    <td>{new Date(c.expirydate).toLocaleDateString()}</td>
                                    <td>{c.discount}</td>
                                    <td> <DeleteOutlined
                                        onClick={() => handleRemove(c._id)}
                                        className="text-danger"
                                    />
                                    Remove
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );

};

export default CreateRewardPage;