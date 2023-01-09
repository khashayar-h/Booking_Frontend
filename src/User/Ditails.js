import React, { useState, useContext } from "react";
import Navbar from "../Basic/Navbar";
import "react-calendar/dist/Calendar.css";
import { Link } from "react-router-dom";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { AuthContext } from "../Auth/AuthContext";
import ErrorAuth from "../Pages/ErrorAuth";

var DateObject = require("date-object");

const Selectdate = (props) => {
  const { statusLogin } = useContext(AuthContext);
  const [date, setDate] = useState(new DateObject());
  const onChange = (date) => {
    setDate(date);
  };
  var pervious = new Date();
  pervious.setDate(pervious.getDate() - 1);
  if (statusLogin == 200)
    return (
      <div className="bg-light" style={{ height: "100vh" }}>
        <Navbar />
        <div>
          <div
            className="row m-5 d-flex justify-content-center"
            style={{ maxWidth: "100%" }}
          >
            <div
              className="col-8 col-md-8 p-4 rounded "
              style={{
                border: "3px solid gray ",
                height: "70vh",
                backgroundColor: "#fae6b1",
              }}
            >
              <div className="d-flex justify-content-center">
                <div>
                  <Calendar
                    className="yellow bg-dark"
                    calendar={persian}
                    locale={persian_fa}
                    tileDisabled={({ date }) =>
                      date.getDay() === 0 || date < pervious
                    }
                    onChange={onChange}
                    value={date}
                  />
                  {console.log(date.format())}
                </div>
              </div>

              <div className="row justify-content-center mt-5 text-center">
                <div className="col-4">
                  <Link to="/user/searchadmin">
                    <button className="button px-4 py-1">بازگشت</button>
                  </Link>
                </div>

                <div className="col-4">
                  <Link
                    to={{
                      pathname: "/user/book-slot",
                      state: {
                        date: date.format(),
                        admin: props.location.admin.admin,
                      },
                    }}
                  >
                    <button className="button px-4 py-1">انتخاب</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  else return <ErrorAuth />;
};

export default Selectdate;
