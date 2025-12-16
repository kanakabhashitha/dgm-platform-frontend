import axios from "axios";
import { apiCallBegan } from "../api";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiCallBegan.type) return next(action);

    const { url, method, data, headers, onStart, onSuccess, onError } =
      action.payload;

    if (onStart) dispatch({ type: onStart });

    try {
      const response = await axios.request({
        baseURL: "http://localhost:5000/api/v1",
        url,
        method,
        data,
        withCredentials: true,
        headers,
      });

      dispatch({
        type: onSuccess,
        payload: response.data,
      });
    } catch (error) {
      if (onError)
        dispatch({
          type: onError,
          payload: { error: error?.response?.data || error.message },
        });

      dispatch({
        type: "SHOW_ERROR",
        payload: { error: error?.response?.data || error.message },
      });
    }
  };

export default api;
