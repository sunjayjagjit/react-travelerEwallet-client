import React, { useEffect, useState } from 'react';
import AdminDashNav from "../../../components/nav/AdminDashNav";
import { getPackagesByCount } from "../../../functions/package";
import { removePackage } from "../../../functions/package";
import AdminPackageCard from "../../../components/cards/AdminPackageCard";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AllPackages = () => {

    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadAllPackages();
    }, []);

    const loadAllPackages = () => {
        setLoading(true);
        getPackagesByCount(100)
            .then((res) => {
                setPackages(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    }

    const handleRemove = (slug) => {

        // let comfirmDelete = window.confirm("Delete Comfirmation?")
        if (window.confirm("Delete Comfirmation?")) {
            // console.log("Delete Success", slug);
            removePackage(slug, user.token)
                .then((res) => {
                    loadAllPackages();
                    toast.err(`${res.data.title} is deleted`);

                })
                .catch((err) => {
                    console.log(err);
                    //if (err.response.status === 400) toast.error(err.response.data);
                })
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminDashNav />
                </div>

                <div className="col">
                    {loading ? (
                        <h4>Loading...</h4>
                    ) : (
                            <h4>All Type Of Packages</h4>
                        )}
                    <div className="row">
                        {packages.map((packagevac) => (
                            <div key={packagevac._id} className="col-md-4 pb-3">

                                {/* packagesvac = package vacation */}
                                <AdminPackageCard packagevac={packagevac} handleRemove={handleRemove} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllPackages;