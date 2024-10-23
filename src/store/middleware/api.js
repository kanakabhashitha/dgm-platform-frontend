import axios from "axios";
import { apiCallBegan } from "../api";

const api =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiCallBegan.type) return next(action);

    const { url, method, data, headers, onStart, onSuccess, onError } =
      action.payload;

    if (onStart) dispatch({ type: onStart });

    try {
      const state = getState();
      const token = state.auth.token;

      const config = {
        baseURL: "http://localhost:5000/api/v1",
        url,
        method,
        data,
        headers: {
          ...headers,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      };

      const response = await axios.request(config);

      dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      if (onError) {
        dispatch({ type: onError, payload: { error: error.message } });
      }
      dispatch({ type: "SHOW_ERROR", payload: { error: error.message } });
    }
  };

export default api;
