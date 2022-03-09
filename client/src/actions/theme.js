import { LIGHT, DARK } from "../constants/actionTypes";

export const themeLight = () => (dispatch) => dispatch({ type: LIGHT });
export const themeDark = () => (dispatch) => dispatch({ type: DARK });
