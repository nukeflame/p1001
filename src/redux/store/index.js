/**
|--------------------------------------------------
| Default Store
|--------------------------------------------------
*/
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import userReducer from "../reducers/userReducer";
import usersReducer from "../reducers/usersReducer";
import patientReducer from "../reducers/patientReducer";
import chatReducer from "../reducers/chatReducer";
import hospitalsReducer from "../reducers/hospitalsReducer";
import clientReducer from "../reducers/clientReducer";
import depReducer from "../reducers/depReducer";
import queueReducer from "../reducers/queueReducer";
import groupReducer from "../reducers/groupReducer";
import permGroupReducer from "../reducers/permGroupReducer";
import moduleReducer from "../reducers/moduleReducer";
import positionReducer from "../reducers/positionReducer";
import idsReducer from "../reducers/idsReducer";
import alertReducer from "../reducers/alertReducer";
import branchesReducer from "../reducers/branchesReducer";

const rootReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  patients: patientReducer,
  chats: chatReducer,
  hospitals: hospitalsReducer,
  clients: clientReducer,
  departments: depReducer,
  queues: queueReducer,
  groups: groupReducer,
  permGroups: permGroupReducer,
  modules: moduleReducer,
  positions: positionReducer,
  ids: idsReducer,
  alert: alertReducer,
  branches: branchesReducer
});

const initState = {};
const middleware = [thunk];
const store = createStore(
  rootReducer,
  initState,
  compose(
    applyMiddleware(...middleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
