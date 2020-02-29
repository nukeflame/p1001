import * as actionTypes from "../types";
import baseurl from "../../../config/urls/baseurl";
import history from "../../../config/history";

const API = "api/hospitals";

export const fetchHospitals = () => dispatch => {
  return new Promise((resolve, reject) => {
    baseurl
      .get(API)
      .then(res => {
        dispatch({
          type: actionTypes.FETCH_HOSPITALS,
          payload: res.data
        });
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const createHospital = data => dispatch => {
  return new Promise((resolve, reject) => {
    baseurl
      .post(API, data)
      .then(res => {
        dispatch({
          type: actionTypes.ADD_HOSPITAL,
          payload: res.data
        });
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const findHospital = data => dispatch => {
  return new Promise(resolve => {
    dispatch({ type: actionTypes.FINDING_HOSPITAL, payload: true });
    baseurl
      .post("api/hospcode/", data)
      .then(res => {
        dispatch({
          type: actionTypes.FIND_HOSPITAL,
          payload: res.data
        });
        const client = {
          name: res.data.hospName,
          clientId: res.data.client.id
        };

        localStorage.setItem("client", JSON.stringify(client));
        resolve(res);
        history.push("/auth/login");
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 422) {
            const errors = error.response.data.errors;
            if (errors.hospital_code) {
              dispatch({
                type: actionTypes.HOSPITAL_ERRORS,
                payload: { hospital_code: errors.hospital_code }
              });
            }
          } else if (error.response.status === 404) {
            dispatch({
              type: actionTypes.HOSPITAL_ERRORS,
              payload: { hospital_code: ["Invalid code, try again"] }
            });
          }
        }
      })
      .finally(() => {
        dispatch({ type: actionTypes.FINDING_HOSPITAL, payload: false });
      });
  });
};

export const selectedHosp = data => dispatch => {
  return new Promise(resolve => {
    dispatch({ type: actionTypes.SELECTED_HOSP, payload: data });
    resolve();
  });
};
