import { combineReducers } from 'redux';
import selectedReducer from './changeDataReducers';
import postsReducer from './postsReducer';

const rootReducer = combineReducers({ postsReducer, selectedReducer });

export default rootReducer;
