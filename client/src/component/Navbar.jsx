import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authReducer";
import { Link } from "react-router-dom";

function Navbar() {
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link to="/dashboard" className="btn btn-ghost text-xl">
            TaskFlow Mini
          </Link>
        </div>
        <div className="flex-none">
          {authUser ? (
            <div className="flex items-center gap-4">
              <span>Welcome, {authUser.email}</span>
              <button onClick={handleLogout} className="btn btn-outline">
                Logout
              </button>
            </div>
          ) : (
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
