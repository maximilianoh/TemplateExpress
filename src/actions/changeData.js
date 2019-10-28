import { CHANGE_SELECT, CHANGE_PAGINATION } from './constants/commentsPost';

export const changeSelect = (data) => ({ type: CHANGE_SELECT, data });
export const changePagination = (e) => ({ type: CHANGE_PAGINATION, e });
