import React, { useState, useEffect } from 'react';
import AdminDashNav from "../../../components/nav/AdminDashNav";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'
import { getCategories, getCategorySubs } from '../../../functions/category';
import { createPackage } from '../../../functions/package';
import PackageCreateForm from "../../../components/forms/PackageCreateForm";
import FileUpload from "../../../components/forms/FileUpload";
import { SyncOutlined } from "@ant-design/icons";

const initialState = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    subs: [],
    quantity: "",
    images: [],
    persons: ["2person", "4person", "6person", "10person"],
    packagetypes: ["Couple", "FamilyAdventure", "BackPackers", "IslandParadise"],
    person: "",
    packagetype: "",

};

const PackageCreate = () => {
    const [values, setValues] = useState(initialState);
    const { user } = useSelector((state) => ({ ...state }));
    const [subOptionals, setSubOptionals] = useState([]);
    const [showSub, setShowSub] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCategories();

    }, [])

    const loadCategories = () =>
        getCategories().then((c) => setValues({ ...values, categories: c.data }));

    const handleSubmit = (e) => {
        e.preventDefault();
        createPackage(values, user.token)
            .then((res) => {
                console.log(res);
                window.alert(`"${res.data.title}" is created`);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                // if (err.response.status === 400) toast.error(err.response.data);
                toast.error(err.response.data.err);
            });
    };

    const handleChange = (e) => {
        //object to pass in the initialState
        setValues({ ...values, [e.target.name]: e.target.value });
        //console.log(e.target.name, '----------', e.target.value);
    };

    //to fetch sub category from backend
    const handleCategoryChange = (e) => {
        e.preventDefault()
        console.log("click category", e.target.value);
        setValues({ ...values, subs: [], category: e.target.value });
        getCategorySubs(e.target.value)
            .then((res) => {
                console.log("Subs Options on category click", res);
                setSubOptionals(res.data);
            });
        setShowSub(true);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminDashNav />
                </div>
                <div className="col-md-10">
                    {loading ? (
                        <SyncOutlined spin className="text-danger h2" />
                    ) : (
                            <h4> Package Create form</h4>
                        )}

                    <hr />

                    {/* {JSON.stringify(values.categories)} */}
                    {/* {JSON.stringify(values.subs)} */}
                    {JSON.stringify(values.images)}


                    <div className="p-3">
                        <FileUpload
                            values={values}
                            setValues={setValues}
                            setLoading={setLoading}
                        />
                    </div>

                    <PackageCreateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        setValues={setValues}
                        values={values}
                        handleCategoryChange={handleCategoryChange}
                        subOptionals={subOptionals}
                        showSub={showSub} />
                </div>
            </div>
        </div>
    );
};

export default PackageCreate;

