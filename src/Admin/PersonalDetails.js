import React, { useContext, useMemo, useState } from "react";
import Loading from "../Pages/Loading";
import jwt_decode from "jwt-decode";
import "../Dashbaord/dashboard.css";
import { AuthContext } from "../Auth/AuthContext";

const PersonalDetails = () => {

  const { token } = useContext(AuthContext);
  const admin = useMemo(() => jwt_decode(token), [token]);
  if (admin)
    return (
      <div className="userDashboard row text-justify">
        <div
          className="col-9 col-md-9  pt-0"
          style={{ minWidth: "-webkit-fill-available" }}
        >
          <div className="card mb-4">
            <h4 className="card-header">اطلاعات شخصی</h4>
            <ul className="list-group">
              <li className="list-group-item">
                <span className="badge ml-2 p-2">نام :</span>
                {admin.name}
              </li>
              <li className="list-group-item">
                <span className="badge  ml-2 p-2">ایمیل :</span>
                {admin.email}
              </li>
              <li className="list-group-item">
                <span className="badge  ml-2 p-2">شماره تماس :</span>
                {admin.phone}
              </li>
            </ul>
          </div>
        </div>
        <div className="col-3 col-md-3 p-4 ">
          <img src={admin.picture} style={{ width: "100%" }} alt="" />
        </div>
      </div>
    );
  else return <Loading />;

  // if (statusLogin == 200) {

  //   return (
  //     <div
  //       className="right p-4"
  //       style={{
  //         border: "15px solid yellow ",
  //         height: "80vh",
  //         backgroundColor: "#6c757d",
  //       }}
  //     >
  //       <div className="card mb-4 text-justify">
  //         <h4 className="card-header">اطلاعات شخصی</h4>
  //         <ul className="list-group">
  //           <li className="list-group-item">
  //             <span className="badge badge-info ml-2 p-2 text-uppercase ">
  //               نام :
  //             </span>
  //             <span className="text-uppercase">{admin.name}</span>
  //           </li>
  //           <li className="list-group-item">
  //             <span className="badge badge-info ml-2 p-2 text-uppercase">
  //               تخصص :
  //             </span>
  //             <span className="text-capitalize">{admin.specialization}</span>
  //           </li>
  //           <li className="list-group-item">
  //             <span className="badge badge-info ml-2 p-2 text-uppercase">
  //               شماره تماس :
  //             </span>
  //             {admin.phoneNumber}
  //           </li>
  //         </ul>
  //       </div>
  //     </div>
  //   );
  // } else return <ErrorAuth />;
};
export default PersonalDetails;
