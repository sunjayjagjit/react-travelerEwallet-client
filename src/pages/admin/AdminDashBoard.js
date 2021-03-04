import React from 'react';
import AdminDashNav from "../../components/nav/AdminDashNav"

const AdminDashBoard = () => {



    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminDashNav />
                </div>

                <div className="col">
                    <h4>Admin Dashboard</h4>
                </div>
            </div>
        </div>
    );
};

export default AdminDashBoard;