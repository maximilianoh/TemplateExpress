import { CHANGE_SELECT, CHANGE_PAGINATION } from '../actions/constants/commentsPost';

const selectedReducer = (state = { maxSize: 5, pagination: 0, name: 'users' }, action) => {
  switch (action.type) {
    case CHANGE_SELECT:
      return { ...state, name: action.data, pagination: 0 };
    case CHANGE_PAGINATION: {
      let result;
      if (action.e === 'right') result = state.pagination + state.maxSize;
      else if (action.e === 'left') result = state.pagination - state.maxSize;
      return { ...state, pagination: result };
    }
    default:
      return state;
  }
};
export default selectedReducer;
