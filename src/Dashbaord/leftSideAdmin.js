import React from "react";
import Option from "./Option";
import "./dashboard.css";
import { Link } from "react-router-dom";

const leftSideAdmin = () => {
  return (
    <div style={{textAlign: "center"}}>
      <ul className="mt-5">
        <li>
          <Link to="/admin">
            <Option Value="نوبت های فعال" Option="today" />
          </Link>
        </li>
        <li style={{ textDecoration: "none" }}>
          <Link to="/admin/perosnaldetails">
            <Option Value="اطلاعات شخصی" />
          </Link>
        </li>

        <li style={{ textDecoration: "none" }}>
          <Link to="/admin/previous-appointments">
            <Option Value="نوبت های قبلی" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default leftSideAdmin;
