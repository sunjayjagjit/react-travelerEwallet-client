import React, { useState, useEffect } from 'react';
import AdminDashNav from "../../../components/nav/AdminDashNav";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'
import { createCategory, getCategories, removeCategory } from '../../../functions/category';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryPackageForm from "../../../components/forms/CategoryPackageForm";
import FilterSearch from "../../../components/forms/FilterSearch";


const CategoryCreate = () => {

    const { user } = useSelector((state) => ({ ...state }))
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const [keyword, setFilter] = useState("");


    useEffect(() => {
        loadCategories();

    }, [])

    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(name);
        setLoading(true)
        createCategory({ name }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`"${res.data.name}" is succesffuly created`)
                loadCategories();
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
            removeCategory(slug, user.token)
                .then((res) => {
                    setLoading(false);
                    toast.error(`${res.data.name} deleted `)
                    loadCategories();

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
                    ) : (<h4>Create Package Type</h4>
                        )}
                    <CategoryPackageForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName} />

                    <FilterSearch keyword={keyword} setFilter={setFilter} />

                    <hr />
                    {categories.filter(searched(keyword)).map((c) => (
                        <div className="alert alert-secondary" key={c._id}>
                            {c.name}
                            <span
                                onClick={() => handleRemove(c.slug)}
                                className="btn btn-sm float-right">
                                <DeleteOutlined />
                            </span>
                            <Link to={`/admin/category/${c.slug}`}>
                                <span className="btn btn-sm float-right"><EditOutlined /></span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryCreate;