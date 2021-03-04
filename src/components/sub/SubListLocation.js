import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubs } from "../../functions/sub";



const SubListLocation = () => {

    const [subs, setSubsLocation] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getSubs().then((s) => {
            setSubsLocation(s.data);
            setLoading(false);
        });
    }, []);

    const displaySubsLocation = () => subs.map((s) => (
        <div key={s._id} className=" col btn btn-outlined-info btn-lg btn-block btn-raised m-3 text-white">
            <Link to={`/sub/${s.slug}`}>{s.name}</Link>
        </div>
    ));

    return (
        <div className="container">
            <div className="row">
                {loading ? (
                    <h4 className="text-center">Loading</h4>
                ) : (displaySubsLocation()
                    )}

            </div>

        </div>
    );
};

export default SubListLocation;