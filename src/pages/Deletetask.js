import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/LoginContext";
import axios from "axios";
import { Link } from "react-router-dom";

function Deletetask() {
  const [task, setTask] = useState([]);
  const { login, user } = useContext(LoginContext);

  useEffect(() => {
    axios
      .get("https://taskmanagerapp-xlfw.onrender.com/task", {
        params: { token: user.token },
      })
      .then((res) => {
        setTask(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [user.token, login, user.user]);
  const handledeleteclick = (taskid) => {
    axios
      .delete(`https://taskmanagerapp-xlfw.onrender.com/task/${taskid}`, {
        params: { token: user.token }
      })
      .then((res) => {console.log("deleted")})
      .catch((e) => {});
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
                    {task.description}
                  </td>
                  <td
                    className={`py-2 px-4 border text-center ${
                      task.completed
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    } `}
                  >
                    {task.completed ? "Complete" : "Incomplete"}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {task.createdAt.substr(0, 10)}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {task.updatedAt.substr(0, 10)}
                  </td>
                  <td className="py-2 px-4 border">
                    <button
                      className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-700"
                      onClick={() => handledeleteclick(task._id)}
                    >
                      Delete
                    </button>
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

export default Deletetask;
