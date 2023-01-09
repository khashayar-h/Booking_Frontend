import React, { useContext } from "react";
import Navbar from "../Basic/Navbar";
import { useState } from "react";
import { AuthContext } from "../Auth/AuthContext";
import ErrorAuth from "../Pages/ErrorAuth";
import Option from "../Dashbaord/Option";
import Error from "../Pages/Error";
import "../Dashbaord/dashboard.css";
import "../User/style/userDashboard.scss";
import TodaysSchedule from "./TodaysSchedule";
import PersonalDetails from "./PersonalDetails";
import PreviousAppointments from "./PreviousAppointments";
import Serch_users from "./Serch_users";
const AdminHome = () => {
  const { statusLogin } = useContext(AuthContext);
  const [mood, setMood] = useState(1);
  const tabArray = [
    {
      id: 1,
      link: "/admin",
      desc: "نوبت های فعال",
    },
    {
      id: 2,
      link: "/admin/perosnaldetails",
      desc: " اطلاعات شخصی",
    },
    {
      id: 3,
      link: "/admin/previous-appointments",
      desc: "نوبت های قبلی",
    },
    {
      id: 4,
      link: "/admin/previous-appointments",
      desc: "جستجوی سوابق تعمیر",
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
                <TodaysSchedule />
              ) : mood == 2 ? (
                <PersonalDetails />
              ) : mood == 3 ? (
                <PreviousAppointments />
              ) : mood == 4 ? (
                <Serch_users/>
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
export default AdminHome;
