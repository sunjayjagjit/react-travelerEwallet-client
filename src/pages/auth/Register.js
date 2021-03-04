import React, { useState, useEffect } from "react";
import { auth } from '../../firebase';
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';


const Register = ({ history }) => {
    const [email, setEmail] = useState('');
    const { user } = useSelector(state => ({ ...state }));

    useEffect(() => {
        if (user && user.token) {
            history.push("/");
        }
    }, [user, history]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        //console.log("ENV --->", process.env.REACT_APP_REGISTER_REDIRECT_URL);
        const configUrl = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
        }
        await auth.sendSignInLinkToEmail(email, configUrl)
        toast.success(
            //to send to notify to users
            (`Email is send to ${email}. Click the link to complete your resgistration.`)
        );
        //setItem
        //getItem
        window.localStorage.setItem('emailForRegistration', email)

        //clear email
        setEmail("");
    };

    const customerRegisterForm = () => (
        <form onSubmit={handleSubmit}>
            <label for="exampleInputEmail1">Email address</label>
            <input type="email"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter Email"
                autoFocus
            />

            <br />
            <button type="submit" className="btn btn-primary">Register</button>
        </form>
    );

    return (
        <div className="container p-5">
            <div className="row">

                <div className="col-md-6 offset-md-3">
                    <h4>Register Form</h4>

                    {customerRegisterForm()}
                </div>
            </div>
        </div>
    );
};

export default Register;


