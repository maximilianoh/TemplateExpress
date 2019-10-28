import { requestData, receiveData } from './requestData';

const fetchPosts = (data) => (dispatch) => {
  dispatch(requestData(data));
  return fetch(`${process.env.API_ENDPOINT}${data}`)
    .then((response) => response.json())
    .then((json) => dispatch(receiveData(data, json)));
};

const shouldFetchPosts = (state, data) => {
  const posts = state.postsReducer[data];
  if (!posts) return true;
  if (posts.isFetching) return false;
  return false;
};

const fetchPostsIfNeeded = (data) => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), data.name)) return dispatch(fetchPosts(data.name));
  return false;
};

export default fetchPostsIfNeeded;
