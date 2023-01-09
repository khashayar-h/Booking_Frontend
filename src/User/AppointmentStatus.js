/* global gapi */
import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";

import "../Dashbaord/dashboard.css";
import "./style/AppointmentStatus.scss";
import Loading from "../Pages/Loading";
import { AuthContext } from "../Auth/AuthContext";
import { Modal } from "react-bootstrap";


const AppointmentStatus = () => {
  const { modal, setModal } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mood, setMood] = useState();
  const [clickedAppointment, setClickedAppointment] = useState();
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      var { data } = await Axios.post(
        `https://booking.iran.liara.run/users/upcoming-appointments/`,
        {
          userId: localStorage.getItem("userId"),
        }
      );
      setLoading(false);
      setAppointments(data);
    };

    fetchAppointments();
  }, []);

  if (!loading) {
    return (
      <table className="tableReformed table table-hover ">
        <thead>
          <tr>
            <th scope="col" className="text-center">
              نام تعمیرکار
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
          </tr>
        </thead>
        <tbody className="">
          {appointments.map((Appointment) => (
            <tr key={Appointment._id}>
              <th scope="row" className="text-center">
                {Appointment.adminName}
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
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else return <Loading />;
};

export default AppointmentStatus;
