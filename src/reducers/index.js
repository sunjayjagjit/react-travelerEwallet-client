import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { searchFilterReducer } from './searchFilterReducer';
import { cartReducer } from "./cartReducer"
import { drawerReducer } from "./drawerReducer"
import { rewardReducer } from "./rewardReducer"

export const rootReducer = combineReducers({

    user: userReducer,
    search: searchFilterReducer,
    cart: cartReducer,
    drawer: drawerReducer,
    reward: rewardReducer,

});

export default rootReducer;