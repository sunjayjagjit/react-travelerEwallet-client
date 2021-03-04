import React from "react";
import { Link } from "react-router-dom";


const PackageListVacation = ({ packagevac }) => {

    const { price, category, subs, person, packagetype, quantity, sold } = packagevac;

    return (
        <ul className="list-group">
            <li className="list-group-item">
                Price {" "}
                <span className="label label-default label-pill pull-xs-right">
                    RM {price}
                </span>
            </li>

            { category && (<li className="list-group-item">
                Category {" "}
                <Link to={`/category/${category.slug}`}
                    className="label label-default label-pill pull-xs-right">
                    {category.name}

                </Link>
            </li>
            )}

            {subs && (
                <li className="list-group-item">
                    Location list
                    {subs.map((s) =>
                        <Link
                            key={s._id}
                            to={`/sub/${s.slug}`}
                            className="label label-default label-pill pull-xs-right">
                            {s.name}
                        </Link>
                    )}
                </li>

            )}


            <li className="list-group-item">
                Number Of Person {" "}
                <span className="label label-default label-pill pull-xs-right">
                    {person}
                </span>
            </li>

            <li className="list-group-item">
                Package Type {" "}
                <span className="label label-default label-pill pull-xs-right">
                    {packagetype}
                </span>
            </li>

            <li className="list-group-item">
                Available Packages {" "}
                <span className="label label-default label-pill pull-xs-right">
                    {quantity}
                </span>
            </li>

            <li className="list-group-item">
                Sold Packages {" "}
                <span className="label label-default label-pill pull-xs-right">
                    {sold}
                </span>
            </li>
        </ul>
    );
};

export default PackageListVacation;