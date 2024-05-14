import { IS_USER_AUTHENTICATED } from "../constants";

const initialState = {
  isAuthenticated: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_USER_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      };

    default:
      return state;
  }
};
