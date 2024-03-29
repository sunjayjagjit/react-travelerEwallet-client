import React, { useState, useEffect } from "react";
import { auth } from '../../firebase';
import { toast } from "react-toastify";
import { Button } from 'antd';
import { useSelector } from 'react-redux';



const ForgotPassword = ({ history }) => {

    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(state => ({ ...state }));

    useEffect(() => {
        if (user && user.token) {
            history.push("/");
        }
    }, [user, history]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const configUrl = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true,
        }
        await auth.sendPasswordResetEmail(email, configUrl)
            .then(() => {
                setEmail('')
                setLoading(false)
                toast.success("Check your email for password reset link");
            })
            .catch((error) => {
                setLoading(false)
                toast.error(error.message)
                console.log("Erro forgot password", error);
            });
    };

    return <div className="container col-mid-6 offset-md-3 p-5">
        {loading ? (
            <h4>loading</h4>
        ) : (
                <h4>Enter New Password</h4>
            )}

        <form onSubmit={handleSubmit}>
            <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                autoFocus
            />
            <br />
            <button className="btn btn-raised" disabled={!email}>
                Submit
            </button>

        </form>
    </div>
}

export default ForgotPassword;