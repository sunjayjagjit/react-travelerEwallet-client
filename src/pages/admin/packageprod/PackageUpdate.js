import React, { useState, useEffect } from 'react';
import AdminDashNav from "../../../components/nav/AdminDashNav";
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'
import { getCategories, getCategorySubs } from '../../../functions/category';
import { getPackage, updatePackage } from '../../../functions/package';
import FileUpload from "../../../components/forms/FileUpload";
import { SyncOutlined } from "@ant-design/icons"
import PackageUpdateForm from "../../../components/forms/PackageUpdateForm";


const initialState = {
    title: "",
    description: "",
    price: "",
    category: "",
    subs: [],
    quantity: "",
    images: [],
    persons: ["2person", "4person", "6person", "10person"],
    packagetypes: ["SoloTrips", "FamilyAdventure", "BackPackers", "IslandParadise"],
    person: "",
    packagetype: "",

};

const PackageUpdate = ({ match, history }) => {

    const [values, setValues] = useState(initialState);

    const { user } = useSelector((state) => ({ ...state }));

    const { slug } = match.params;

    const [subOptionals, setSubOptionals] = useState([]);
    const [categories, setCatogories] = useState([]);
    const [arrayOfSubs, setArrayOfSubsIds] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        loadPackage();
        loadCategories();

    }, []);

    const loadPackage = () => {

        getPackage(slug)
            .then((p) => {
                // console.log("Single Package", p);
                //load package vacation 
                setValues({ ...values, ...p.data })
                // asbtract package vacation from sub category
                getCategorySubs(p.data.category._id)
                    .then((res) => {
                        setSubOptionals(res.data);

                    });
                let arr = []
                p.data.subs.map((s) => {
                    arr.push(s._id)
                });
                setArrayOfSubsIds((prev) => arr)

            });
    };

    const loadCategories = () =>
        getCategories().then((c) => {
            console.log("get categories update", c.data);
            setCatogories(c.data)
        });

    const handleSubmit = (e) => {

        e.preventDefault();
        setLoading(true)
        values.subs = arrayOfSubs
        values.category = selectedCategory ? selectedCategory : values.category;
        updatePackage(slug, values, user.token)
            .then((res) => {
                setLoading(false)
                toast.success(`${res.data.title} is updates`)
                history.push("/admin/package")
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data.err);
            })
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
        setValues({ ...values, subs: [] });

        setSelectedCategory(e.target.value);

        getCategorySubs(e.target.value)
            .then((res) => {
                console.log("Subs Options on category click", res);
                setSubOptionals(res.data);
            });

        console.log("latest updates category", values.category);

        // setShowSub(true);
        if (values.category._id === e.target.value) {
            loadPackage();

        }
        setArrayOfSubsIds([])
    }


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
                            <h4> Package Updates form</h4>
                        )}

                    {JSON.stringify(values)}

                    <div className="p-3">
                        <FileUpload
                            values={values}
                            setValues={setValues}
                            setLoading={setLoading}
                        />
                    </div>

                    <PackageUpdateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        setValues={setValues}
                        values={values}
                        handleCategoryChange={handleCategoryChange}
                        categories={categories}
                        subOptionals={subOptionals}
                        arrayOfSubs={arrayOfSubs}
                        setArrayOfSubsIds={setArrayOfSubsIds}
                        selectedCategory={selectedCategory}


                    />
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default PackageUpdate;

