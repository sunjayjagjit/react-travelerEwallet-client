import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadUserRedirect from './LoadUserRedirect';
import { currentAdmin } from '../../functions/auth';


const AdminRoute = ({ children, ...rest }) => {

    //access the user using state
    const { user } = useSelector((state) => ({ ...state }));
    const [ok, setOk] = useState(false);

    useEffect(() => {
        if (user && user.token) {
            currentAdmin(user.token)
                .then(res => {
                    console.log('current Admin now', res);
                    setOk(true);
                })
                .catch(err => {
                    console.log('Only for admin can access', err);
                    setOk(false);
                })
        }

    }, [user])

    //to check the token for user auth
    return ok ? <Route {...rest} /> : <LoadUserRedirect />

};

export default AdminRoute;
