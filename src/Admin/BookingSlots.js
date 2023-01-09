import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Basic/Navbar";
import Axios from "axios";
import { AuthContext } from "../Auth/AuthContext";
import ErrorAuth from "../Pages/ErrorAuth";

const BookingSlots = (props) => {
  const { date, admin } = props.location.state;
  const [dateId, setdateId] = useState();
  const [Slots, setSlots] = useState([]);
  const { statusLogin } = useContext(AuthContext);

  useEffect(() => {
    const fetchDate = async (dateToPost) => {
      const { data } = await Axios.post(
        `https://booking.iran.liara.run/admins/get-slots/`,
        {
          adminId: admin._id,
          date: dateToPost,
        }
      );
      console.log(data);
      setdateId(data._id);
      setSlots(data.slots);
    };

    fetchDate(date);
  }, []);
  console.log(props)

  if (statusLogin == 200)
    return (
      <div className="" style={{ height: "100vh" }}>
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
              <h3 className="text-center mb-4" style={{ color: "#ffa101" }}>
                انتخاب نوبت معاینه فنی
              </h3>
              <table className="tableReformed col-12 table table-hover">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">
                      نوبت
                    </th>
                    <th scope="col" className="text-center">
                      وضعیت نوبت
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Slots.map((slot) => (
                    <tr key={slot._id}>
                      <th scope="row" className="text-center">
                        {slot.time}
                      </th>
                      {slot.isBooked ? (
                        <td>رزرو شده</td>
                      ) : (
                        <td className="text-center">
                          <Link
                            to={{
                              pathname: "/user/confirm",
                              data: {
                                dateId: dateId,
                                admin: admin,
                                slotId: slot._id,
                                date: date,
                                slot: slot.time,
                                carModel: props.location.state.carModel,
                                carPlaque: props.location.state.carPlaque,
                                carFailure: props.location.state.carFailure,
                              },
                            }}
                          >
                            <button className="button px-2 py-1"> رزرو نوبت</button>
                          </Link>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  else return <ErrorAuth />;
};

export default BookingSlots;
