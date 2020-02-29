import * as actionTypes from "../types";
import baseurl from "../../../config/urls/baseurl";

const API = "api/perm-groups/";

export const fetchPermGroups = () => dispatch => {
  // dispatch({ type: actionTypes.FETCHING_GROUPS, payload: true });
  baseurl
    .get(API)
    .then(res => {
      dispatch({
        type: actionTypes.FETCH_PERM_GROUPS,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);

      // dispatch({
      //   type: actionTypes.GROUP_ERRORS,
      //   payload: { fetchErr: error }
      // });
    })
    .finally(() => {
      // dispatch({ type: actionTypes.FETCHING_GROUPS, payload: false });
    });
};

export const showPermGroup = Id => dispatch => {
  // dispatch({ type: actionTypes.FETCHING_GROUPS, payload: true });
  baseurl
    .get(API + Id)
    .then(res => {
      dispatch({
        type: actionTypes.SHOW_PERM_GROUP,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);

      // dispatch({
      //   type: actionTypes.GROUP_ERRORS,
      //   payload: { fetchErr: error }
      // });
    })
    .finally(() => {
      // dispatch({ type: actionTypes.FETCHING_GROUPS, payload: false });
    });
};

export const updatePermGroup = data => dispatch => {
  return new Promise(resolve => {
    baseurl
      .put(API + data.roleGroupId, data)
      .then(res => {
        console.log(res.data);

        // dispatch({
        //   type: actionTypes.UPDATE_GROUP,
        //   payload: res.data
        // });
        // resolve();
      })
      .catch(error => {
        console.log(error);
      });
  });
};

// export const destroyGroup = Ids => dispatch => {
//   let dataIds = [];
//   for (var i = 0; i < Ids.length; i++) {
//     dataIds.push(Ids[i].id);
//   }
//   return new Promise(resolve => {
//     baseurl.delete(API + dataIds, dataIds).then(res => {
//       for (let i = 0; i < res.data.length; i++) {
//         const el = res.data[i];
//         dispatch({
//           type: actionTypes.DEL_GROUPS,
//           payload: el
//         });
//       }
//       resolve();
//     });
//   });
// };
