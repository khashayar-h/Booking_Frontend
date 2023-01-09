import React, { useContext } from "react";
import Navbar from "../Basic/Navbar";
import { useState } from "react";
import { AuthContext } from "../Auth/AuthContext";
import ErrorAuth from "../Pages/ErrorAuth";
import UserDashboard from "./UserDashboard";
import PerviousAppointments from "./PerviousAppointments";
import SearchAdmin from "./SearchAdmin";
import AppointmentStatus from "./AppointmentStatus";
import Option from "../Dashbaord/Option";
import Error from "../Pages/Error";

import "../Dashbaord/dashboard.css";
import "./style/userDashboard.scss";

const PersonalDetails = () => {
  const { statusLogin } = useContext(AuthContext);
  const [mood, setMood] = useState(1);
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
  if (statusLogin == 200)
    return (
      <div className="">
        <Navbar />
        <div>
          <div className="main_user row m-5" style={{ maxWidth: "100%" }}>
            <div className="right  p-4 " style={{ height: "80vh" }}>
              <div style={{ textAlign: "center" }}>
                <ul>
                  {tabArray.map((i, index) => {
                    return (
                      <li
                        className={mood == i.id ? "active" : ""}
                        key={index}
                        onClick={setMood.bind(null, i.id)}
                      >
                        <Option Value={i.desc} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div
              className=" left  p-4"
              style={{ overflowY: "auto", maxHeight: "100%" }}
            >
              {mood == 1 ? (
                <UserDashboard />
              ) : mood == 2 ? (
                <SearchAdmin />
              ) : mood == 3 ? (
                <AppointmentStatus />
              ) : mood == 4 ? (
                <PerviousAppointments />
              ) : (
                <Error />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  else return <ErrorAuth />;
};
export default PersonalDetails;
