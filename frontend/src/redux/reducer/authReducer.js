import { LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS } from "../action/type";

const initialState = {
  login: {},
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: action.data,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default authReducer;
