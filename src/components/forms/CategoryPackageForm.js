import React from "react";

const CategoryPackageForm = ({ handleSubmit, name, setName }) => (

    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Name</label>
            <input type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
            />
            <br />
            <button className="btn btn-outline-primay">Create</button>

        </div>

    </form>

)

export default CategoryPackageForm;