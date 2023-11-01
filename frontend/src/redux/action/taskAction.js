import axios from "axios";
import { toast } from "react-toastify";
import {
  ADD_TASK,
  ADD_TASK_FAILURE,
  ADD_TASK_SUCCESS,
  GET_TASK,
  GET_TASK_FAILURE,
  GET_TASK_SUCCESS,
} from "./type";

export const addTask = (payload) => async (dispatch) => {
  dispatch({
    type: ADD_TASK,
  });
  try {
    const res = await axios.post("http://localhost:5000/tasks", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      dispatch({
        type: ADD_TASK_SUCCESS,
        payload: res.data.data,
      });
      alert("Task added Successfully");
    } else {
      // Handle other response status codes or errors here
      alert("An error occurred!");
    }
  } catch (error) {
    dispatch({
      type: ADD_TASK_FAILURE,
    });
    console.log(error);
    toast.error("An error occurred!");
  }
};
export const getTask =
  (page = 1) =>
  async (dispatch) => {
    dispatch({
      type: GET_TASK,
    });
    try {
      const res = await axios.get(`http://localhost:5000/tasks`);
      dispatch({
        type: GET_TASK_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: GET_TASK_FAILURE,
      });
    }
  };

// export const updateUser =
//   (formInput, { _id }) =>
//   async (dispatch) => {
//     dispatch({
//       type: UPDATE_USER,
//     });
//     try {
//       const res = await axios.put(`${url}/users/${_id}`, formInput, {
//         headers: { token: BASE_TOKEN },
//       });
//       if (res.status === 200) {
//         dispatch({
//           type: UPDATE_USER_SUCCESS,
//         });
//         toast.success("User update Successfully");
//       }
//     } catch (e) {
//       dispatch({
//         type: UPDATE_USER_FAILURE,
//       });
//       toast.error("Something went wrong !");
//     }
//   };
