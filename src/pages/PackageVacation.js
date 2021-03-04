import React, { useEffect, useState } from "react";
import { getPackage, packageStar } from "../functions/package";
import SinglePackage from "../components/cards/SinglePackage";
import { useSelector } from "react-redux";
import { getRelated } from "../functions/package";
import PackageCard from "../components/cards/PackageCard";

// to display the package details in cart
const PackageVacation = ({ match }) => {

    const [packagevac, setPackage] = useState({});
    const [related, setRelated] = useState([]);
    const [star, setStarRating] = useState(0) // set star value with 0 in state
    const { user } = useSelector((state) => ({ ...state }));
    const { slug } = match.params;

    useEffect(() => {
        loadSinglePackage();

    }, [slug]);

    const loadSinglePackage = () => {
        getPackage(slug).then((res) => {
            setPackage(res.data)
            getRelated(res.data._id).then((res) => setRelated(res.data))
        });

    };

    const onStarRatingClick = (newRating, name) => {
        console.table(newRating, name);
        setStarRating(newRating);
        packageStar(name, star, user.token)
            .then((res) => {
                console.log("rating updated", res.data);
                loadSinglePackage();
            });

    };

    // return <>{JSON.stringify(packagevac)} </>
    return <div className="container-fluid">
        <div className="row pt-4">
            <SinglePackage
                packagevac={packagevac}
                onStarRatingClick={onStarRatingClick}
                star={star}
            />
        </div>
        <div className="row">
            <div className="col text-center pt-5 pb-5">
                <hr />
                <h4> Related Package Category</h4>
                <hr />
                {/* {JSON.stringify(related)} */}
            </div>
        </div>
        <div className="row pb-5">
            {related.length
                ? related.map((r) => (
                    <div key={r._id} className="col-md-4">
                        <PackageCard packagevact={r} />

                    </div>
                ))
                : <div className="text-center col">No Package Found</div>}

        </div>

    </div>

};

export default PackageVacation;