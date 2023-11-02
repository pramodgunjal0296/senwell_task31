import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS } from "./type";

export const loginRequest = (payload) => async (dispatch) => {
  dispatch({
    type: LOGIN,
  });
  try {
    const res = await axios.post(
      `http://localhost:5000/login`,
      payload.formInput,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.token,
      });
      Cookies.set("task||userInfo", res.data.token, {
        expires: 30,
      });
      payload.callback();
      toast.success("Logged In!");
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
    });
    toast.error("An error occurred!");
  }
};
