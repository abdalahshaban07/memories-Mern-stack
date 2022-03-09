import { LIGHT, DARK } from "../constants/actionTypes";

const initialState =
  JSON.parse(localStorage.getItem("theme")) ||
  localStorage.setItem("theme", JSON.stringify(LIGHT)) ||
  LIGHT;

const themeReducer = (state = initialState, { type, data }) => {
  switch (type) {
    case LIGHT:
      localStorage.setItem("theme", JSON.stringify(LIGHT));
      return LIGHT;
    case DARK:
      localStorage.setItem("theme", JSON.stringify(DARK));
      return DARK;
    default:
      return state;
  }
};

export default themeReducer;
