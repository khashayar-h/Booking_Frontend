import React, { useState, useContext } from "react";
import Navbar from "../Basic/Navbar";
import { Row, Input, Button } from "reactstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import StarPicker from "react-star-picker";
import axios from "axios";
import { AuthContext } from "../Auth/AuthContext";
import ErrorAuth from "../Pages/ErrorAuth";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const appointmentId = useParams();
  const { statusLogin } = useContext(AuthContext);
  const history = useHistory();

  const onChange = (value) => {
    setRating(value);
  };

  const putFeedback = async () => {
    try {
      const { data } = axios.put(
        `https://booking.iran.liara.run/appointments/feedback/`,
        {
          appointmentId: appointmentId.id,
          stars: rating,
          title: title,
          review: review,
        }
      );

      if (data) {
        console.log(data);
      }

      history.push("/user/");
    } catch (err) {
      console.log(err);
    }
  };
  if (statusLogin == 200)
    return (
      <div>
        <Navbar />
        <div
          class="container mt-5 mb-5 rounded"
          style={{
            display: "flex",
            flexFlow: "column",
            padding: "20px",
            border: "3px solid #03203C ",
            height: "max-content",
            backgroundColor: "#fae6b1",
          }}
        >
          <h4 className="text-center m-3">امتیاز شما به تعمیر کار</h4>
          <Row style={{ justifyContent: "center" }}>
            <StarPicker
              onChange={onChange}
              value={rating}
              size={40}
            ></StarPicker>
          </Row>
          <Row className="m-3">
            <Input
              placeholder="عنوان"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Row>
          <Row className="m-3">
            <Input
              type="textarea"
              placeholder="نظر شما"
              maxLength="50px"
              style={{ height: "30vh" }}
              onChange={(e) => setReview(e.target.value)}
            />
          </Row>

          <Row
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "20px 0px",
            }}
          >
            <Link to="/user/previousappointments">
              <Button color="danger">بازگشت</Button>
            </Link>
            <Button color="warning" onClick={putFeedback}>
              ثبت امتیاز
            </Button>
          </Row>
        </div>
      </div>
    );
	else return <ErrorAuth/>
};

export default Feedback;
