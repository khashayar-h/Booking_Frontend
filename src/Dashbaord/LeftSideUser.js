import React, { useState } from "react";
import Option from "./Option";
import "./dashboard.css";
import { Link ,useHistory ,useLocation  } from "react-router-dom";

const LeftSideUser = () => {
const location = useLocation()
const [mood, setMood] = useState(location.pathname );



  const tabArray = [
    {
      id: 1,
      link: "/user",
      desc: "اطلاعات شخصی",
    },
    {
      id: 2,
      link: "/user/searchadmin",
      desc: "جستجوی تعمیرکار",
    },
    {
      id: 3,
      link: "/user/appointment-status",
      desc: "نوبت های فعال",
    },

    {
      id: 4,
      link: "/user/previousappointments",
      desc: "نوبت های قبلی",
    },
  ];
  return (
    <div style={{ textAlign: "center" }}>
      <ul>
        {tabArray.map((i, index) => {
          return (
            <li
              className={mood == i.link ? "active" : ""}
              key={index}
              onClick={setMood.bind(null, i.link)}
            >
              <Link to={i.link}>
                <Option Value={i.desc} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LeftSideUser;
