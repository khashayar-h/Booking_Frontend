import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
import Navbar from "../Basic/Navbar";
import { toast } from "react-toastify";
import axios from "axios";
import ErrorAuth from "../Pages/ErrorAuth";
// import { Toast } from "react-toastify/dist/components";

function getEndDateTime(dateTime) {
  const hrs = (parseInt(dateTime.split("T")[1].split(":")[0]) + 1)
    .toString()
    .padStart(2, "0");
  const time = hrs + ":00:00";
  const date = dateTime.split("T")[0];
  return date + "T" + time;
}

const Confirm = (props) => {
  const [finalBalnce, setFinalBalnce] = useState(0);
  const history = useHistory();
  const { statusLogin } = useContext(AuthContext);

  function createEvent(id, dateTime, doctorEmail) {
    var virtualEvent = {
      id: id,
      summary: "Appointment",
      location: "Virtual",
      description: "Doctor-Patient appointment",
      start: {
        dateTime: dateTime,
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: getEndDateTime(dateTime),
        timeZone: "Asia/Kolkata",
      },
      conferenceData: {
        createRequest: {
          requestId: "7qxalsvy0e",
        },
      },
      attendees: [{ email: doctorEmail }],
      guestsCanModify: true,
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 15 },
        ],
      },
    };

    var request = window.gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: virtualEvent,
      sendUpdates: "all",
      supportsAttachments: true,
      conferenceDataVersion: 1,
    });

    request.execute(function (event) {
      console.log("Executed!");
      if (event) {
        axios
          .put(`https://booking.iran.liara.run/appointments/add-meet-link`, {
            appointmentId: id,
            meetLink: event.hangoutLink,
          })
          .then((x) => {
            console.log(`Updated Meet Link!`);
          });
      }
    });
  }

  const { dateId, admin, slotId, date, slot } = props.location.data;

  const bookSlot = async () => {
    const { data } = await Axios.post(
      `https://booking.iran.liara.run/admins/book-slot/`,
      {
        userId: localStorage.getItem("userId"),
        userName: JSON.parse(localStorage.getItem("user")).name,
        slotId: slotId,
        dateId: dateId,
        adminId: admin._id,
        carModel: props.location.data.carPlaque,
        // carModel: props.location.data.carModel,
        description: props.location.data.carFailure,
        carLicensePlate: props.location.data.carModel,
      }
    );
    console.log(data);

    if (data.doctorEmail) {
      createEvent(data._id, data.date + "T" + data.slotTime, data.doctorEmail);
    }
    toast("Appointment booked successfully", {
      type: "success",
    });
    history.push("/user");
  };

  useEffect(() => {
    setFinalBalnce(1.18 * admin.feesPerSession);
  }, []);
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
              className="col-9 col-md-9 p-4 rounded "
              style={{
                border: "3px solid gray ",
                height: "70vh",
                backgroundColor: "#fae6b1",
              }}
            >
              <div className="row">
                <div className="well col-xs-6 col-sm-6 col-md-12 col-xs-offset-1 col-sm-offset-1 col-md-offset-3">
                  <div className="row">
                    <div className="text-center">
                      <h3
                        className="text-center mb-4"
                        style={{ color: "#ffa101" }}
                      >
                        اطلاعات نوبت
                      </h3>
                    </div>
                    <table className="tableReformed col-12 table table-hover ">
                      <thead>
                        <tr>
                          <th className="text-center">نام تعمیرکار</th>
                          <th className="text-center">تخصص</th>
                          <th className="text-center">شماره پلاک</th>
                          <th className="text-center"> نام و مدل ماشین</th>
                          <th className="text-center">تاریخ معاینه فنی</th>
                          <th className="text-center">ساعت معاینه فنی</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className=" text-center">{admin.name}</td>
                          <td className=" text-center">
                            {admin.specialization}
                          </td>
                          <th className="text-center">
                            {props.location.data.carModel}
                          </th>
                          <th className="text-center">
                            {props.location.data.carPlaque}
                          </th>
                          <td className="text-center">{date}</td>
                          <td className="text-center">{slot}</td>
                        </tr>
                      </tbody>
                    </table>
                    <button
                      onClick={() => bookSlot()}
                      type="button"
                      className="btn btn-lg btn-block"
                      style={{ backgroundColor: "#ffa101" }}
                    >
                      رزرو نوبت&nbsp;&nbsp;&nbsp;
                      <span className="glyphicon glyphicon-chevron-right" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  else return <ErrorAuth />;
};

export default Confirm;
