import * as actionTypes from "../types";
import baseurl from "../../../config/urls/baseurl";

const API = "api/patients/";

export const fetchPatients = () => dispatch => {
  return new Promise((resolve, reject) => {
    baseurl
      .get(API)
      .then(res => {
        dispatch({
          type: actionTypes.FETCH_PATIENTS,
          payload: res.data
        });
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const createPatient = data => dispatch => {
  return new Promise(resolve => {
    baseurl
      .post(API, data)
      .then(res => {
        dispatch({
          type: actionTypes.NEW_PATIENT,
          payload: res.data
        });
        resolve(res);
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 422) {
            const err = error.response.data.errors;
            const errArray = [];

            if (err.surname) {
              dispatch({
                type: actionTypes.PATIENT_ERRORS,
                payload: { surname: err.surname }
              });
            } else if (err.othernames) {
              dispatch({
                type: actionTypes.PATIENT_ERRORS,
                payload: { othernames: err.othernames }
              });
            } else if (err.phone) {
              dispatch({
                type: actionTypes.PATIENT_ERRORS,
                payload: { phone: err.phone }
              });
            } else if (err.sex) {
              dispatch({
                type: actionTypes.PATIENT_ERRORS,
                payload: { sex: err.sex }
              });
            } else if (err.days) {
              dispatch({
                type: actionTypes.PATIENT_ERRORS,
                payload: { days: err.days }
              });
            } else if (err.month) {
              dispatch({
                type: actionTypes.PATIENT_ERRORS,
                payload: { month: err.month }
              });
            } else if (err.years) {
              dispatch({
                type: actionTypes.PATIENT_ERRORS,
                payload: { years: err.years }
              });
            }
          }
        }

        //clear errors
        setTimeout(() => {
          dispatch({
            type: actionTypes.CLEAR_PATIENT_ERRORS,
            payload: true
          });
        }, 5000);

        //   if (err.othernames) {
        //     errArray.push({ othernames: err.othernames });
        //   }
        //   if (err.phone) {
        //     errArray.push({ phone: err.phone });
        //   }
        //   if (err.sex) {
        //     errArray.push({ sex: err.sex });
        //   }
        //   if (err.email) {
        //     errArray.push({ email: err.email });
        //   }
        //   if (err.telephone) {
        //     errArray.push({ telephone: err.telephone });
        //   }
        //   if (err.day) {
        //     errArray.push({ day: err.day });
        //   }
        //   if (err.month) {
        //     errArray.push({ month: err.month });
        //   }
        //   if (err.year) {
        //     errArray.push({ year: err.year });
        //   }
        //   if (err.occupation) {
        //     errArray.push({ occupation: err.occupation });
        //   }
        //   if (err.nationality) {
        //     errArray.push({ nationality: err.nationality });
        //   }
        //   if (err.idType) {
        //     errArray.push({ idType: err.idType });
        //   }
        //   if (err.idNo) {
        //     errArray.push({ idNo: err.idNo });
        //   }
        //   if (err.refNo) {
        //     errArray.push({ refNo: err.refNo });
        //   }
        //   if (err.residence) {
        //     errArray.push({ residence: err.residence });
        //   }
        //   if (err.town) {
        //     errArray.push({ town: err.town });
        //   }
        //   if (err.postalAddress) {
        //     errArray.push({ postalAddress: err.postalAddress });
        //   }
        //   if (err.streetRoad) {
        //     errArray.push({ streetRoad: err.streetRoad });
        //   }
        //   if (err.loc) {
        //     errArray.push({ loc: err.loc });
        //   }
        //   if (err.emergRelation) {
        //     errArray.push({ emergRelation: err.emergRelation });
        //   }
        //   if (err.emergName) {
        //     errArray.push({ emergName: err.nationality });
        //   }
        //   if (err.emergContacts) {
        //     errArray.push({ emergContacts: err.emergContacts });
        //   }

        // new Noty({
        //   text: this.state.errors,
        //   layout: "topCenter",
        //   theme: "metroui",
        //   type: "error"
        //   // timeout: 2000
        // }).show();
      });
  });
};

export const updatePatient = (formData, id) => dispatch => {
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

export const destroyPatient = Ids => dispatch => {
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

export const fetchPatientCharts = () => dispatch => {
  return new Promise(resolve => {
    baseurl.get("/api/customize_settings").then(res => {
      dispatch({
        type: actionTypes.FETCH_CUSTOMIZE,
        payload: res.data
      });
      resolve();
    });
  });
};

export const findPatientCharts = Id => dispatch => {
  return new Promise(resolve => {
    baseurl.get(`/api/customize_settings/${Id}`).then(res => {
      dispatch({
        type: actionTypes.FIND_CUSTOMIZE,
        payload: res.data
      });
      resolve();
    });
  });
};

export const setCustomizeChange = data => dispatch => {
  return new Promise(resolve => {
    baseurl.post("api/customize_settings", data).then(res => {
      dispatch({
        type: actionTypes.FIND_CUSTOMIZE,
        payload: res.data
      });
      resolve();
    });
  });
};
