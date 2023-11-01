import {
  ADD_TASK,
  ADD_TASK_FAILURE,
  ADD_TASK_SUCCESS,
  GET_TASK,
  GET_TASK_FAILURE,
  GET_TASK_SUCCESS,
  REMOVE_TASK,
  REMOVE_TASK_FAILURE,
  REMOVE_TASK_SUCCESS,
  UPDATE_TASK,
  UPDATE_TASK_FAILURE,
  UPDATE_TASK_SUCCESS,
} from "../action/type";

const initialState = {
  tasks: [],
};
const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK:
      return { ...state };
    case GET_TASK_SUCCESS:
      return { ...state, tasks: action.payload.data };
    case GET_TASK_FAILURE:
      return { ...state };
    case ADD_TASK:
      return {
        ...state,
      };
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        tasks: action.payload.data,
      };
    case ADD_TASK_FAILURE:
      return {
        ...state,
      };
    case UPDATE_TASK:
      return { ...state };
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter((item) => item._id !== action.payload),
      };
    case UPDATE_TASK_FAILURE:
      return { ...state };
    case REMOVE_TASK:
      return { ...state };
    case REMOVE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter((item) => item._id !== action.payload),
      };
    case REMOVE_TASK_FAILURE:
      return { ...state };

    default:
      return state;
  }
};

export default taskReducer;
