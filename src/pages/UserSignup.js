import axios from "axios";
import React, { useState,useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

function UserSignup() {
  const [name, setName] = useState("");
  const {updatelogin,updateuser} = useContext(LoginContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormessage, setErrormessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) {
      navigate("/task");
    }
  }, [redirect,navigate]);

  const handlechangename = (event) => {
    setName(event.target.value);
  };
  const handlechangeemail = (event) => {
    setEmail(event.target.value);
  };
  const handlechangepassword = (event) => {
    setPassword(event.target.value);
  };
  const handlesignup = (e) => {
    e.preventDefault();
    axios
      .post("https://taskmanagerapp-xlfw.onrender.com/users", {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        updateuser(res.data)
        updatelogin(true)
        setEmail("");
        setPassword("");
        setName("");
        setErrormessage("");
        setRedirect(true);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          // Handle 400 Bad Request
          if (error.response.data.keyPattern) {
            setErrormessage("Already Have a exist Email");
            console.log(error.response.data);
          } else {
            setErrormessage(error.response.data.message);
            console.log(error.response.data);
          }
        } else {
          setErrormessage(error.message);
          console.log(error.message);
        }
      });
  };
 
  return (
    <>
      <div className="bg-white  flex relative top-10 max-w-500 m-auto items-center justify-center">
        <form
          className="bg-white p-6 rounded-lg shadow-md w-full"
          onSubmit={handlesignup}
        >
          {errormessage ? (
            <>
              {" "}
              <div className="mb-3 text-red-500">
                <h1>{errormessage}</h1>
              </div>
            </>
          ) : (
            ""
          )}

          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="border border-gray-400 p-2 rounded-lg w-full"
              type="text"
              value={name}
              onChange={handlechangename}
              id="name"
              name="name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="border border-gray-400 p-2 rounded-lg w-full"
              type="email"
              value={email}
              onChange={handlechangeemail}
              id="email"
              name="email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border border-gray-400 p-2 rounded-lg w-full"
              type="password"
              value={password}
              onChange={handlechangepassword}
              id="password"
              name="password"
              required
            />
            {password.length > 0 && password.length < 8 && (
              <p className="text-red-500 text-sm mt-1">
                Password must be at least 8 characters long, minLowercase: 1,
                minUppercase: 1, minNumbers: 1, minSymbols: 1
              </p>
            )}
          </div>

          <div className="mb-3">
            <Link to="/login">Already have a account.</Link>
          </div>
          <button className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-700">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}

export default UserSignup;
