import axios from "axios";
import {
  // USER_LOADED,
  // USER_LOADING,
  // AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS
} from "../type";
import { returnErrors } from "../actions/error";

// export const loadUser = () => (dispatch, getState) => {
//   dispatch({ type: USER_LOADING });
//   axios.get(
//     "http://localhost:5000/signin",
//     tokenConfig(getState)
//       .then(res => {
//         dispatch({
//           type: USER_LOADED,
//           payload: res.data
//         });
//       })
//       .catch(err => {
//         dispatch(returnErrors(err.response.data, err.response.status));
//         dispatch({
//           type: AUTH_ERROR
//         });
//       })
//   );
// };

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const login = ({ email, password }) => dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  const body = JSON.stringify({ email, password });
  axios
    .post("http://localhost:5000/signin", body, config)
    .then(res => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// export const tokenConfig = getState => {
//   const token = getState.auth.token;
//   const config = {
//     headers: {
//       "Content-type": "application/json"
//     }
//   };
//   if (token) {
//     config.headers["Authorization"] = token;
//   }
//   return config;
// };
