import React, { useContext, useEffect } from "react";
import Navbar from "../Basic/Navbar";
import { useState } from "react";
import { AuthContext } from "../Auth/AuthContext";
import ErrorAuth from "../Pages/ErrorAuth";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";

import "react-multi-date-picker/styles/colors/yellow.css";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "../Dashbaord/dashboard.css";
import "../User/style/userDashboard.scss";

const Repair_history = () => {
  const { statusLogin, modal, setModal } = useContext(AuthContext);
  const [user, setUser] = useState();
  const [mood, setMood] = useState();
  const history = useHistory();

  const location = useLocation();
  const { props } = location.state;

  useEffect(() => {
    const fetchAppointments = async () => {
      const { data } = await Axios.post(
        `https://booking.iran.liara.run/appointments/getByLicense`,
        {
          carLicensePlate: props.carLicensePlate,
        }
      );
      console.log(data);
      setUser(data);
    };
    fetchAppointments();
  }, []);
  console.log(user);

  if (statusLogin == 200)
    return (
      <div className="">
        <Navbar />
        <div>
          <div
            className="main_user row mx-5 my-2"
            style={{ maxWidth: "100%", height: "80vh" }}
          >
            <div className=" left  p-2 w-60 mx-auto" style={{ width: "85% " }}>
              <div className="top_main">
                <p>صفحه سوابق تعمیر </p>
                <button
                  className="button py-1 px-2 rounded"
                  onClick={() => history.push("/admin")}
                >
                  بازگشت به صفحه قبل
                </button>
              </div>
              <div className="d-flex mt-4  justify-content-between mb-4  align-items-center position-reletive"></div>

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
                  </tr>
                </thead>
                <tbody>
                  {user &&
                    user.map((i, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row" className="text-center">
                            {i.userName}
                          </th>
                          <th scope="row" className="text-center">
                            <button
                              className="button py-1 px-2 rounded h6"
                              onClick={() => {
                                setModal(true);
                                setMood(2);
                              }}
                            >
                              جزییات نوبت
                            </button>
                          </th>
                          <Modal
                            className=" "
                            show={modal}
                            onHide={() => setModal(false)}
                          >
                            {mood == 1 ? (
                              <div className="d-flex flex-column  align-items-start">
                                <div className="d-flex  align-items-center justify-content-center col-12 ">
                                  <label
                                    htmlFor=""
                                    className="mr-4 small mt-2 "
                                  >
                                    نام و مدل ماشین:
                                  </label>
                                  <p className=" border  rounded mt-4 py-2 w-50 text-right px-1 mr-3 h-auto">
                                    {i.carModel}
                                  </p>
                                </div>
                                <div className="d-flex  align-items-center justify-content-center col-12 ">
                                  <label
                                    htmlFor=""
                                    className="mr-4 small mt-2 "
                                  >
                                    شماره پلاک ماشین:
                                  </label>
                                  <p className=" border  rounded mt-2 py-2 w-50 text-right px-1 mr-3 h-auto">
                                    {i.carLicensePlate}
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
                                  {i.description}
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
                                    <lable className="text-muted small ml-2">
                                      تاریخ:
                                    </lable>
                                    <span>{i.date}</span>
                                  </div>
                                  <div className="d-flex mt-2">
                                    <lable className="text-muted small ml-2">
                                      ساعت:
                                    </lable>
                                    <span>{i.slotTime}</span>
                                  </div>
                                </div>
                                <div className="  d-flex w-50 h-100   flex-column align-items-center rounded  ">
                                  <p className="text_yellow">تعمیر</p>
                                  <div className="d-flex mt-2">
                                    <lable className="text-muted small ml-2">
                                      تاریخ:
                                    </lable>
                                    <span> {i.repairDate}</span>
                                  </div>
                                  <div className="d-flex mt-2">
                                    <lable className="text-muted small ml-2">
                                      ساعت:
                                    </lable>
                                    <span>
                                      {i.repairSlotTime?.startTime}
                                      {" - "}
                                      {i.repairSlotTime?.endTime}
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
                              className="button py-1 px-2 rounded h6"
                              onClick={() => {
                                setModal(true);
                                setMood(1);
                              }}
                            >
                              جزییات ماشین
                            </button>
                          </th>
                          <th scope="row" className="text-center">
                            <span>{i.status}</span>
                          </th>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  else return <ErrorAuth />;
};
export default Repair_history;
