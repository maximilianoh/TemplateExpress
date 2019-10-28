import { REQUEST_DATA, RECEIVE_DATA } from '../actions/constants/commentsPost';

const posts = (state = { isFetching: false, items: [] }, action) => {
  switch (action.type) {
    case REQUEST_DATA:
      return { ...state, isFetching: true };
    case RECEIVE_DATA:
      return {
        ...state,
        isFetching: false,
        items: action.posts,
        lastUpdated: action.receivedAt,
      };
    default:
      return state;
  }
};

const postsReducer = (state = { }, action) => {
  switch (action.type) {
    case RECEIVE_DATA:
    case REQUEST_DATA:
      return { ...state, [action.data]: posts(state[action.data], action) };
    default:
      return state;
  }
};
export default postsReducer;
