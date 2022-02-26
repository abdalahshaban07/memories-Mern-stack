import { AUTH } from "../constants/actionTypes";
import * as api from "../api";

// Action creaters

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);
    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    console.log(error.message);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);
    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    console.log(error.message);
  }
};
