import React, { useContext } from "react";
import Navbar from "../Basic/Navbar";
import Leftside from "../Dashbaord/leftSideAdmin";
import TodaysSchedule from "../Admin/TodaysSchedule";
import "../Dashbaord/dashboard.css";
import { AuthContext } from "../Auth/AuthContext";
import ErrorAuth from "./ErrorAuth";

const AdminDashboard = () => {
  const { statusLogin } = useContext(AuthContext);
  console.log(statusLogin)
if(statusLogin==200)
  return (
    <div className="bg-dark" style={{ height: "100vh" }}>
      <Navbar />
      <div>
        <div className="row m-5" style={{ maxWidth: "100%" }}>
          <div
            className="col-3 col-md-3 p-4 bg-white "
            style={{ height: "80vh" }}
          >
            <Leftside />
          </div>
          <div
            className="col-9 col-md-9 p-4"
            style={{
              border: "15px solid yellow ",
              height: "80vh",
              backgroundColor: "#6c757d",
            }}
          >
            <TodaysSchedule />
          </div>
        </div>
      </div>
    </div>
  );
  else return <ErrorAuth/>
};

export default AdminDashboard;
