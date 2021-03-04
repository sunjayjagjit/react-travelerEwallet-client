import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadUserRedirect from './LoadUserRedirect'


const UserPrivateRoutes = ({ children, ...rest }) => {

    //access the user using state
    const { user } = useSelector((state) => ({ ...state }));

    //to check the token for user auth
    return user && user.token ? <Route {...rest} /> : <LoadUserRedirect />

};

export default UserPrivateRoutes;
