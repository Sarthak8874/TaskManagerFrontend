import React, { useContext, useEffect } from "react";
import { LoginContext } from "../context/LoginContext";
import axios from "axios";

function Userlogout() {
  const { updatelogin, user, updateuser } = useContext(LoginContext);
  useEffect(() => {
    axios
      .post("https://taskmanagerapp-xlfw.onrender.com/users/logout", {
        token: user.token,
      })
      .then((res) => {
        updatelogin(false);
        updateuser({});
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return <>Logout</>;
}

export default Userlogout;
