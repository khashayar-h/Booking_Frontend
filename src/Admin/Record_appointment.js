import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
import ErrorAuth from "../Pages/ErrorAuth";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import { confirm, confirmAlert } from "../Alert/Confirmation";
import { Modal } from "react-bootstrap";

import "react-multi-date-picker/styles/colors/yellow.css";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";

const Record_appointment = (props) => {
  const { statusLogin, modal, setModal } = useContext(AuthContext);
  const [mood, setMood] = useState(0);
  const [date, setDate] = useState({ days: "", months: "", years: "" });
  const [DateTime, setDateTime] = useState({ start: "", end: "", price: "" });

  var pervious = new Date();
  pervious.setDate(pervious.getDate() - 1);
  const onChange = (d) => {
    date.days = d.day;
    date.months = d.month.number;
    date.years = d.year;
    setMood(!mood);
    console.log(date.days);
  };
  function setTimeStart(event) {
    DateTime.start = event.target.value;
  }
  function setTimeEnd(event) {
    DateTime.end = event.target.value;
  }
  function setPrice(event) {
    DateTime.price = event.target.value;
  }

  const setAppointment_repair = async () => {
    let answer = await confirm("ایا شما مطمئین هستین ؟");
    if (answer) {
      var token = localStorage.getItem("token");
      var decoded = jwt_decode(token);
      await Axios.post(
        `https://booking.iran.liara.run/appointments/get-free-slots`,
        {
          adminId: decoded._id,
          date: `${date.days}-${date.months}-${date.years}`,
        }
      );
      const { data } = await Axios.post(
        `https://booking.iran.liara.run/appointments/update-book-time`,
        {
          date: `${date.days}-${date.months}-${date.years}`,
          startTime: DateTime.start,
          endTime: DateTime.end,
          appointmentId: props.state._id,
          estimatedPrice: DateTime.price,
        }
      );
      console.log(data);
      await confirmAlert(`${data.message}`);
    }
  };

  useEffect(() => {
    setModal(true);
    console.log(modal);
  }, []);

  if (statusLogin == 200) {
    return (
      <div className="static-modal ">
        <Modal className="confrim_varna" show={modal}>
          <div
            className="right  p-4 w-100 d-flex flex-column bg-dark"
            style={{ width: "35% " }}
          >
            <div>
              <button
                className="bg-danger border-0 rounded text-light py-1 px-2"
                onClick={() => setModal(false)}
              >
                خروج
              </button>
              <p className="titr text-center">ثبت نوبت</p>
            </div>
            <div className="d-flex py-2  justify-content-betwee">
              <label className="text-white w-50 text-right">برای مشتری :</label>
              <span className="text-white">{props.state.userName}</span>
            </div>
            <div className="d-flex py-2  justify-content-betwee  position-reletive">
              <label className="text-white w-50 text-right">در تاریخ :</label>
              <span id="date" className="text-white mt-2">
                {date.days ? `${date.years}-${date.months}-${date.days}` : ""}
              </span>
              <button
                className="button py-1 px-2 mr-2"
                onClick={() => setMood(!mood)}
              >
                {date.days ? " ویرایش" : " ثبت"} تاریخ
              </button>
              {mood === true ? (
                <div
                  className="position-absolute "
                  style={{ zIndex: "1000", right: "21.5rem", top: "11.7rem" }}
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
            <div className="d-flex py-2">
              <label className="text-white  w-50 text-right">
                نوبت از ساعت :
              </label>
              <input
                className="rounded"
                type="time"
                name=""
                id="startTime"
                onChange={setTimeStart}
              />
            </div>
            <div className="d-flex py-2 mb-2">
              <label className="text-white  w-50 text-right">
                نوبت تا ساعت :
              </label>
              <input
                className="rounded"
                type="time"
                name=""
                id="endTime"
                onChange={setTimeEnd}
              />
            </div>
            <div className="d-flex py-2 mb-2">
              <label className="text-white  w-50 text-right">
                هزینه تخمینی:
              </label>
              <input
                className="rounded"
                type="text"
                name=""
                id="endTime"
                onChange={setPrice}
              />
            </div>
            <button
              className="bg-warning border-0 rounded text-light py-2 px-3 w-50  m-auto"
              onClick={setAppointment_repair}
            >
              {" "}
              ثبت نوبت
            </button>
          </div>
        </Modal>
      </div>
    );
  } else return <ErrorAuth />;
};

export default Record_appointment;
