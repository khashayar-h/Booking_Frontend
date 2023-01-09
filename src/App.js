import React, { useEffect, useState } from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import AdminLogin from "./Pages/AdminLogin";
import UserLogin from "./Pages/UserLogin";
import HomeUser from "./User/HomeUser";
import Error from "./Pages/Error";
import { AuthContext } from "./Auth/AuthContext";
import PersonalDetails from "./Admin/PersonalDetails";
import SearchAdmin from "./User/SearchAdmin";
import PerviousAppointments from "./User/PerviousAppointments";
import Selectdate from "./User/Selectdate";
import BookingSlots from "./Admin/BookingSlots";
import SetDitails from "./User/SetDitails";

import Confirm from "./User/Confirm";
import AdminPreAppointments from "./Admin/PreviousAppointments";
import AppointmentStatus from "./User/AppointmentStatus";
import Ufeedback from "./User/Feedback";
import FeedbackDetails from "./Admin/FeedbackDetails";
import AdminHome from "./Admin/AdminUser";
import repair from "./Admin/Appointment_repair";
import Repair_history from "./Admin/Repair_history";

function App() {
  const [token, setToken] = useState(
    window.localStorage.getItem("token"),
    "navid"
  );
  const [modal, setModal] = useState(true);
  const [userId, setUserId] = useState(window.localStorage.getItem("userId"));
  const [statusLogin, setStatusLogin] = useState(
    window.localStorage.getItem("statusLogin")
  );

  return (
    <Router>
      <AuthContext.Provider
        value={{
          token,
          setToken,
          userId,
          setUserId,
          statusLogin,
          setStatusLogin,
          modal,
          setModal
        }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/adminlogin" component={AdminLogin} />
          <Route exact path="/userlogin" component={UserLogin} />

          <Route exact path="/admin" component={AdminHome} />

          <Route exact path="/user/searchadmin" component={SearchAdmin} />
          <Route exact path="/user" component={HomeUser} />
          <Route
            exact
            path="/user/previousappointments"
            component={PerviousAppointments}
          />
          <Route
            exact
            path="/admin/perosnaldetails"
            component={PersonalDetails}
          />
          <Route
            exact
            path="/admin/previous-appointments"
            component={AdminPreAppointments}
          />
          <Route exact path="/admin/feedback/:id" component={FeedbackDetails} />
          <Route exact path="/user/selectdate" component={Selectdate} />
          <Route exact path="/user/book-slot" component={BookingSlots} />
          <Route exact path="/user/set-ditails" component={SetDitails} />

          <Route exact path="/user/confirm" component={Confirm} />
          <Route exact path="/admin/appointments-repair" component={repair} />
          <Route exact path="/admin/appointments-repair/Repair_history" component={Repair_history} />


          <Route
            exact
            path="/user/appointment-status"
            component={AppointmentStatus}
          />
          <Route exact path="/user/feedback/:id" component={Ufeedback} />
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
