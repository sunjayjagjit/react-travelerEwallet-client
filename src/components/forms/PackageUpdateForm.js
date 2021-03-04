import React from "react";
import { Select } from "antd";

const { Option } = Select;

const PackageUpdateForm = ({
    handleSubmit,
    handleChange,
    values,
    setValues,
    handleCategoryChange,
    categories,
    subOptionals,
    arrayOfSubs,
    setArrayOfSubsIds,
    selectedCategory,
    // showSub
}) => {

    const {
        title,
        description,
        price,
        category,
        subs,
        quantity,
        images,
        persons,
        packagetypes,
        person,
        packagetype,
    } = values;

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={title}
                    onChange={handleChange} />

            </div>

            <div className="form-group">
                <label>Description</label>
                <input type="text"
                    name="description"
                    className="form-control"
                    value={description}
                    onChange={handleChange} />

            </div>

            <div className="form-group">
                <label>Price</label>
                <input type="number"
                    name="price"
                    className="form-control"
                    value={price}
                    onChange={handleChange} />

            </div>

            <div className="form-group">
                <label>Packages Quantity</label>
                <input type="number"
                    name="quantity"
                    className="form-control"
                    value={quantity}
                    onChange={handleChange} />

            </div>

            <div className="form-group">
                <label>Number Of Person</label>
                <select
                    value={person}
                    name="person"
                    className="form-control"
                    onChange={handleChange}>

                    {persons.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>

            </div>

            <div className="form-group">
                <label>Select Your Package</label>
                <select
                    value={packagetype}
                    name="packagetype"
                    className="form-control"
                    onChange={handleChange}>
                    {packagetypes.map((b) => (
                        <option key={b} value={b}>
                            {b}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Package type:</label>
                <select
                    name="category"
                    className="form-control"
                    onChange={handleCategoryChange}
                    value={selectedCategory ? selectedCategory : category._id}

                >



                    {categories.length > 0 && categories.map((c) => (
                        <option key={c._id} value={c._id}>
                            {c.name}
                        </option>))}
                </select>
            </div>

            <div>
                <label>Categories type:</label>
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please Select"
                    value={arrayOfSubs}
                    onChange={(value) => setArrayOfSubsIds(value)}
                >
                    {subOptionals.length &&
                        subOptionals.map((s) => (
                            <Option key={s._id} value={s._id}>
                                {s.name}
                            </Option>
                        ))}
                </Select>
            </div>


            <br />
            <button className="btn btn-outline-success">Save</button>
        </form>
    );
};

export default PackageUpdateForm;