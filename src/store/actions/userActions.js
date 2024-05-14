import { IS_USER_AUTHENTICATED } from "../constants";

export const setIsUserAuthenticated = (isUserAuthenticated) => {
  return {
    type: IS_USER_AUTHENTICATED,
    payload: isUserAuthenticated,
  };
};
