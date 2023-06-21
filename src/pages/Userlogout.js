import React, { useContext, useEffect,useState } from "react";
import { LoginContext } from "../context/LoginContext";
import LoadingBar from "react-top-loading-bar";

import axios from "axios";

function Userlogout() {
  const [progress, setProgress] = useState(0);
  const { updatelogin, user, updateuser } = useContext(LoginContext);
  
  useEffect(() => {
    setProgress(40)
    axios
      .post("https://taskmanagerapp-xlfw.onrender.com/users/logout", {
        token: user.token,
      })
      .then((res) => {
        updatelogin(false);
        updateuser({});
        localStorage.clear()
        setProgress(100)
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (<>
     <LoadingBar
        color="#00BFFF"
        progress={progress}
        height={4}
        onLoaderFinished={() => setProgress(0)}
      />

  </>)
}

export default Userlogout;
