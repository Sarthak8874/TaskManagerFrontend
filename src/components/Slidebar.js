import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

function Slidebar(props) {
  const {login} = useContext(LoginContext)
  let EventLinks = [
    { Event: "Home", Link: "/", icons: "", login: true },
    { Event: "ViewTask", Link: "/task", icons: "", login: login },
    { Event: "DeleteTask", Link: "/delete-task", icons: "", login: login },
    { Event: "Profile", Link: "/profile", icons: "", login: login },
  ];
  EventLinks = EventLinks.filter((e) => e.login);
    return (
      <>
        <div
          style={{ borderTop: "1px solid gray"}}
          className={
            !props.nav
              ? "flex fixed top-12 z-10 h-[93.3%] w-full pt-10 pl-10 pr-10 pb-2 bg-black transition-all duration-500 ease-in md:hidden"
              : "flex fixed left-[-100%] w-0"
          }
        >
          <ul className="w-full text-2xl text-white">
            {EventLinks.map((EventLinks) => (
              <Link to={EventLinks.Link} className="">
                <li style={{ borderBottom: "1px solid gray" }} className="h-10">{EventLinks.Event}</li>
              </Link>
            ))}
          </ul>
        </div>
      </>
    );
  }
  
  export default Slidebar;
  