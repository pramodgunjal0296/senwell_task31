import React, { useState, useEffect } from "react";
import "../App.css";
import { RiFileEditLine } from "react-icons/ri";
import { AiTwotoneDelete } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  getTask,
  updateTask,
  deleteTask,
} from "../redux/action/taskAction";
import { toast } from "react-toastify";

const TaskList = () => {
  const [editingTask, setEditingTask] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.taskReducer);

  useEffect(() => {
    dispatch(getTask());
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    dispatch(addTask(data));
  };

  const startEditing = (task) => {
    setEditingTask(task);
  };

  const cancelEditing = () => {
    setEditingTask(null);
  };

  const handleUpdate = (updatedData) => {
    dispatch(updateTask(updatedData)).then(() => {
      setEditingTask(null);
      alert("Task Updated Successfully");
    });
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };
  const handleLogout = () => {
    Cookies.remove("task||userInfo");
    navigate("/login");
    toast.warn("Log out Successfully");
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        title="Logout"
        className="bg-red-500 hover:bg-red-400 m-2 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
      >
        LogOut
      </button>
      <h1 className=" w-screen flex items-center justify-center text-3xl mt-2 font-bold">
        Task Manager
      </h1>

      <div className="flex items-center justify-center flex-col gap-4">
        <h2 className="bold center">Add New Task</h2>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row gap-2">
              <input
                title="Title of your task"
                type="text"
                name="title"
                className="shadow appearance-none border  border-gray-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Title"
                required
              />
              <p className="text-red-600">*</p>
            </div>
            <textarea
              title="Add Description of task"
              type="text"
              name="description"
              rows="4"
              className="block p-2.5 mb-5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Description"
            ></textarea>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              title="Add Task"
            >
              Add
            </button>
          </form>
        </div>
      </div>
      <div className="relative overflow-x-auto p-5  shadow-md sm:rounded-lg dark:bg-white flex items-center justify-center">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead>
            <tr>
              <th className="border py-2 ">Task</th>
              <th>Description</th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                {editingTask && editingTask._id === task._id ? (
                  <>
                    <td className="desc">
                      <input
                        type="text"
                        value={editingTask.title}
                        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) =>
                          setEditingTask({
                            ...editingTask,
                            title: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td className="desc">
                      <input
                        type="text"
                        value={editingTask.description}
                        className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) =>
                          setEditingTask({
                            ...editingTask,
                            description: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <button
                        className="bg-blue-500 hover:bg-blue-700   text-white font-bold py-2 px-4 mt-1 mb-1 rounded"
                        onClick={(e) => handleUpdate(editingTask)}
                        title="save your task"
                      >
                        Save
                      </button>
                    </td>
                    <td>
                      <button
                        className="bg-red-500 hover:bg-blue-700   text-white font-bold py-2 px-4 mt-1 mb-1 rounded"
                        onClick={() => cancelEditing()}
                        title="Cancle"
                      >
                        <ImCross />
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="desc">
                      <span>{task.title}</span>
                    </td>
                    <td className="desc">
                      <span>{task.description}</span>
                    </td>
                    <td className="flex items-center justify-center">
                      <button
                        className="bg-yellow-600 hover:bg-yellow-500   text-white font-bold py-2 px-4 mt-1 mb-1 rounded"
                        onClick={() => startEditing(task)}
                        title="Edit Task"
                      >
                        <RiFileEditLine />
                      </button>
                    </td>
                    <td>
                      <button
                        className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 mt-1 ml-4 rounded"
                        onClick={() => handleDelete(task._id)}
                        title="Delete Task"
                      >
                        <AiTwotoneDelete />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
