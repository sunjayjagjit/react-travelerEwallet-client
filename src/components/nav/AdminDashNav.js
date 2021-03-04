import React from "react";
import { Link } from "react-router-dom";

const AdminDashNav = () => (

    <nav>
        <ul className="nav flex-column">

            <li className="nav-item">
                <Link to="/admin/dashboard" className="nav-link"> DashBoard</Link>
            </li>

            <li className="nav-item">
                <Link to="/admin/package" className="nav-link">Package Tour</Link>
            </li>


            <li className="nav-item">
                <Link to="/admin/packages" className="nav-link">Package Tours</Link>
            </li>

            <li className="nav-item">
                <Link to="/admin/category" className="nav-link">Category</Link>
            </li>

            <li className="nav-item">
                <Link to="/admin/sub" className="nav-link">Sub Category</Link>
            </li>

            <li className="nav-item">
                <Link to="/admin/reward" className="nav-link">Rewards</Link>
            </li>

            <li className="nav-item">
                <Link to="/user/password" className="nav-link">Update Password</Link>
            </li>
        </ul>
    </nav>

);

export default AdminDashNav;