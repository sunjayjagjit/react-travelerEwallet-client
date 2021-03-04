import React, { useEffect, useState } from "react";
import { getPackages, getPackagesCount } from "../../functions/package";
import PackageCard from "../cards/PackageCard";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";



const LatestPackage = () => {

    const [packages, setPackages] = useState([])
    const [loading, setLoading] = useState(false);
    const [packagesCount, setPackagesCount] = useState(0);
    const [pagePag, setPagePag] = useState(1);


    useEffect(() => {

        loadAllPackages()

    }, [pagePag])

    useEffect(() => {
        getPackagesCount().then((res) => setPackagesCount(res.data));
    }, []);

    const loadAllPackages = () => {
        setLoading(true);
        getPackages("createdAt", "desc", pagePag)
            .then((res) => {
                setPackages(res.data);
                setLoading(false);
            });
    };

    return (
        <>
            {packagesCount}

            <div className="container">
                {/* Show how many card in the user side */}
                {loading ? (<LoadingCard count={3} />) : (<div className="row">
                    {packages.map((packagevact) => (
                        <div key={packagevact._id} className="col-md-4">
                            <PackageCard packagevact={packagevact} />
                        </div>
                    ))}
                </div>
                )}
            </div>

            <div className="row">
                <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
                    <Pagination
                        current={pagePag}
                        total={(packagesCount / 3) * 10}
                        onChange={(value) => setPagePag(value)} />

                </nav>

            </div>
        </>

    );
};

export default LatestPackage;