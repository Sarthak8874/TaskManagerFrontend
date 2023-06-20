import { Link } from "react-router-dom";

function Slidebar(props) {
  const EventLinks = [
    { Event: "Home", Link: "/", icons: "" },
    { Event: "About", Link: "/", icons: "" },
    { Event: "Contact us", Link: "/", icons: "" },
    { Event: "Help", Link: "/", icons: "" },
  ];
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
  