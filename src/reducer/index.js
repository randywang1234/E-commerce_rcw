import {combineReducers} from "redux"
import handleCart from "./handleCart"


const reducers = combineReducers({
    cart :handleCart,
})

export default reducers