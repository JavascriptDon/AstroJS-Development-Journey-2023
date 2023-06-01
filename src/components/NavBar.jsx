import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext.js";

const NavBar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  // console.log(user);

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 z-[100] w-full absolute md:m-auto">
      <Link to="/">
        <div className="flex items-center">
          <img
            className="bg-cover w-10 h-10 mr-4 p-2 bg-white rounded-full"
            src="/movie-logo.png"
            alt="nav-logo"
          />
          <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
            Code<span className="text-white">Flix</span>
          </h1>
        </div>
      </Link>
      {user?.email ? (
        <div>
          <Link to="/account">
            <button className="text-white font-medium pr-4">Account</button>
          </Link>
          <button
            onClick={handleLogOut}
            className="bg-red-600 text-white font-semibold px-6 py-2 rounded cursor-pointer hover:bg-black"
          >
            Log Out
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="text-white font-medium pr-4">Sign In</button>
          </Link>
          <Link to="/signup">
            <button className="bg-red-600 text-white font-semibold px-6 py-2 rounded cursor-pointer hover:bg-black">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
