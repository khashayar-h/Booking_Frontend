import React, { useState, useContext } from "react";
import Navbar from "../Basic/Navbar";
import "react-calendar/dist/Calendar.css";
import { Link } from "react-router-dom";

import { AuthContext } from "../Auth/AuthContext";
import ErrorAuth from "../Pages/ErrorAuth";

const SetDitails = (props) => {
  const { statusLogin } = useContext(AuthContext);
  const [carModel, setCarModel] = useState("");
  const [carPlaque, setCarPlaque] = useState("");
  const [carFailure, seCarFailure] = useState("");

  console.log(props.location.state.admin);
  function dataForm(e) {
    if (e.target.id == "carModel") {
      setCarModel(e.target.value);
    }
    if (e.target.id == "carPlaque") {
      setCarPlaque(e.target.value);
    }
    if (e.target.id == "carFailure") {
      seCarFailure(e.target.value);
    }
  }
  function setData() {
    console.log(carModel, carPlaque, carFailure);
    console.log("dd");
  }
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
              <form
                action=""
                onChange={dataForm}
                className="d-flex flex-column justify-content-center align-items-center"
              >
                <div className="col-12 d-flex justify-content-center align-items-center">
                  <label htmlFor="">شماره پلاک:</label>
                  <input
                    id="carModel"
                    type="text"
                    className="col-4 m-2 p-1"
                    placeholder="942 ب 84 "
                  />
                  <label htmlFor="" className="mr-4">
                    نام و مدل ماشین:
                  </label>
                  <input
                    id="carPlaque"
                    type="text"
                    className="col-4 m-2 p-1"
                    placeholder="پژو پارس مدل 98"
                  />
                </div>

                <div className="col-12 d-flex justify-content-center ">
                  <label htmlFor="" className="mx-4  mt-2">
                    شرح خرابی ماشین :
                  </label>
                  <textarea
                    className="col-9 d-flex justify-content-center mt-2
                "
                    id="carFailure"
                    rows="8"
                    placeholder="..."
                  ></textarea>
                </div>
              </form>

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
                        date:props.location.state.date,
                        admin: props.location.state.admin,
                        carModel: carModel,
                        carPlaque: carPlaque,
                        carFailure: carFailure,
                      },
                    }}
                  >
                    <button
                      className="button px-4 py-1"
                      onClick={() => setData()}
                    >
                      انتخاب
                    </button>
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

export default SetDitails;
