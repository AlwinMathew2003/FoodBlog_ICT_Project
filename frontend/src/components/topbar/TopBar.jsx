import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function TopBar({ posts }) {
  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };
  return (
    <div className="top">
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              <span className="menuText">HOME</span>
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/about">
              <span className="menuText">ABOUT</span>
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/contact">
              <span className="menuText">CONTACT</span>
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              <span className="menuText">WRITE</span>
            </Link>
          </li>
          {user ? (
            <li className="topListItem">
              <div className="dropdown">
                <div
                  className="dropdownButton"
                  onClick={toggleMenu}
                  onTouchStart={toggleMenu}
                >
                  {user && <span>{user.username}</span>}
                  <i className="fas fa-chevron-down"></i>
                </div>
                {showMenu && (
                  <ul className="dropdownMenu" onClick={closeMenu}>
                    <li>
                      <Link to="/settings" className="link">
                        <b className="menuItem">Profile</b>
                      </Link>
                    </li>
                    <li onClick={handleLogout}>
                      <b className="menuItem">Logout</b>
                    </li>
                  </ul>
                )}
              </div>
            </li>
          ) : null}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img className="topImg" src={PF + user.profilePic} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                <b> LOGIN</b>
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                <b> REGISTER</b>
              </Link>
            </li>
          </ul>
        )}
        <div className="searchIconWrapper">
          <input
            type="text"
            className="topSearchInput"
            placeholder="Search..."
          />
          <i className="topSearchIcon fas fa-search"></i>
        </div>
      </div>
    </div>
  );
}
