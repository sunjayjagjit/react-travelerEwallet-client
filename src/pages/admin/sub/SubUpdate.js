import React, { useState, useEffect } from 'react';
import AdminDashNav from "../../../components/nav/AdminDashNav";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'
import { getCategories } from '../../../functions/category';
import { getSub, updateSub } from '../../../functions/sub';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryPackageForm from "../../../components/forms/CategoryPackageForm";
import FilterSearch from "../../../components/forms/FilterSearch";


const SubUpdate = ({ match, history }) => {

    const { user } = useSelector((state) => ({ ...state }))
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    //const [category, setCategory] = useState([]);
    const [parent, setParent] = useState('');



    useEffect(() => {
        loadCategories();
        loadSubCategories();

    }, [])

    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data));

    const loadSubCategories = () => getSub(match.params.slug).then((s) => {
        setName(s.data.name)
        setParent(s.data.parent);
    });



    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(name);
        setLoading(true)
        updateSub(match.params.slug, { name, parent }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`"${res.data.name}" is succesffuly updated package name`)
                history.push('/admin/sub');

            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminDashNav />
                </div>
                <div className="col">
                    {loading ? (
                        <h4 className="text-primary">Loading...</h4>
                    ) : (<h4>Update Tour Package Name</h4>
                        )}

                    <div className="form-group">
                        <label>Package Name:</label>
                        <select
                            name="category"
                            className="form-control"
                            onChange={(e) => setParent(e.target.value)}>
                            <option>Please Select</option>
                            {categories.length > 0 && categories.map((c) => (
                                <option key={c._id} value={c._id} selected={c._id === parent}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <CategoryPackageForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName} />
                </div>
            </div>
        </div>
    );
};

export default SubUpdate;