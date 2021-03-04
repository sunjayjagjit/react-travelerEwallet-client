import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { auth } from '../../firebase';
import { toast } from "react-toastify";
import { createOrUpdatesUsers } from "../../functions/auth";


const RegisterCustomer = ({ history }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //const { user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    useEffect(() => {

        setEmail(window.localStorage.getItem('emailForRegistration'));

    }, [history])


    const handleSubmit = async (e) => {
        e.preventDefault();

        //password validation
        if (!email || !password) {
            toast.error("Email and password are needed");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        try {
            const result = await auth.signInWithEmailLink(email, window.location.href);
            if (result.user.emailVerified) {
                // remove user email id from local storage
                window.localStorage.removeItem('emailForRegistration');
                //get customer id token
                let user = auth.currentUser
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();
                //redux store to access 
                console.log("user", user, "idTokenResult", idTokenResult);

                createOrUpdatesUsers(idTokenResult.token)
                    .then((res) => {
                        //to verify the email and token to redux
                        dispatch({
                            type: 'LOGGED_IN_USER',
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult.token,
                                role: res.data.role,
                                _id: res.data._id,
                            },
                        });
                    })
                    .catch(err => console.log(err));
                //redirect
                history.push('/')

            }
        } catch (error) {
            //handle the error here
            toast.error(error.message);
        }
    };

    const customerRegister = () => (
        <form onSubmit={handleSubmit}>
            <input type="email" className="form-control" value={email} disabled />

            <input type="password"
                className="form-control"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter you password"
                autoFocus />

            <br />
            <button type="submit" className="btn btn-primary">Register</button>
        </form>
    );

    return (
        <div className="container p-5">
            <div className="row">

                <div className="col-md-6 offset-md-3">
                    <h4>Customer Registration Form</h4>
                    {customerRegister()}
                </div>
            </div>
        </div>
    );
};

export default RegisterCustomer;


