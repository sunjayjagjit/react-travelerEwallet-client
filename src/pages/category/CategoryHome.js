import React, { useState, useEffect } from "react";
import { getCategory } from "../../functions/category";
import PackageCard from "../../components/cards/PackageCard";


const CategoryHome = ({ match }) => {

    const [category, setCategory] = useState({});
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false)

    const { slug } = match.params;
    useEffect(() => {
        setLoading(true);
        getCategory(slug)
            .then((c) => {
                console.log(JSON.stringify(c.data, null, 4));
                setCategory(c.data.category);
                setPackages(c.data.packages);
                setLoading(false);
            });
    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    {loading ? (
                        <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">Loading</h4>
                    ) : (
                            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                                {packages.length} Packages in "{category.name}"" category
                            </h4>

                        )}

                </div>

            </div>
            <div className="row">
                {packages.map((p) =>
                    <div className="col-md-4" key={p._id}>
                        <PackageCard packagevact={p}  />
                    </div>
                )}
            </div>

        </div>
    );
};

export default CategoryHome;