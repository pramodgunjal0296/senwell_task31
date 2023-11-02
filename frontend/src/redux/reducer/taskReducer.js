import {
  ADD_TASK,
  ADD_TASK_FAILURE,
  ADD_TASK_SUCCESS,
  GET_TASK,
  GET_TASK_FAILURE,
  GET_TASK_SUCCESS,
  REMOVE_TASK,
  UPDATE_TASK,
} from "../action/type";

const initialState = {
  tasks: [],
  isLoading: false,
  error: null,
  deletedTaskId: null,
};
const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK:
      return { ...state, isLoading: true, error: null };
    case GET_TASK_SUCCESS:
      return { ...state, tasks: action.payload, isLoading: false, error: null };
    case GET_TASK_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: "An error occurred while fetching tasks.",
      };
    case ADD_TASK:
      return {
        ...state,
      };
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
        // tasks: state.tasks.filter((item) => item._id !== action.payload),
      };
    case ADD_TASK_FAILURE:
      return {
        ...state,
      };
    case UPDATE_TASK:
      const updatedTasks = state.tasks.map((task) =>
        task._id === action.payload._id ? action.payload : task
      );
      return {
        ...state,
        tasks: updatedTasks,
      };
    case REMOVE_TASK:
      return {
        ...state,
        deletedTaskId: action.payload,

        tasks: state.tasks.filter((item) => item._id !== action.payload),
      };

    default:
      return state;
  }
};

export default taskReducer;
