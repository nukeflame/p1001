import * as actionTypes from "../types";
import baseurl from "../../../config/urls/baseurl";

const API = "api/queues/";

export const fetchQueues = () => dispatch => {
  return new Promise((resolve, reject) => {
    baseurl
      .get(API)
      .then(res => {
        dispatch({
          type: actionTypes.fetchQueues,
          payload: res.data
        });
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const createQueue = data => dispatch => {
  return new Promise((resolve, reject) => {
    baseurl
      .post(API, data)
      .then(res => {
        console.log(res.data);

        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const updateQueue = (formData, id) => dispatch => {
  return new Promise((resolve, reject) => {
    baseurl
      .put(API + id, formData)
      .then(res => {
        dispatch({
          type: actionTypes.NEW_PATIENT,
          payload: res.dataactionTypes
        });
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const destroyQueue = Ids => dispatch => {
  return new Promise((resolve, reject) => {
    if (Ids.length > 1) {
      let dataIds = [];
      for (var i = 0; i < Ids.length; i++) {
        dataIds.push(Ids[i].id);
      }

      baseurl
        .post("/api/delpatients", dataIds)
        .then(res => {
          dispatch({
            type: actionTypes.DEL_PATIENTS,
            payload: res.data
          });
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    } else {
      let id = Ids[0].id;
      baseurl
        .delete(API + id, id)
        .then(res => {
          dispatch({
            type: actionTypes.DEL_PATIENT,
            payload: res.data
          });
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    }
  });
};
