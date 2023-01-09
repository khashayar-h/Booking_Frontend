import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import Scrollbar from "react-scrollbars-custom";
import "../Dashbaord/dashboard.css";
import StarPicker from "react-star-picker";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Auth/AuthContext";
import ErrorAuth from "../Pages/ErrorAuth";
import { Modal } from "react-bootstrap";


const AdminPreAppointments = () => {
  const { statusLogin, modal, setModal } = useContext(AuthContext);
  const [Appointments, setAppointments] = useState([]);
  const [dropdownValue, setDropdownValue] = useState([]);
  const [mood, setMood] = useState();
  const [clickedAppointment, setClickedAppointment] = useState();

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

  const fetchAppointments = async () => {
    var token = localStorage.getItem("token");
    var decoded = jwt_decode(token);
    const { data } = await Axios.post(
      `https://booking.iran.liara.run/admins/previous-appointments/`,
      {
        adminId: decoded._id,
      }
    );
    console.log(data);
    setAppointments(data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);
  if (statusLogin == 200)
    return (
      <Scrollbar
        noScrollX
        style={{ position: "", height: "73vh", width: "150vh" }}
        className="col-12 col-md-12"
      >
        <table className="tableReformed table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col" className="text-center">
                نام کاربر
              </th>
              <th scope="col" className="text-center">
                جزئیات نوبت ها
              </th>
              <th scope="col" className="text-center">
                جزئیات ماشین
              </th>

              <th scope="col" className="text-center">
                وضعیت
              </th>
              <th
                className="text-center"
                scope="col"
                style={{ textAlign: "center" }}
              >
                امتیاز کابر
              </th>
              <th className="text-center" scope="col">
                تغییر وضعیت
              </th>
            </tr>
          </thead>
          <tbody>
            {Appointments.map((Appointment) => (
              <tr>
                <th scope="row" className="text-center">
                  {Appointment.userName}
                </th>
                <th scope="row" className="text-center">
                <button
                 id={"modalInfoBtn" + Appointment._id}
                  className="button py-1 px-2 rounded h6"
                  onClick={() => {
                    setModal(true);
                    setMood(2);
                    setClickedAppointment(Appointment);
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
                  id={"modalCarBtn" + Appointment._id}
                  className="button py-1 px-2 rounded h6"
                  onClick={() => {
                    setModal(true);
                    setMood(1);
                    setClickedAppointment(Appointment);
                    console.log(clickedAppointment);
                  }}
                >
                  جزییات ماشین
                </button>
              </th>
                <th scope="row" className="text-center">
                  {Appointment.status}
                </th>
                {Appointment.feedback.given ? (
                  <th
                    className="text-center"
                    scope="row"
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      border: "none!important",
                    }}
                  >
                    <StarPicker
                      value={Appointment.feedback.stars}
                      size="20"
                    ></StarPicker>
                    <Link to={`/admin/feedback/${Appointment._id}`}>
                      <a className="button px-4 py-1"> جزئیات</a>
                    </Link>
                  </th>
                ) : (
                  <th
                    className=""
                    scope="row"
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    -
                  </th>
                )}
                <th className="text-center">
                  <select
                    className="selectOption"
                    name="cars"
                    id="cars"
                    onChange={handleChange}
                  >
                    <option selected>-</option>
                    <option value={[Appointment._id, 0]}>
                      آماده معاینه فنی
                    </option>
                    <option value={[Appointment._id, 1]}>تخصیص نوبت</option>
                    <option value={[Appointment._id, 2]}>در حال انجام</option>
                    <option value={[Appointment._id, 3]}>تمام شده</option>
                  </select>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </Scrollbar>
    );
  else return <ErrorAuth />;
};

export default AdminPreAppointments;
