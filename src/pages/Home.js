import React from "react";
import JumboEffectWriter from "../components/cards/JumboEffectWriter";
import LatestPackage from "../components/home/LatestPackage"
import UpdatedPackage from "../components/home/UpdatedPackage"
import CategoryList from "../components/category/CategoryList";
import SubListLocation from "../components/sub/SubListLocation";



const Home = () => {

    return (
        <>
            <div className="jumbotron text-info h2 font-weight-bold text-center">
                <JumboEffectWriter text={['Best Packages', 'Anywhere AnyTime', 'Cheapest In Malaysia', "Pay With MetaMask"]} />

                {/* {JSON.stringify(packages)} */}
            </div>

            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron bg-primary text-white">
                Memorable Place to Visit
            </h4>
            <LatestPackage />

            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron bg-primary text-white">
                Updated Packages Vacation Hot Selling!!
            </h4>
            <UpdatedPackage />

            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron bg-primary text-white">
                Package Categories
                <CategoryList />
            </h4>

            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron bg-primary text-white">
                Location
                <SubListLocation />
            </h4>
        </>

    );
};

export default Home;