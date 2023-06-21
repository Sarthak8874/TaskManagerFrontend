import React, { useContext, useState } from "react";
import { IoMenuOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineUser } from "react-icons/ai";
import Slidebar from "./Slidebar";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

function Navbar() {
  const [nav, setNav] = useState(true);
  const { login, user } = useContext(LoginContext);
  const EventLinks = [
    { Event: "Home", Link: "/", icons: "" },
    { Event: "ViewTask", Link: "/task", icons: "" },
    { Event: "DeleteTask", Link: "/delete-task", icons: "" },
    { Event: "Profile", Link: "/profile", icons: "" },
  ];
  const handlemenuicon = () => {
    setNav(!nav);
  };
  return (
    <>
      <nav className=" bg-black">
        <div className="max-w-980 h-auto py-2 mx-auto text-white flex justify-between pr-3 pl-3">
          <div
            className="flex text-2xl items-center md:hidden transition-colors duration-1000 ease-in-out"
            onClick={handlemenuicon}
          >
            {nav ? <IoMenuOutline /> : <RxCross2 />}
          </div>
          <div className="flex items-center justify-between text-white text-lg">
           Hi<spam className='font-bold'>! {user?.user?.name ? user.user.name.split(" ")[0]:"User"}</spam>
          </div>
          <div className="hidden md:block">
            <ul className="flex h-full items-center">
              {EventLinks.map((EventLinks) => (
                <Link
                  to={EventLinks.Link}
                  className="pl-2 pr-2"
                  key={EventLinks.Event}
                >
                  <li className="">{EventLinks.Event}</li>
                </Link>
              ))}
            </ul>
          </div>
          <div className="flex max-w-10 justify-between h-full items-center">
            {" "}
            {!login ? (
              <Link to="/login">
                <button className="ml-2 mr-2 text-white text-center">
                  <AiOutlineUser className="w-full flex justify-center" />
                  Login
                </button>
              </Link>
            ) : (
              <Link to="/logout">
                <button className="ml-2 mr-2 text-white text-center">
                  <AiOutlineUser className="w-full flex justify-center" />
                   Logout
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
      <Slidebar nav={nav} />
    </>
  );
}

export default Navbar;
