import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";


const LoadUserRedirect = () => {

    const [count, setCount] = useState(5);
    let history = useHistory();

    useEffect(() => {

        const interval = setInterval(() => {
            //deacremanet to 1
            setCount((currentCount) => --currentCount);
        }, 1000);
        //redirect once count is equal to 0
        count === 0 && history.push("/");
        //cleanup to return back to 0
        return () => clearInterval(interval);
    }, [count, history]);

    return (

        <div className="container p-5 text-center">
            <p>Redirecting to you {count} seconds </p>
        </div>
    );
};

export default LoadUserRedirect;