import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import axios from "axios";
import ErrorAuth from "../Pages/ErrorAuth";
import { AuthContext } from "../Auth/AuthContext";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

const TodaysSchedule = () => {
  const { statusLogin, modal, setModal } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [mood, setMood] = useState();
  const [clickedAppointment, setClickedAppointment] = useState();

  useEffect(() => {
    const fetchAppointments = async () => {
      var token = localStorage.getItem("token");
      var decoded = jwt_decode(token);
      const { data } = await Axios.post(
        `https://booking.iran.liara.run/admins/active-appointments`,
        {
          adminId: decoded._id,
        }
      );
      setAppointments(data);
    };

    fetchAppointments();
    setModal(false);
  }, []);

  const [dropdownValue, setDropdownValue] = useState([]);
  const fetchData = async (id, val) => {
    var { data } = await axios.put(
      `https://booking.iran.liara.run/appointments/update_status`,
      {
        appointmentId: id,
        statusCode: val,
      }
    );
    window.location.reload(false);
  };
  const handleChange = (e) => {
    setDropdownValue(e.target.value);
    var splitted = e.target.value.split(",");
    console.log(splitted);
    fetchData(splitted[0], splitted[1]);
  };
  useEffect(() => {}, [dropdownValue]);

  if (statusLogin == 200)
    return (
      <table className="tableReformed col-12 table table-hover table-dark">
        <thead>
          <tr>
            <th scope="col" className="text-center">
              نام مشتری
            </th>
            <th scope="col" className="text-center">
              جزییات نوبت ها
            </th>
            <th scope="col" className="text-center">
              شرح جزییات ماشین
            </th>
            <th scope="col" className="text-center">
              وضعیت
            </th>
            <th scope="col" className="text-center">
              تغییر وضعیت
            </th>
            <th scope="col" className="text-center">
              تعیین نوبت تعمیر
            </th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <th scope="row" className="text-center">
                {appointment.userName}
              </th>
              <th scope="row" className="text-center">
                <button
                 id={"modalInfoBtn" + appointment._id}
                  className="button py-1 px-2 rounded h6"
                  onClick={() => {
                    setModal(true);
                    setMood(2);
                    setClickedAppointment(appointment);
                    console.log(clickedAppointment);
                  }}
                >
                  جزییات نوبت
                </button>
              </th>
              
              <Modal className=" " show={modal} onHide={() => setModal(false)}>
                {mood == 1 ? (
                  <div className="d-flex flex-column  align-items-start">
                    <div className="d-flex  align-items-center justify-content-center col-12 ">
                      <label htmlFor="" className="mr-4 small mt-2 ">
                        نام و مدل ماشین:
                      </label>
                      <p className=" border  rounded mt-4 py-2 w-50 text-right px-1 mr-3 h-auto">
                        {clickedAppointment.carModel}
                      </p>
                    </div>
                    <div className="d-flex  align-items-center justify-content-center col-12 ">
                      <label htmlFor="" className="mr-4 small mt-2 ">
                        شماره پلاک ماشین:
                      </label>
                      <p className=" border  rounded mt-2 py-2 w-50 text-right px-1 mr-3 h-auto">
                        {clickedAppointment.carLicensePlate}
                      </p>
                    </div>
                    <label
                      htmlFor=""
                      className=" small mt-3 "
                      style={{ marginRight: "4rem" }}
                    >
                      گزارش خرابی ماشین :
                    </label>
                    <p className=" border  rounded mb-4 py-2 w-75 text-right px-1 mx-auto h-auto">
                      {clickedAppointment.description}
                    </p>
                  </div>
                ) : mood == 2 ? (
                  <div
                    className="d-flex  w-75  mx-auto my-2 border p-2"
                    style={{ height: "10rem" }}
                  >
                    <div className=" d-flex w-50 h-100  border-left flex-column align-items-center rounded  ">
                      <p className="text_yellow">چکاپ</p>
                      <div className="d-flex mt-2">
                        <lable className="text-muted small ml-2">تاریخ:</lable>
                        <span>{clickedAppointment.date}</span>
                      </div>
                      <div className="d-flex mt-2">
                        <lable className="text-muted small ml-2">ساعت:</lable>
                        <span>{clickedAppointment.slotTime}</span>
                      </div>
                    </div>
                    <div className="  d-flex w-50 h-100   flex-column align-items-center rounded  ">
                      <p className="text_yellow">تعمیر</p>
                      <div className="d-flex mt-2">
                        <lable className="text-muted small ml-2">تاریخ:</lable>
                        <span> {clickedAppointment.repairDate}</span>
                      </div>
                      <div className="d-flex mt-2">
                        <lable className="text-muted small ml-2">ساعت:</lable>
                        <span>
                          {clickedAppointment.repairSlotTime?.startTime}
                          {" - "}
                          {clickedAppointment.repairSlotTime?.endTime}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  "error"
                )}

                <div className="d-flex  justify-content-end w-75 mx-auto ">
                  <button
                    style={{ direction: "ltr" }}
                    className="button col-2 mb-4  "
                    onClick={() => setModal(false)}
                  >
                    بستن
                  </button>
                </div>
              </Modal>
              <th scope="row" className="text-center">
                <button
                  id={"modalCarBtn" + appointment._id}
                  className="button py-1 px-2 rounded h6"
                  onClick={() => {
                    setModal(true);
                    setMood(1);
                    setClickedAppointment(appointment);
                    console.log(clickedAppointment);
                  }}
                >
                  جزییات ماشین
                </button>
              </th>
              <th scope="row" className="text-center">
                <span>{appointment.status}</span>
              </th>
              <th className="text-center">
                <select name="cars" id="cars" onChange={handleChange}>
                <option selected>-</option>
                    <option value={[appointment._id, 0]}>
                      آماده معاینه فنی
                    </option>
                    <option value={[appointment._id, 1]}>تخصیص نوبت</option>
                    <option value={[appointment._id, 2]}>در حال انجام</option>
                    <option value={[appointment._id, 3]}>تمام شده</option>
                </select>
              </th>
              <th scope="row" className="text-center">
                <Link
                  to={{
                    pathname: "/admin/appointments-repair",
                    state: { props: appointment },
                  }}
                  className="navbar-brand"
                >
                  <button className="button py-1 px-2 rounded small">
                    تعیین نوبت
                  </button>
                </Link>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    );
  else return <ErrorAuth />;
};

export default TodaysSchedule;
