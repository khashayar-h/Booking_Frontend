import React, { useContext, useEffect } from "react";
import Navbar from "../Basic/Navbar";
import { useState } from "react";
import { AuthContext } from "../Auth/AuthContext";
import ErrorAuth from "../Pages/ErrorAuth";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Record_appointment from "./Record_appointment";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { confirm, confirmAlert } from "../Alert/Confirmation";
import Loading from "../Pages/Loading";

import "react-multi-date-picker/styles/colors/yellow.css";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "../Dashbaord/dashboard.css";
import "../User/style/userDashboard.scss";
import Edit_appointment from "./Edit_appointment";
var DateObject = require("date-object");

const Appointment_repair = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { statusLogin, setModal, modal } = useContext(AuthContext);
  const [mood, setMood] = useState(0);
  const [editeOrRecord, setEditeOrRecord] = useState(0);
  const history = useHistory();
  const [date, setDate] = useState(new DateObject());
  const [appointments_repair, setAppointments_repair] = useState({
    date: "",
    slots: [],
    __v: "",
    _id: "",
  });
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const current = new Date().toLocaleDateString('fa-IR-u-nu-latn', options);
  let currentDecoded = current.split('/');
  console.log(current)

  const [dateToday, setdateToday] = useState({
    days: currentDecoded[2],
    months: currentDecoded[1],
    years: currentDecoded[0],
  });
  const location = useLocation();
  const { props } = location.state;
  var pervious = new Date();
  pervious.setDate(pervious.getDate() - 1);

  const onChange = (date) => {
    dateToday.days = date.day;
    dateToday.months = date.month.number;
    dateToday.years = date.year;
    setMood(!mood);
  };

  const fetchAppointment_repair = async () => {
    setIsLoading(true);
    var token = localStorage.getItem("token");
    var decoded = jwt_decode(token);

    const { data } = await Axios.post(
      `https://booking.iran.liara.run/appointments/get-free-slots`,
      {
        adminId: decoded._id,
        date: `${dateToday.days}-${dateToday.months}-${dateToday.years}`,
      }
    );

    appointments_repair.date = data.date;
    appointments_repair._id = data._id;
    appointments_repair.slots = data.slots;
    appointments_repair._id = data._id;
    appointments_repair.__v = data.__v;
    setIsLoading(false);
  };

  const DeleteAppointment_repair = async (id) => {
    let answer = await confirm("ایا شما مطمئین هستین ؟");
    if (answer) {
      const { data } = await Axios.post(
        `https://booking.iran.liara.run/appointments/delete-appointment-time`,
        {
          appointmentId: props._id,
        }
      );
      await fetchAppointment_repair();
      await confirmAlert(`${data.message}`);
    }
  };

  useEffect(async () => {
    await fetchAppointment_repair();
  }, [dateToday.days]);

  if (statusLogin == 200)
    return (
      <div className="">
        <Navbar />
        <div>
          {editeOrRecord == 2 ? (
            <Record_appointment state={props} />
          ) : editeOrRecord == 1 ? (
            <Edit_appointment state={props} />
          ) : editeOrRecord == 3 ? (
            ""
          ) : (
            ""
          )}

          <div
            className="main_user row mx-5 my-2"
            style={{ maxWidth: "100%", height: "80vh" }}
          >
            <div className=" left  p-2 w-60 mx-auto" style={{ width: "85% " }}>
              <div className="top_main">
                <p>صفحه نوبت های تعمیر</p>
                <button
                  className="button py-1 px-2 rounded"
                  onClick={() => history.push("/admin")}
                >
                  بازگشت به صفحه قبل
                </button>
              </div>
              <div className="d-flex mt-4  justify-content-between mb-4  align-items-center position-reletive">
                <h5 className="bold">
                  نوبت های گرفته شده در تاریخ:{" "}
                  <span className="titr">
                    {`${dateToday.days}-${dateToday.months}-${dateToday.years}`}{" "}
                  </span>
                </h5>
                <button
                  className="button px-2 py-1 "
                  onClick={() => setMood(!mood)}
                >
                  تغییر تاریخ
                </button>
                <button
                  className="button px-2 py-1 "
                  onClick={() => {
                    setModal(true);
                    setEditeOrRecord(2);
                  }}
                >
                  افزودن نوبت تعمیر برای{" "}
                  <span className="text-dark bold">
                    {props.carModel}
                  </span>
                </button>
                <Link
                  to={{
                    pathname: "/admin/appointments-repair/Repair_history",
                    state: { props: props },
                  }}
                  className="navbar-brand"
                >
                  <button className="button px-2 py-1 " style={{"fontSize": "initial"}}>
                    سوابق تعمیر{" "}
                    <span className="text-dark bold">
                      {props.carModel }
                    </span>
                  </button>{" "}
                </Link>

                {mood === true ? (
                  <div
                    className="position-absolute "
                    style={{ zIndex: "1000", left: "36.4rem", top: "13.4rem" }}
                  >
                    <Calendar
                      className="yellow bg-dark"
                      calendar={persian}
                      locale={persian_fa}
                      tileDisabled={({ date }) =>
                        date.getDay() === 0 || date < pervious
                      }
                      onChange={onChange}
                      value={date}
                      minDate="1401/00/00"
                      maxDate="1402/01/20"
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>

              {isLoading ? (
                <Loading />
              ) : appointments_repair != undefined ? (
                <table className="tableReformed col-12 table table-hover table-dark">
                  <thead>
                    <tr>
                      <th scope="col" className="text-center">
                        نام مشتری
                      </th>
                      <th scope="col" className="text-center">
                        ساعت تعمیر
                      </th>
                      <th scope="col" className="text-center">
                        هزینه تخمینی
                      </th>
                      <th scope="col" className="text-center">
                        حذف
                      </th>
                      <th scope="col" className="text-center">
                        ویرایش
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments_repair.slots.map((i, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row" className="text-center">
                            {i.customerName}
                          </th>
                          <th scope="row" className="text-center">
                            {" "}
                            {i.time.endTime}
                            {" - "}
                            {i.time.startTime}
                          </th>
                          <th scope="row" className="text-center">
                            {i.estimatedPrice}
                          </th>
                          <th scope="row" className="text-center">
                            <button
                              className="border-0 rounded bg-danger text-light py-1 px-2"
                              onClick={async () =>
                                await DeleteAppointment_repair(
                                  appointments_repair._id
                                )
                              }
                            >
                              حذف
                            </button>
                          </th>
                          <th scope="row" className="text-center">
                            <button
                              className="bg-warning border-0 rounded text-light py-1 px-2"
                              onClick={() => {
                                setEditeOrRecord(1);
                                setModal(true);
                              }}
                            >
                              ویرایش
                            </button>
                          </th>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    );
  else return <ErrorAuth />;
};
export default Appointment_repair;
