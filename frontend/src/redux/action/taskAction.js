import axios from "axios";
import { toast } from "react-toastify";
import {
  ADD_TASK,
  ADD_TASK_FAILURE,
  ADD_TASK_SUCCESS,
  GET_TASK,
  GET_TASK_FAILURE,
  GET_TASK_SUCCESS,
  REMOVE_TASK,
  UPDATE_TASK,
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
      alert("task added successfully");
    }
  } catch (error) {
    dispatch({
      type: ADD_TASK_FAILURE,
    });
    toast.error("An error occurred!");
  }
};
export const getTask = () => async (dispatch) => {
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

export const updateTask = (updatedTaskData) => async (dispatch) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/tasks/${updatedTaskData._id}`,
      updatedTaskData
    );

    dispatch({ type: UPDATE_TASK, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_TASK_FAILURE });
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/tasks/${taskId}`);
    dispatch({ type: REMOVE_TASK, payload: taskId });
    alert("Task deleted Successfully");
  } catch (error) {
    dispatch({ type: GET_TASK_FAILURE });
  }
};
