import React, { useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  CardHeader,
  CardBody,
  FormGroup,
  CardFooter,
  Button,
  Label,
  Input,
} from "reactstrap";
import axios from "axios";
import { AuthContext } from "../Auth/AuthContext";
import Loading from "../Pages/Loading";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(0);
  const { token, setToken, userId, setUserId, setStatusLogin } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  async function login() {
    try {
      setLoading(true);
      const res = await axios.post(
        `https://booking.iran.liara.run/users/login/`,
        {
          username: username,
          password: password,
        }
      );
      setStatus(res.status);
      console.log()
      window.localStorage.setItem("statusLogin", res.status);
      setStatusLogin(window.localStorage.getItem("statusLogin"));
      setLoading(false);

      const token = res.data.token;
      const userId = res.data.userId;
      if (res.status === 200) {
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("userId", userId);
        console.log(userId);
        setToken(token);
        setUserId(userId);
        history.push("/user");
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (token && userId) {
    return <Redirect to="/user" />;
  }
  if (!loading) {
    return (
      <Container className="text-center auth">
        <Row className="flex-row-reverse">
          <Col lg={6} className="offset-lg-3 mt-5 ">
            <Card>
              <Form>
                <CardHeader className="">ورود کاربر</CardHeader>
                <CardBody>
                  <FormGroup row>
                    <Label for="email" sm={3}>
                      نام کاربری :
                    </Label>
                    <Col sm={9}>
                      <Input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="نام کاربری خود را وارد کنید"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="password" sm={3}>
                      نام کاربری :
                    </Label>
                    <Col sm={9}>
                      <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="رمز عبور خود را وارد کنید"
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(target) => {
                          if (target.charCode === 13) {
                            login();
                          }
                        }}
                      />
                    </Col>
                  </FormGroup>
                  {status === 201 && (
                    <p
                      className="warning"
                      style={{ color: "red", fontSize: "15px" }}
                    >
                      نام کاربری یا رمز عبور اشتباه است! لطفا مجددا تلاش کنید
                    </p>
                  )}
                </CardBody>
                <CardFooter>
                  <Button className="button" block color="none" onClick={login}>
                    ورود
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  } else return <Loading />;
};

export default LoginForm;
