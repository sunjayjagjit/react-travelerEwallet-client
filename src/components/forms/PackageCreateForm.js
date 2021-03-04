import React from "react";
import { Select } from "antd";

const { Option } = Select;

const PackageCreateForm = ({
    handleSubmit,
    handleChange,
    values,
    setValues,
    handleCategoryChange,
    subOptionals,
    showSub
}) => {

    const {
        title,
        description,
        price,
        categories,
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
                <select name="person"
                    className="form-control"
                    onChange={handleChange}>
                    <option>Please Select Number of Persons</option>
                    {persons.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>

            </div>

            <div className="form-group">
                <label>Select Your Package</label>
                <select name="packagetype"
                    className="form-control"
                    onChange={handleChange}>
                    <option>Please Select Package type</option>
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
                    onChange={handleCategoryChange}>
                    <option>Please Select</option>
                    {categories.length > 0 && categories.map((c) => (
                        <option key={c._id} value={c._id}>
                            {c.name}
                        </option>))}
                </select>
            </div>

            {/* {subOptionals ? subOptionals.length : "no subs yet"} */}

            { showSub && <div>
                <label>Categories type:</label>
                <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please Select"
                    value={subs}
                    onChange={(value) => setValues({ ...values, subs: value })}
                >
                    {subOptionals.length &&
                        subOptionals.map((s) => (
                            <Option key={s._id} value={s._id}>
                                {s.name}
                            </Option>
                        ))}
                </Select>
            </div>}
            <br />
            <button className="btn btn-outline-success">Save</button>
        </form>
    );
};

export default PackageCreateForm;