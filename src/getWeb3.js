import Web3 from "web3";
import { useEffect, useState } from "react";

const useWeb3 = () => {


    const [web3, setWeb3] = useState(null);

    useEffect(() => {

        var instance;
        if (window.ethreum) {
            try {
                instance = new Web3(window.ethreum);
            } catch (error) {
                console.log(error);
            }
        } else if (window.web3) {
            instance = new Web3(window.web3.currentProvider);
        } else {
            const provider = new Web3.provider.HttpProvider("http://127.0.0.1:7545");
            instance = new Web3(provider);
        }
        setWeb3(instance);

    }, []);
    //inteact with local blochain 
    return web3;
};

export default useWeb3;
