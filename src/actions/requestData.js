import { REQUEST_DATA, RECEIVE_DATA } from './constants/commentsPost';

// Action Creators
export const requestData = (data) => ({ type: REQUEST_DATA, data });
export const receiveData = (data, json) => ({
  type: RECEIVE_DATA,
  data,
  posts: json.map((child) => child),
  receivedAt: Date.now(),
});
