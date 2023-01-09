import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../image/navbaricon1.png";
import { AuthContext } from "../Auth/AuthContext";
import "./navbar.scss";

const Navbar = () => {
  const { token, setToken } = useContext(AuthContext);
  const history = useHistory();

  function signOut() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("statusLogin");
    console.log("Signed out successfully!");
    setToken(null);
    history.push("/");
  }

  return (
    <nav
      className="navbar navbar-dark navbar-expand-lg pl-4 pr-4 w-100 pt-0 pb-0"
    >
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse " id="collapsibleNavbar">
        <img
          src={logo}
          alt=""
          width="30"
          height="24"
          className="d-inline-block align-top mr-2 mt-1 ml-2"
        ></img>
        <ul className="navbar-nav ml-auto text-light ul_item ">
          <li
            className="navbar-item flex_column_center li_itam  mt-2"
            style={{ textAlign: "right" }}
          >
            خانه
          </li>
          <li
            className="navbar-item  flex_column_center  li_itam mt-2"
            style={{ textAlign: "right" }}
          >
            درباره ما
          </li>
          <li
            className="navbar-item flex_column_center li_itam  mt-2"
            style={{ textAlign: "right" }}
          >
            خدمات ما
          </li>
     
        </ul>
        <Link to="/" className="navbar-brand">
          سیستم مدیریت نوبت تعمیرگاه
        </Link>
        <ul className="navbar-nav mr-auto text-light ">
          <li className="navbar-item" style={{ textAlign: "right" }}>
            <link to="/" className="nav-link " style={{ padding: 0 }} />
            {!token && (
              <div>
                <button
                  onClick={() => history.push("/userlogin")}
                  className="button btn btn-outline-primary"
                >
                  ورود کاربر
                </button>
                <button
                  style={{ marginRight: "20px" }}
                  onClick={() => history.push("/adminlogin")}
                  className="button btn "
                >
                  ورود تعمیرکار
                </button>
              </div>
            )}
            {token && (
              <button
                type="button"
                className="btn button"
                onClick={signOut}
              >
                خروج
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
