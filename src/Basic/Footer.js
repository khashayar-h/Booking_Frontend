import React from "react";
import { Link } from "react-router-dom";
import SocialMediaButtons from "react-social-media-buttons";
import "../style/default.scss";
const Footer = () => {
  return (
    <div
      className=" footer row text-light bg-dark p-4"
      style={{
        maxWidth: "100%",
        margin: "auto",
      }}
    >
      <div
        className=" col-12 col-md-4 w-100 "
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h5 className="white-text text-center">تماس با ما</h5>
        <p className="grey-text text-center mt-4">
          دانشگاه آزاد نجف آباد - دانشکده مهندسی کامپیوتر
        </p>
        <p className="grey-text mb-0" style={{ fontSize: "13px" }}></p>
        <p className="grey-text mb-1" style={{ fontSize: "13px" }}>
          09220930391
        </p>
      </div>

      <div
        className="col-12 col-md-4 w-100 pb-3"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h5 className="white-text pb-3">شبکه های اجتماعی</h5>
        <SocialMediaButtons
          links={[
            "https://www.facebook.com/facebook",
            "https://twitter.com/Twitter",
            "https://www.instagram.com/instagram/",
            "https://www.linkedin.com/company/linkedin/",
          ]}
          buttonStyle={{
            width: "44px",
            height: "44px",
            margin: "0px 1px",
            backgroundColor: "transparent",
          }}
          iconStyle={{ color: "#00fbff" }}
          openNewTab={true}
          style={{ fontSize: "13px" }}
        />
      </div>
      <div
        className="col-12 col-md-4 w-100"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h5 className="white-text pb-3">درباره ما</h5>
        <p className="grey-text mb-1 text-center" style={{ fontSize: "13px" }}>
          این سیستم می تواند در صرفه جویی وقت مشتریان نیز تاثیرگذار باشد و
          همچنین باعث ایجاد تجربه ای متفاوت و لذت بخش از روند تعمیر خودرو در
          مشتتریان خواهد شد
        </p>
      </div>
    </div>
  );
};

export default Footer;
