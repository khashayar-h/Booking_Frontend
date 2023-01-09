import React from "react";

import Image from "../image/car.jpg";

const About = () => {
  return (
    <div className="container">
    <div className="card my-5  ">
      <div className="row g-0">
        <div className="col-md-4 order-md-2">
          <img src={Image} className="img-fluid rounded-start" alt="..." 
          width={300}
            height={300}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title text-center">سیستم مدیریت نوبت تعمیرگاه</h5>
            <p className="card-text text-center mt-5">
            با توجه به استفاده روزافزون از سیستم های اتوماسیون در صنایع و کسب و کار های مختلف ، نیاز به سیستمی جامع برای مدیریت
درخواست های مشتریان در تعمیرگاه های خودرو و نمایندگی ها احساس  می شود. این سیستم می تواند در صرفه جویی وقت مشتریان نیز
تاثیرگذار باشد و همچنین باعث ایجاد تجربه ای متفاوت و لذت بخش از روند تعمیر خودرو در مشتتریان خواهد شد. این سیستم باعث
مدیریت بهتر درخواست ها توسط نمایندگی ها و تعمیرکاران خودرو می شود
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default About;
