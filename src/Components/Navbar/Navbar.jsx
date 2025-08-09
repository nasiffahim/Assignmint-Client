import React, { use } from "react";
import Logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";

export default function Navbar() {
  const { user, logOut } = use(AuthContext);

  const Links = (
    <>
      <NavLink to="/">
        <li className="mr-10 text-black font-sevillana">Home</li>
      </NavLink>
      <NavLink to="/assignments">
        <li className="mr-10 font-sevillana text-yellow-600">Assignments</li>
      </NavLink>

      {user && user.email ? (
        <NavLink to="/pending-assignments">
          <li className="mr-10 text-black font-sevillana">Pending Assignments</li>
        </NavLink>
      ) : (
        ""
      )}
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logout Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-gray-400/60 backdrop-blur-md sticky top-0 z-50">
      <div className="w-11/12 mx-auto navbar p-0">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {Links}
            </ul>
          </div>
          <Link className="flex items-center cursor-pointer" to="/">
            <div className="h-12 w-12">
              <img
                src={Logo}
                alt=""
                className="filter brightness-0 saturate-0"
              />
            </div>
            <h1 className="text-xl font-bold font-sevillana"><span className="text-[#1B0C4D]">Assign</span><span className="text-yellow-600">Mint</span></h1>
          </Link>
        </div>
        <div className="navbar-end items-center space-x-2">
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{Links}</ul>
          </div>
          <div>
            {user ? (
              <div className="flex justify-center items-center gap-6">
                <div className="dropdown dropdown-hover">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-16 h-10 rounded-full overflow-hidden">
                      <img
                        alt=""
                        src={user ? user.photoURL : ""}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  <ul
                    tabIndex={0}
                    className="dropdown-content bg-base-100 rounded-box mt-3 p-4 shadow text-left left-1/2 transform -translate-x-1/2 min-w-max"
                  >
                    <li className="whitespace-nowrap">
                      <Link
                        to="/create-assignment"
                        className="block px-4 py-2 rounded-box hover:bg-gray-200 transition-colors duration-200 font-sevillana"
                      >
                        Create Assignment
                      </Link>
                    </li>
                    <li className="whitespace-nowrap">
                      <Link
                        to="/my-assignments"
                        className="block px-4 py-2 rounded-box hover:bg-gray-200 transition-colors duration-200 font-sevillana"
                      >
                        Attempted Assignments
                      </Link>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={handleLogOut}
                  className="btn text-white bg-[#1B0C4D] rounded font-sevillana"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                {" "}
                <Link to="/register" className="cursor-pointer font-sevillana underline">
                  Register
                </Link>
                <Link
                  to="/login"
                  className="btn bg-[#1B0C4D] border-white text-white rounded font-sevillana"
                >
                  Log In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
