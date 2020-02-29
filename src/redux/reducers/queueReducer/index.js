import * as actionTypes from "../../actions/types";

const initState = {
  data: []
};

export default function(state = initState, action) {
  switch (action.type) {
    case actionTypes.fetchQueues:
      return {
        ...state,
        data: action.payload
      };

    case actionTypes.addQueues:
      return {
        ...state,
        data: [action.payload, ...state.data]
      };

    default:
      return state;
  }
}
