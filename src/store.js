import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers/HomeReducer";
const initialState = {};

const store = createStore(reducer, initialState);

export default store;
