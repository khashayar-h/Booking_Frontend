import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import ErrorAuth from "../Pages/ErrorAuth";
import { AuthContext } from "../Auth/AuthContext";
import { Modal } from "react-bootstrap";

const Serch_users = () => {
  const { statusLogin, modal, setModal } = useContext(AuthContext);
  const [user, setUser] = useState();
  const [plaq, setPlaq] = useState();
  const [mood, setMood] = useState();

  const fetchAppointments = async () => {
    const { data } = await Axios.post(
      `https://booking.iran.liara.run/appointments/getByLicense`,
      {
        carLicensePlate: plaq,
      }
    );
    setUser(data);
    console.log(data);
  };
  function getPlaqValue(e) {
    setPlaq(e.target.value);
  }
  function getUser() {
    console.log(plaq);
    fetchAppointments();
  }

  useEffect(() => {}, []);

  if (statusLogin == 200)
    return (
      <div>
        <div className="d-flex mb-4">
          <form onChange={getPlaqValue}>
            <input type="text" name="" id="" placeholder="پلاک ماشین " />
          </form>
          <button className="button px-3 py-1 mr-4" onClick={() => getUser()}>
            جستجو
          </button>
        </div>
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
                            <label htmlFor="" className="mr-4 small mt-2 ">
                              نام و مدل ماشین:
                            </label>
                            <p className=" border  rounded mt-4 py-2 w-50 text-right px-1 mr-3 h-auto">
                              {i.carModel}
                            </p>
                          </div>
                          <div className="d-flex  align-items-center justify-content-center col-12 ">
                            <label htmlFor="" className="mr-4 small mt-2 ">
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
    );
  else return <ErrorAuth />;
};

export default Serch_users;
