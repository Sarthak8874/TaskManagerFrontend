import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/LoginContext";
import axios from "axios";
import { Link } from "react-router-dom";
function Task() {
  const [task, setTask] = useState([]);
  const { login, user } = useContext(LoginContext);

  useEffect(() => {
    console.log(login, user.token);
    console.log(user.token);
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
  }, [user.token, login]);

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="max-w-3xl mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Task List</h2>
            <Link
              to="/create-task"
              className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-700"
            >
              Create Task
            </Link>
          </div>
          <table className="m-5 table-auto overflow-x-auto w-980">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">Serial No</th>
                <th className="py-2 px-4 border">Description</th>
                <th className="py-2 px-4 border">Status</th>
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
                    }`}
                  >
                    {task.completed ? "Complete" : "Incomplete"}
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
