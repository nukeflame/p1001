import * as actionTypes from "../types";
import baseurl from "../../../config/urls/baseurl";

const API = "api/user/";
let authUser = null;

export const fetchUser = () => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({ type: actionTypes.LOADING_USER, payload: true });
    baseurl
      .get(API)
      .then(res => {
        const data = res.data;
        authUser = data;
        //alert
        if (data.isActive === 0) {
          const alertData = {
            alertMd: true,
            alertHeader: "Blocked",
            alertInfo: "Your account has been Blocked! Contact Administrator. "
          };
          dispatch({
            type: actionTypes.BLOCKED_ALERT,
            payload: alertData
          });
        } else if (data.isActive === 1) {
          const alertData = {
            alertMd: true,
            alertHeader: "Suspended",
            alertInfo:
              "Your account has been Suspended! Contact Administrator. "
          };
          dispatch({
            type: actionTypes.SUSPEND_ALERT,
            payload: alertData
          });
        }
        //auth user
        dispatch({
          type: actionTypes.AUTH_USER,
          payload: data
        });
        //set user branch
        dispatch({
          type: actionTypes.SET_HOSP_BRANCH,
          payload: data.hospBranchId
        });
        resolve();
      })
      .catch(error => {
        reject(error);
      })
      .finally(() => {
        dispatch({ type: actionTypes.LOADING_USER, payload: false });
      });
  });
};

export const setBranchRoom = data => dispatch => {
  dispatch({ type: actionTypes.SETTING_BRANCH, payload: true });
  return new Promise(resolve => {
    baseurl
      .put(`api/room_status/${data.branchId}`, data)
      .then(res => {
        if (res.data.user) {
          dispatch({
            type: actionTypes.FETCH_USER,
            payload: res.data.user
          });
        }
        if (res.data.room) {
          dispatch({
            type: actionTypes.UPDATE_ROOM_STATUS,
            payload: res.data.room
          });
        }
        resolve();
      })
      .finally(() => {
        dispatch({ type: actionTypes.SETTING_BRANCH, payload: false });
      });
  });
};

export const fetchRoomStatus = () => dispatch => {
  return new Promise(resolve => {
    baseurl.get("api/room_status").then(res => {
      const r = res.data;
      if (r.length > 0) {
        const room = r[0];
        dispatch({
          type: actionTypes.FETCH_ROOM_STATUS,
          payload: room
        });
      }
      resolve();
    });
  });
};

export const signOutRoom = data => dispatch => {
  return new Promise(resolve => {
    baseurl.post("api/room_status", data).then(res => {
      // const r = res.data;
      // if (r.length > 0) {
      //   const depName = r[0].room.depName;
      //   dispatch({
      //     type: actionTypes.FETCH_ROOM_STATUS,
      //     payload: depName
      //   });
      // } else {
      //   dispatch({
      //     type: actionTypes.SET_ROOM_NAME,
      //     payload: data
      //   });
      // }
      resolve();
    });
  });
};

export const checkUserPwd = data => dispatch => {
  return new Promise(resolve => {
    dispatch({ type: actionTypes.CHECKING_USER_PWD, payload: true });
    baseurl
      .post("api/check_password/", data)
      .then(res => {
        if (res.data.result) {
          dispatch({
            type: actionTypes.CHECK_USER_PWD,
            payload: res.data.result
          });
          resolve();
        } else {
          dispatch({
            type: actionTypes.CHECK_USER_PWD,
            payload: res.data.result
          });
        }
      })
      .catch(error => {
        if (error.response.status === 422) {
          const errors = error.response.data;
          if (errors.error) {
            dispatch({
              type: actionTypes.CHECK_PWD_ERRORS,
              payload: errors.error
            });
            //clear errors
            setTimeout(() => {
              dispatch({
                type: actionTypes.CLEAR_CHECK_PWD_ERRORS,
                payload: true
              });
            }, 5000);
          }
        }
      })
      .finally(() => {
        dispatch({ type: actionTypes.CHECKING_USER_PWD, payload: false });
      });
  });
};

export const handleUserLevel = data => dispatch => {
  return new Promise(resolve => {
    baseurl
      .put(API + data.id, data)
      .then(res => {
        dispatch({
          type: actionTypes.UPDATE_USER,
          payload: res.data
        });
        resolve();
      })
      .catch(error => {
        console.log(error);
      });
  });
};

export const handleUserActiveStatus = data => dispatch => {
  return new Promise(resolve => {
    baseurl
      .put(API + data.id, data)
      .then(res => {
        const user = res.data;
        //alert
        if (authUser.id === user.id) {
          if (user.isActive === 0) {
            const alertData = {
              alertMd: true,
              alertHeader: "Blocked",
              alertInfo:
                "Your account has been Blocked! Contact Administrator. "
            };
            dispatch({
              type: actionTypes.BLOCKED_ALERT,
              payload: alertData
            });
          } else if (user.isActive === 1) {
            const alertData = {
              alertMd: true,
              alertHeader: "Suspended",
              alertInfo:
                "Your account has been Suspended! Contact Administrator. "
            };
            dispatch({
              type: actionTypes.SUSPEND_ALERT,
              payload: alertData
            });
          }
        }
        dispatch({
          type: actionTypes.UPDATE_USER,
          payload: user
        });
        resolve();
      })
      .catch(error => {
        console.log(error);
      });
  });
};

export const getUserNo = () => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: actionTypes.USER_NO_LOAD,
      payload: true
    });
    baseurl
      .get("api/user/uniqueNo")
      .then(res => {
        dispatch({
          type: actionTypes.USER_NO,
          payload: res.data
        });
        resolve();
      })
      .catch(error => {
        reject(error);
      })
      .finally(() => {
        dispatch({
          type: actionTypes.USER_NO_LOAD,
          payload: false
        });
      });
  });
};
