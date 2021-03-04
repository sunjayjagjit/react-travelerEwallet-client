import React, { useState, useEffect } from 'react';
import AdminDashNav from "../../../components/nav/AdminDashNav";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'
import { getCategory, updateCategory } from '../../../functions/category';
import CategoryPackageForm from "../../../components/forms/CategoryPackageForm";


//import { useParams } from "react-router-dom"

const CategoryUpdate = ({ history, match }) => {

    const { user } = useSelector((state) => ({ ...state }))
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        loadCategory();

    }, [])

    const loadCategory = () =>
        getCategory(match.params.slug).then((c) => setName(c.data.name));

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(name);
        setLoading(true)
        updateCategory(match.params.slug, { name }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`"${res.data.name}" is succesffuly updated`)
                history.push("/admin/category")

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
                    ) : (
                            <h4>Update Package Type</h4>
                        )}
                    <CategoryPackageForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName} />

                </div>
            </div>
        </div>
    );
};

export default CategoryUpdate;