import React, { useContext, useState } from "react";
import axios from "axios";
import { LoginContext } from "../context/LoginContext";
import { Link } from "react-router-dom";
function Createtask() {
  const [taskDescription, setTaskDescription] = useState("");
  const { user } = useContext(LoginContext);
  const handleTaskDescriptionChange = (event) => {
    setTaskDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("https://taskmanagerapp-xlfw.onrender.com/task", {
        description: taskDescription,
        token: user.token,
      })
      .then((response) => {
        setTaskDescription("");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="max-w-800 mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create a New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="taskDescription"
          >
            Task Description
          </label>
          <input
            className="border border-gray-400 p-2 rounded-lg w-full"
            type="text"
            id="taskDescription"
            name="taskDescription"
            value={taskDescription}
            onChange={handleTaskDescriptionChange}
            required
          />
        </div>
        <div className="w-full flex justify-between">
          <button
            className="bg-black text-white  py-2 px-4 rounded-lg hover:bg-gray-700"
            type="submit"
          >
            Create Task
          </button>
          <Link to='/task'
            className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-700"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Createtask;
