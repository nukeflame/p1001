import * as actionTypes from "../types";
import baseurl from "../../../config/urls/baseurl";

const API = "api/positions/";

export const fetchPositions = () => dispatch => {
  return new Promise((resolve, reject) => {
    baseurl
      .get(API)
      .then(res => {
        dispatch({
          type: actionTypes.FETCH_POSITIONS,
          payload: res.data
        });
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};
