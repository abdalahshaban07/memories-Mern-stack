import { AUTH, LOGOUT } from "../constants/actionTypes";

const initialState = {
  authData: null,
};

const authReducer = (state = initialState, { type, data }) => {
  switch (type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify(data));
      return { ...state, authData: data };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
