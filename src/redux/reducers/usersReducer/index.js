import * as actionTypes from "../../actions/types";

const initState = {
  users: [],
  branchUsers: [],
  savingUser: false,
  userErrors: {
    username: [],
    email: [],
    password: [],
    idNo: []
  }
};

export default function(state = initState, action) {
  switch (action.type) {
    case actionTypes.FETCH_USERS:
      return {
        ...state,
        users: action.payload
      };

    case actionTypes.FIND_USERS:
      return {
        ...state,
        branchUsers: action.payload
      };

    case actionTypes.ADD_USER:
      return {
        ...state,
        users: [...state.data, action.payload],
        branchUsers: [...state.data, action.payload]
      };

    case actionTypes.SAVING_USER:
      return {
        ...state,
        savingUser: action.payload
      };

    case actionTypes.UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.payload.id) {
            return Object.assign({}, user, action.payload);
          }
          return user;
        })
      };

    case actionTypes.USER_ERRORS:
      return {
        ...state,
        userErrors: {
          username: action.payload.username,
          email: action.payload.email,
          password: action.payload.password,
          idNo: action.payload.idNo
        }
      };

    case actionTypes.CLEAR_USER_ERRORS:
      return {
        ...state,
        userErrors: action.payload
          ? {
              username: [],
              idNo: [],
              email: [],
              password: []
            }
          : null
      };

    default:
      return state;
  }
}
