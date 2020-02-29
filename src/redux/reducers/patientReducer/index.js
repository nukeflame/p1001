import * as actionTypes from "../../actions/types";

const initState = {
  data: [],
  saveProcessing: false,
  patientErrors: {
    surname: [],
    othernames: [],
    phone: [],
    telephone: [],
    nationality: [],
    email: [],
    idType: [],
    days: [],
    month: [],
    years: [],
    occupation: [],
    idNo: [],
    refNo: [],
    residence: [],
    town: [],
    postalAddress: [],
    emergRelation: [],
    emergName: [],
    emergContacts: [],
    postalCode: [],
    streetRoad: [],
    loc: []
  },
  patientCharts: [],
  userChartPerms: []
};

export default function(state = initState, action) {
  switch (action.type) {
    case actionTypes.FETCH_PATIENTS:
      return {
        ...state,
        data: action.payload
      };

    case actionTypes.NEW_PATIENT:
      return {
        ...state,
        data: [action.payload, ...state.data]
      };

    // return Object.assign({}, state, {
    //   data: [action.payload, ...state.patients]
    // });

    case actionTypes.DEL_PATIENT:
      return {
        ...state,
        data: state.data.filter(p => p.id !== action.payload.id)
      };

    case actionTypes.DEL_PATIENTS:
      return {
        ...state
        // data: state.data.filter(p => {
        //   for (let i = 0; i < action.payload.length; i++) {
        //     const el = action.payload[i];
        //     return p.id !== el.id;
        //   }
        // })

        // data: state.data.filter((p) => {
        //   // for (let i = 0; i < action.payload.length; i++) {
        //   //   const e = action.payload[i];
        //   //   return p.id !== e.id;
        //   // }
        //   // return true;
        // })
      };

    case actionTypes.PATIENT_ERRORS:
      const p = action.payload;
      console.log(p);

      return {
        ...state,
        patientErrors: {
          surname: p.surname,
          othernames: p.othernames,
          phone: p.phone,
          sex: p.sex,
          days: p.days,
          month: p.month,
          years: p.years
        }
      };

    case actionTypes.CLEAR_PATIENT_ERRORS:
      return {
        ...state,
        patientErrors: {
          surname: [],
          othernames: [],
          phone: [],
          telephone: [],
          nationality: [],
          email: [],
          idType: [],
          days: [],
          month: [],
          years: [],
          occupation: [],
          idNo: [],
          refNo: [],
          residence: [],
          town: [],
          postalAddress: [],
          emergRelation: [],
          emergName: [],
          emergContacts: [],
          postalCode: [],
          streetRoad: [],
          loc: []
        }
      };

    case actionTypes.FETCH_CUSTOMIZE:
      return {
        ...state,
        patientCharts: action.payload
      };

    case actionTypes.FIND_CUSTOMIZE:
      return {
        ...state,
        userChartPerms: action.payload
      };

    default:
      return state;
  }
}
