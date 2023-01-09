import React, { useContext ,useEffect,useState } from "react";
import { AuthContext } from "../Auth/AuthContext";
import Axios from "axios";

import "./style/userDashboard.scss";
import Loading from "../Pages/Loading";

const PersonalDetails = () => {
  const { userId } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getUserDetails = async () => {
      const res = await Axios.get(
        `https://booking.iran.liara.run/users/getUserDetails/${userId}`
      );
      if (res.status === 200) {
        setUser(res.data);
        window.localStorage.setItem("user", JSON.stringify(res.data));
        setLoading(false);
      } else {
        console.log(res.data.message);
        setLoading(false);
      }
    };
    getUserDetails();
  }, [userId]);

  if (!loading)
    return (
        <div className="userDashboard row text-justify">
          <div
            className="col-9 col-md-9 p-4"
            style={{ minWidth: "-webkit-fill-available" }}
          >
            <div className="card mb-4">
              <h4 className="card-header">اطلاعات شخصی</h4>
              <ul className="list-group">
                <li className="list-group-item">
                  <span className="badge ml-2 p-2">نام :</span>
                  {user.name}
                </li>
                <li className="list-group-item">
                  <span className="badge  ml-2 p-2">ایمیل :</span>
                  {user.email}
                </li>
                <li className="list-group-item">
                  <span className="badge  ml-2 p-2">شماره تماس :</span>
                  {user.phone}
                </li>
              </ul>
            </div>
          </div>
          <div className="col-3 col-md-3 p-4 ">
            <img
              src={user.picture}
              style={{ width: "100%" }}
              alt=""
            />
          </div>
        </div>
    );
  else return <Loading />;
};
export default PersonalDetails;
