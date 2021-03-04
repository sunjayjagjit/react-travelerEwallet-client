import React from "react";


const FilterSearch = ({ keyword, setFilter }) => {

    //filtering
    const handleSearchChange = (e) => {
        e.preventDefault()
        setFilter(e.target.value.toLowerCase());

    };


    return (

        <div>
            <input
                type="search"
                placeholder="Filter"
                value={keyword}
                onChange={handleSearchChange}
                className="form-control mb-4"
            />
        </div>
    );
};

export default FilterSearch;

