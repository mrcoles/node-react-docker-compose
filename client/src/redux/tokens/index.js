import {FETCH_TOKEN_STATISTIC_REQUEST} from "./action";

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_TOKEN_STATISTIC_REQUEST:
      return state;
    default:
      return state;
  }
}
