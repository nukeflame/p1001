import * as actionTypes from "../../actions/types";

const initState = {
  user: null,
  roomMod: false,
  submittedLoging: false,
  userLoading: false,
  checkingUserPwd: false,
  checkSytemPassError: [],
  loggingErrors: {
    username: [],
    password: [],
    notfound: []
  },
  userUniqueNo: "---",
  userUniqueLoad: false,
  roomStatus: {
    branchId: 1,
    roomId: 1,
    statusId: 2,
    signInAt: null,
    signOutAt: null
  },
  loadSwitch: false
};

export default function(state = initState, action) {
  switch (action.type) {
    case actionTypes.FETCH_USER:
      return {
        ...state,
        user: action.payload
      };

    case actionTypes.LOGGING_USER:
      return {
        ...state,
        submittedLoging: action.payload
      };

    case actionTypes.SETTING_BRANCH:
      return {
        ...state,
        loadSwitch: action.payload
      };

    case actionTypes.LOADING_USER:
      return {
        ...state,
        userLoading: action.payload
      };

    case actionTypes.LOGGING_ERRORS:
      return {
        ...state,
        loggingErrors: {
          username: action.payload.username,
          password: action.payload.password,
          notfound: action.payload.notfound
        }
      };

    case actionTypes.CLEAR_LOGGING_ERRORS:
      return {
        ...state,
        loggingErrors: action.payload
          ? {
              username: [],
              password: [],
              notfound: []
            }
          : null
      };

    case actionTypes.AUTH_USER:
      return {
        ...state,
        user: action.payload
      };

    case actionTypes.CHECK_USER_PWD:
      return {
        ...state,
        checkSytemPass: action.payload
      };

    case actionTypes.CHECK_PWD_ERRORS:
      return {
        ...state,
        checkSytemPassError: action.payload
      };

    case actionTypes.CLEAR_CHECK_PWD_ERRORS:
      return {
        ...state,
        checkSytemPassError: action.payload ? [] : null
      };

    case actionTypes.CHECKING_USER_PWD:
      return {
        ...state,
        checkingUserPwd: action.payload
      };

    case actionTypes.USER_NO:
      return {
        ...state,
        userUniqueNo: action.payload
      };

    case actionTypes.USER_NO_LOAD:
      return {
        ...state,
        userUniqueLoad: action.payload
      };

    case actionTypes.FETCH_ROOM_STATUS:
      const p = action.payload;
      return {
        ...state,
        roomStatus: {
          branchId: p.branch.id,
          roomId: p.room.id,
          statusId: p.statusId,
          signInAt: p.signInAt,
          signOutAt: p.signOutAt
        }
      };

    case actionTypes.UPDATE_ROOM_STATUS:
      const room = action.payload;
      return {
        ...state,
        roomStatus: Object.assign({}, room, {
          branchId: room.branch.id,
          roomId: room.room.id,
          statusId: room.statusId,
          signInAt: room.signInAt,
          signOutAt: room.signOutAt
        })
      };

    default:
      return state;
  }
}
