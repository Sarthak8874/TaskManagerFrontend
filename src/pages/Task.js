import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/LoginContext";
import axios from "axios";
import { Link } from "react-router-dom";

function Task() {
  const [task, setTask] = useState([]);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const { login, user } = useContext(LoginContext);

  useEffect(() => {
     fetchTaskData()
  }, []);

  const handleEditClick = (taskId, description, status) => {
    setEditTaskId(taskId);
    setDescription(description);
    setStatus(status);
  };
  const handleSaveClick = () => {
    axios
      .patch(`https://taskmanagerapp-xlfw.onrender.com/task/${editTaskId}`, {
        token: user.token,
        description: description,
        completed: status,
      })
      .then((res) => { 
        setEditTaskId(null);
        fetchTaskData()

      })
      .catch((e) => {});
  };
  const fetchTaskData = async () => {
    axios
      .get("https://taskmanagerapp-xlfw.onrender.com/task", {
        params: { token: user.token },
      })
      .then((res) => {
        setTask(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <div className="max-w-980 px-4 mt-4 mx-auto flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Task List</h2>
        <Link
          to="/create-task"
          className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-700"
        >
          Create Task
        </Link>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-980 overflow-auto flex flex-col justify-center p-4">
          <table className="min-w-500 overflow-auto m-5 table-auto overflow-x-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">Serial No</th>
                <th className="py-2 px-4 border">Description</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Created On</th>
                <th className="py-2 px-4 border">LastUpdated On</th>
                <th className="py-2 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {task.map((task, index) => (
                <tr
                  key={task._id}
                  className={index % 2 !== 0 ? "bg-gray-50" : ""}
                >
                  <td className="py-2 px-4 border text-center">{index + 1}</td>
                  <td className="py-2 px-4 border text-center">
                    {editTaskId === task._id ? (
                      <input
                        type="text"
                        value={description}
                        onChange={(e) => {
                          // Handle input change here
                          setDescription(e.target.value);
                        }}
                        className="border p-1"
                      />
                    ) : (
                      task.description
                    )}
                  </td>
                  <td
                    className={`py-2 px-4 border text-center ${
                      task.completed
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    } ${editTaskId === task._id ? "bg-gray-100" : ""}`}
                  >
                    {editTaskId === task._id ? (
                      <select
                        value={status}
                        onChange={(e) => {
                          setStatus(e.target.value);
                        }}
                        className={`border p-1 `}
                      >
                        <option
                          value={true}
                          className="text-green-600 font-semibold"
                        >
                          Complete
                        </option>
                        <option
                          value={false}
                          className="text-red-600 font-semibold"
                        >
                          Incomplete
                        </option>
                      </select>
                    ) : task.completed ? (
                      "Complete"
                    ) : (
                      "Incomplete"
                    )}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {task.createdAt.substr(0, 10)}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {task.updatedAt.substr(0, 10)}
                  </td>
                  <td className="py-2 px-4 border">
                    {editTaskId === task._id ? (
                      <button
                        onClick={handleSaveClick}
                        className="bg-green-600 text-white py-1 px-2 rounded-lg"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleEditClick(
                            task._id,
                            task.description,
                            task.completed
                          )
                        }
                        className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-700"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Task;
