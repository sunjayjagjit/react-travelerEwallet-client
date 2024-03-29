let initialState = [];

// will load cart pakages from local storage

if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
        initialState = JSON.parse(localStorage.getItem("cart"));
    } else {
        initialState = [];
    }
}

export const cartReducer = (
    state = initialState,
    action

) => {

    switch (action.type) {
        case "ADD_TO_CART":
            return action.payload;
        default:
            return state;
    }
};