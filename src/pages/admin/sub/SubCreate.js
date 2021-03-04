import React, { useState, useEffect } from 'react';
import AdminDashNav from "../../../components/nav/AdminDashNav";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'
import { getCategories } from '../../../functions/category';
import { createSub, getSub, getSubs, removeSub } from '../../../functions/sub';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryPackageForm from "../../../components/forms/CategoryPackageForm";
import FilterSearch from "../../../components/forms/FilterSearch";


const SubCreate = () => {

    const { user } = useSelector((state) => ({ ...state }))
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState([]);
    const [subs, setSubs] = useState([]);

    const [keyword, setFilter] = useState("");


    useEffect(() => {
        loadCategories();
        loadSubsCategories();

    }, [])

    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data));

    const loadSubsCategories = () => getSubs().then((s) => setSubs(s.data));



    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(name);
        setLoading(true)
        createSub({ name, parent: category }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`"${res.data.name}" is succesffuly created`)
                loadSubsCategories();

            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };

    const handleRemove = async (slug) => {
        // let answer = window.confirm("Confirmation Before Delete");
        // console.log(answer, slug);
        if (window.confirm("Confirmation Before Delete")) {
            //if admin click comfirm
            setLoading(true)
            removeSub(slug, user.token)
                .then((res) => {
                    setLoading(false);
                    toast.error(`${res.data.name} deleted `);
                    loadSubsCategories();

                })
                .catch((err) => {
                    if (err.response.status === 400) {
                        setLoading(false)
                        toast.error(err.response.data);
                    }
                })

        }
    };


    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminDashNav />
                </div>
                <div className="col">
                    {loading ? (
                        <h4 className="text-primary">Loading...</h4>
                    ) : (<h4>Create Tour Package Name</h4>
                        )}

                    <div className="form-group">
                        <label>Package Name:</label>
                        <select
                            name="category"
                            className="form-control"
                            onChange={(e) => setCategory(e.target.value)}>
                            <option>Please Select</option>
                            {categories.length > 0 && categories.map((c) => (
                                <option key={c._id} value={c._id}>
                                    {c.name}
                                </option>))}
                        </select>
                    </div>

                    {JSON.stringify(category)}

                    <CategoryPackageForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName} />

                    <FilterSearch keyword={keyword} setFilter={setFilter} />


                    {subs.filter(searched(keyword)).map((s) => (
                        <div className="alert alert-secondary" key={s._id}>
                            {s.name}
                            <span
                                onClick={() => handleRemove(s.slug)}
                                className="btn btn-sm float-right">
                                <DeleteOutlined />
                            </span>
                            <Link to={`/admin/sub/${s.slug}`}>
                                <span className="btn btn-sm float-right"><EditOutlined /></span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubCreate;