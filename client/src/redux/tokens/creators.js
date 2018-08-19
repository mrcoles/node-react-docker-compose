import ApiClient from '../../apiClient';
import {FETCH_TOKEN_STATISTIC_ERROR, FETCH_TOKEN_STATISTIC_REQUEST, FETCH_TOKEN_STATISTIC_SUCCESS} from "./action";


const fetchTokenStatisticsRequest = (token) => {
  return {
    type: FETCH_TOKEN_STATISTIC_REQUEST,
    payload: {token}
  }
};

const fetchTokenStatisticsSuccess = (token, data) => {
  return {
    type: FETCH_TOKEN_STATISTIC_SUCCESS,
    payload: {token, data}
  }
};


const fetchTokenStatisticsError = (token, error) => {
  return {
    type: FETCH_TOKEN_STATISTIC_ERROR,
    payload: {token, error}
  }
};



export const fetchTokenStatistics = (token) => {
  return (dispatch) => {
    dispatch(fetchTokenStatisticsRequest());
    new ApiClient().fetchTokenStatistics(token).then(
      (data) => {
        dispatch(fetchTokenStatisticsSuccess(token, data));
      },
      (error) => {
        dispatch(fetchTokenStatisticsError(token, error));
      }
    )
  }
};
