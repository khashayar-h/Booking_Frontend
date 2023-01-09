import React from "react";
import { Link } from "react-router-dom";
const ErrorAuth = () => {
  return (
    <div style={{"backgroundColor":"white","width":"100%","height":"100vh"}} className="p-4">
      <h1 className="text-center mb-4 ">کاربر گرامی شما مجاز به دسترسی این قسمت سایت نیستید</h1>
      <h3 className="text-center mb-4 ">لطفا اول احراز هویت را انجام بدهید</h3>

      <div className="d-flex justify-content-center">
        <Link to="/" className="btn">
          <button type="button" className="btn btn-outline-dark text-centre">
            بازگشت به صفحه اصلی
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorAuth;
