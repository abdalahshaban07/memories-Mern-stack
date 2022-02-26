import {
  CREATE,
  DELETE,
  FETCH_ALL,
  LIKE,
  UPDATE,
  SEAECH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
} from "../constants/actionTypes";

const initialState = {
  posts: [],
  isLoading: true,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        posts: payload.data,
        currentPage: payload.currentPage,
        numPages: payload.numPages,
      };
    case SEAECH:
      return { ...state, posts: payload };
    case CREATE:
      return { ...state, posts: [...state.posts, payload] };
    case UPDATE:
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload._id ? payload : post
        ),
      };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
      };
    case FETCH_POST:
      return { ...state, post: payload };

    default:
      return state;
  }
};
