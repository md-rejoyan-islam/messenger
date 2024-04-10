import { Link } from "react-router-dom";
import logo from "../../../assets/messenger.png";
import { RxCross2 } from "react-icons/rx";
import PropTypes from "prop-types";

export default function LoginHeader({ showMenu, setShowMenu }) {
  return (
    <header
      className={`${
        showMenu ? "" : "maxWidth z-10  sm:py-8 sticky top-0 w-full bg-white"
      }`}
    >
      <div className="destop flex items-center justify-between px-6">
        {/* logo  */}
        <figure className="inline-block">
          <Link to={"/"}>
            <img className=" h-10 w-10" src={logo} alt="logo" />
          </Link>
        </figure>
        {/* mobile menu  */}
        <button className="sm:hidden" onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? (
            <RxCross2 className="text-2xl flex items-center w-8 h-20 " />
          ) : (
            <svg
              className="w-8 h-20 "
              viewBox="0 0 40 23"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fillRule="evenodd">
                <g transform="translate(-299 -40)">
                  <g transform="translate(299 40)">
                    <rect y="4" width="40" height="2"></rect>
                    <rect y="14" width="40" height="2"></rect>
                  </g>
                </g>
              </g>
            </svg>
          )}
        </button>

        {/* desktop menu  */}
        <nav className="overflow-hidden hidden sm:block">
          <ul className="flex gap-4 font-semibold text-sm ">
            <li className="overflow-hidden h-[24px] hover:border-b-[3.7px] hover:border-blue-500">
              <Link to={"/"}>Features</Link>
            </li>
            <li className="hover:border-b-[3.7px] hover:border-blue-500">
              <Link to={"/"}>Desktop app</Link>
            </li>
            <li className="hover:border-b-[3.7px] hover:border-blue-500">
              <Link to={"/"}>Privacy and safety</Link>
            </li>
            <li className="hover:border-b-[3.7px] hover:border-blue-500">
              <Link to={"/"}>For developers</Link>
            </li>
          </ul>
        </nav>
      </div>
      {showMenu && (
        <div className="top-[80px] mobile z-10 absolute pb-10 bg-white min-h-[calc(100%-80px)] overflow-hidden w-full">
          <nav className=" bg-white  block sm:hidden">
            <ul className=" space-y-2 text-xl">
              <li className="bg-gray-100 py-5 px-4 text-gray-500 font-semibold ">
                <Link
                  to={"/"}
                  className=" hover:text-black overflow-hidden h-[24px] hover:border-b-[3.7px] hover:border-blue-500 pb-1"
                >
                  Features
                </Link>
              </li>
              <li className=" bg-gray-100 py-5 px-4 text-gray-500 font-semibold">
                <Link
                  to={"/"}
                  className="hover:text-black overflow-hidden h-[24px] hover:border-b-[3.7px] hover:border-blue-500 pb-1"
                >
                  Desktop app
                </Link>
              </li>
              <li className=" bg-gray-100 py-5 px-4 text-gray-500 font-semibold">
                <Link
                  to={"/"}
                  className="hover:text-black overflow-hidden h-[24px] hover:border-b-[3.7px] hover:border-blue-500 pb-1"
                >
                  Privacy and safety
                </Link>
              </li>
              <li className=" bg-gray-100 py-5 px-4 text-gray-500 font-semibold">
                <Link
                  to={"/"}
                  className="hover:text-black overflow-hidden h-[24px] hover:border-b-[3.7px] hover:border-blue-500 pb-1"
                >
                  For developers
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

LoginHeader.propTypes = {
  showMenu: PropTypes.bool,
  setShowMenu: PropTypes.func,
};
