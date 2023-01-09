import React, { useEffect, useState, useContext } from "react";
import Navbar from "../Basic/Navbar";
import { Row, Input, Button } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import StarPicker from "react-star-picker";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { AuthContext } from "../Auth/AuthContext";
import ErrorAuth from "../Pages/ErrorAuth";

const FeedbackDetails = () => {
  const { id } = useParams();
  const [feedback, setFeedback] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { statusLogin } = useContext(AuthContext);

  useEffect(() => {
    async function init() {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://booking.iran.liara.run/admins/appointment/${id}`
      );

      setFeedback(data?.feedback);

      setIsLoading(false);
    }

    init();
  }, []);

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Spinner animation="border" variant="danger" role="status">
            <span className="sr-only">صبر کنید ...</span>
          </Spinner>
        </div>
      </div>
    );
  }
  if (statusLogin == 200)
    return (
      <div>
        <Navbar />
        <div
          class="container mt-5 mb-5"
          style={{
            display: "flex",
            flexFlow: "column",
            padding: "20px",
            border: "15px solid #03203C ",
            height: "max-content",
            backgroundColor: "#35BDD0",
          }}
        >
          <Row style={{ justifyContent: "center" }}>
            <StarPicker value={feedback?.stars} size={40}></StarPicker>
          </Row>
          <Row className="m-3">
            <Input readOnly="true" value={feedback?.title} />
          </Row>
          <Row className="m-3">
            <Input
              type="textarea"
              maxLength="50px"
              style={{ height: "30vh" }}
              readOnly="true"
              value={feedback?.review}
            />
          </Row>

          <Row
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "20px 0px",
            }}
          >
            <Link to="/admin/previous-appointments">
              <Button color="danger">بازگشت</Button>
            </Link>
          </Row>
        </div>
      </div>
    );
	else return <ErrorAuth/>
};

export default FeedbackDetails;
