const initialState = [];

import {
  CREATE,
  DELETE,
  FETCH_ALL,
  LIKE,
  UPDATE,
} from "../constants/actionTypes";

export default (posts = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ALL:
      return payload;
    case CREATE:
      return [...posts, payload];
    case UPDATE:
    case LIKE:
      return posts.map((post) => (post._id === payload._id ? payload : post));
    case DELETE:
      return posts.filter((post) => post._id !== payload);

    default:
      return posts;
  }
};
