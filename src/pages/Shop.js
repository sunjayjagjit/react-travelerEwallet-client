import React, { useState, useEffect } from "react";
import { getPackagesByCount, fetchPackagesFilter } from "../functions/package";
import { getCategories } from "../functions/category"
import { getSubs } from "../functions/sub"
import { useSelector, useDispatch } from "react-redux";
import PackageCard from "../components/cards/PackageCard";
import { Menu, Slider, Checkbox, Radio } from "antd";
import { DollarOutlined, CarryOutOutlined } from "@ant-design/icons";

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {

    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const [delay, setDelay] = useState(false);
    const [categories, setCategories] = useState([]); //sidebar
    const [categoriesChks, setCategoriesCks] = useState([]); //backend to Search the packages and display
    const [subs, setSubs] = useState([]);
    const [sub, setSub] = useState("");
    const [packagetypes, setPackagesTypes] = useState(["Couple", "FamilyAdventure", "BackPackers", "IslandParadise",]);
    const [packagetype, setPackagesType] = useState("");
    const [persons, setPersons] = useState(["2person", "4person", "6person", "10person",]);
    const [person, setPerson] = useState("");


    let dispatch = useDispatch();
    let { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    useEffect(() => {
        loadAllPackages()
        getCategories().then((res) => setCategories(res.data));
        getSubs().then(res => setSubs(res.data))
    }, []);

    //load the Packages Vacation default in Home page
    const loadAllPackages = () => {
        getPackagesByCount(12).then((p) => {
            setPackages(p.data);
            setLoading(false);
        });
    };

    useEffect(() => {
        // console.log("load Packagaes Vacation on search", text);
        const textDelayed = setTimeout(() => {
            fetchPackages({ searchQuery: text });
            if (!text) {
                loadAllPackages();
            }
        }, 200)
        return () => clearTimeout(textDelayed);
    }, [text]);

    const fetchPackages = (text) => {
        fetchPackagesFilter(text)
            .then((res) => {
                setPackages(res.data);
            });
    };



    //Price Range Home Section
    useEffect(() => {
        console.log("Request is Ok");
        fetchPackages({ price });
    }, [delay]);

    const handleSlider = (value) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setCategoriesCks([]);
        setPrice(value);
        setSub("");
        setPackagesType("");
        setPerson("");
        setTimeout(() => {
            setDelay(!delay)
        }, 400);
    };

    const displayCategories = () =>
        categories.map((c) => (
            <div key={c._id}>
                <Checkbox
                    onChange={handleCheck}
                    className="pb-2 pl-4 pr-4"
                    value={c._id}
                    name="category"
                    checked={categoriesChks.includes(c._id)}
                >
                    {c.name}
                </Checkbox>
                <br />
            </div>
        ));

    const displaySubsLocation = () =>
        subs.map((s) => (
            <div
                key={s._id}
                onClick={() => handleSubLocation(s)}
                className="p-1 m-1 badge badge-secondary"
                style={{ cursor: "pointer" }}
            >
                {s.name}
            </div>
        ));

    const handleSubLocation = (s) => {
        // console.log("SUBS", s);
        setSub(s)
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setCategoriesCks([]);
        setPrice([0, 0]);
        setPackagesType("");
        setPerson("");
        fetchPackages({ sub });

    };



    const handleCheck = (e) => {

        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setSub("");
        setPackagesType("");
        setPerson("");

        let inTheState = [...categoriesChks];
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked)

        if (foundInTheState === -1) {
            inTheState.push(justChecked);
        } else {
            inTheState.splice(foundInTheState, 1);
        }
        setCategoriesCks(inTheState);
        console.log(inTheState);
        fetchPackages({ category: inTheState })
    };


    const displayPackagesTypes = () => packagetypes.map((b) =>
        <Radio
            value={b}
            name={b}
            checked={b === packagetype}
            onChange={handlePackagesType}
            className="pb-1 pl-4 pr-4"
        >
            {b}
        </Radio>
    );
    const handlePackagesType = (e) => {
        setSub("")
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setCategoriesCks([]);
        setPrice([0, 0]);
        setPerson("");
        setPackagesType(e.target.value)
        fetchPackages({ packagetype: e.target.value });
    }

    const displayPerson = () =>
        persons.map((p) => (
            <Radio
                value={p}
                name={p}
                checked={p === person}
                onChange={handlePerson}
                className="pb-1 pl-4 pr-4"
            >
                {p}
            </Radio>
        ));


    const handlePerson = (e) => {
        setSub("")
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setCategoriesCks([]);
        setPrice([0, 0]);
        setPackagesType("")
        setPerson(e.target.value)
        fetchPackages({ person: e.target.value });
    };


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 pt-2">
                    <h3>Search Packages</h3>
                    <Menu defaultOpenKeys={["sliderone", "categorytwo", "subsThree", "packagesfour", "personFive"]} mode="inline">
                        <SubMenu
                            key="sliderone"
                            title={
                                <span className="h5">
                                    <DollarOutlined />
                            Price
                            </span>}>
                            <div>
                                <Slider
                                    className="ml-4 mr-4"
                                    tipFormatter={(a) => `RM${a}`}
                                    range value={price}
                                    onChange={handleSlider}
                                    max="600"
                                />
                            </div>
                        </SubMenu>

                        <SubMenu
                            key="categorytwo"
                            title={
                                <span className="h5">
                                    <CarryOutOutlined />
                                    Categories
                                </span>}>
                            <div style={{ marginTop: "-10px" }}>
                                {displayCategories()}
                            </div>
                        </SubMenu>


                        <SubMenu
                            key="subsThree"
                            title={
                                <span className="h5">
                                    <CarryOutOutlined />
                                    Location Cover
                                </span>}>
                            <div style={{ marginTop: "-10px" }} className="pl-4 pr-4">
                                {displaySubsLocation()}
                            </div>
                        </SubMenu>

                        <SubMenu
                            key="packagesfour"
                            title={
                                <span className="h5">
                                    <CarryOutOutlined />
                                    Package Types
                                </span>}>
                            <div style={{ marginTop: "-10px" }} className="pr-5">
                                {displayPackagesTypes()}
                            </div>
                        </SubMenu>


                        <SubMenu
                            key="personFive"
                            title={
                                <span className="h5">
                                    <CarryOutOutlined />
                                    Number Of Person
                                </span>}>
                            <div style={{ marginTop: "-10px" }} className="pr-5">
                                {displayPerson()}
                            </div>
                        </SubMenu>
                    </Menu>
                </div>

                <div className="col-md-9 pt-2">
                    {loading ? (
                        <h4 className="text-danger"> Loading....</h4>
                    ) : (
                            <h4 className="text-danger"> Packages </h4>
                        )}

                    {packages.length < 1 && <p>No Packages Found</p>}

                    <div className="row pb-4">
                        {packages.map((p) => (
                            <div key={p._id} className="col-md-4 mt-2">
                                <PackageCard packagevact={p} />
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
};

export default Shop;