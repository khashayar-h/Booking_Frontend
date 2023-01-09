import React, { useState, useEffect, useMemo, useContext } from "react";
import Axios from "axios";
import Scrollbar from "react-scrollbars-custom";
// import { ListGroup, ListGroupItem } from "reactstrap";

import {
  Row,
  Col,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import { AuthContext } from "../Auth/AuthContext";

import Trie from "./Trie.js";
import specialization from "./specialization";
import { Link } from "react-router-dom";
import ErrorAuth from "../Pages/ErrorAuth";
import Loading from "../Pages/Loading";

const Search = () => {
  const { statusLogin } = useContext(AuthContext);
  const [text, setText] = useState();
  const [suggestions, setSuggestions] = useState([]);
  const memoized_trie = useMemo(() => {
    const trie = new Trie();

    // Insert
    for (let i = 0; i < specialization.length; i++) {
      trie.insert(specialization[i]);
    }

    return trie;
  }, []);
  const [loading, setLoading] = useState(true);

  function onTextChanged(e) {
    let value = e.target.value;
    setText(value);
    fetchAdmin();
    value = value.toLowerCase();
    if (value !== "") setSuggestions(memoized_trie.find(value));
    else setSuggestions([]);
  }

  function suggestionSelected(value) {
    setText(value);
    setSuggestions([]);
  }

  function renderSuggestions() {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <InputGroup>
        <ul className="list-group dropdown-menu pt-0 pb-0">
          {suggestions.map((item) => (
            <li
              className="list-group-item list-group-item-action"
              onClick={() => suggestionSelected(item)}
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      </InputGroup>
    );
  }

  const [Admin, setAdmin] = useState([]);

  const fetchAdmin = async () => {
    const { data } = await Axios.get(
      `https://booking.iran.liara.run/admins/`
    );
    setAdmin(data);
    setLoading(false);
  };

  const UpdateDisplay = (text) => {
    setAdmin((Admin) => {
      return Admin.filter(
        (admin) => admin.specialization.toLowerCase() === text.toLowerCase()
      );
    });
    console.log(Admin);
  };

  useEffect(() => {
    fetchAdmin();
  }, []);
  if (statusLogin == 200) {
    if (!loading) {
      return (
        <div>
          <Row className="mb-3">
            <Col>
              <InputGroup>
                <Input
                  value={text}
                  type="text"
                  placeholder="جستجوی تعمیرکار"
                  onChange={onTextChanged}
                  className="mb-1"
                />
                <div style={{ height: 10 }} className="">
                  <InputGroupAddon addonType="append">
                    <Button
                      className="button h-10 d-inline-block mr-2"
                      color="white"
                      onClick={() => UpdateDisplay(text)}
                    >
                      جستجوی تعمیرکار
                    </Button>
                  </InputGroupAddon>
                </div>
              </InputGroup>
              {renderSuggestions()}
            </Col>
          </Row>

          {/* <ListGroup> */}
          <Scrollbar
            noScrollX
            style={{ position: "", height: "64vh", maxWidth: "100%" }}
            className="col-10 col-md-8"
          >
            <div className="row">
              {Admin.map((admin) => (
                // <ListGroupItem key={doc.id} className="mb-3">
                <div className="col-sm-6 mb-2" key={admin._id}>
                  <div className="card ">
                    <div className="card-body">
                      <div className="text-info">
                        <h6 style={{ textAlign: "center" }}>
                          نام تعمیرکار :
                          <span
                            className="text-uppercase"
                            style={{ textAlign: "center" }}
                          >
                            {" "}
                            {admin.name}
                          </span>
                        </h6>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        تخصص : {admin.specialization}
                      </div>
                      <div style={{ textAlign: "center" }}>
                        شماره تماس : {admin.phoneNumber}
                      </div>
                      <div className="row mb-0 pb-0">
                        <div
                          style={{ textAlign: "center" }}
                          className="col-md-12 "
                        >
                          آدرس : {admin.address}
                        </div>
                        <div
                          className=" col align-self-end col-md-2 offset-md-3 inline"
                          style={{ textAlign: "center" }}
                        >
                          <Link
                            to={{
                              pathname: "/user/selectdate",
                              admin: { admin: admin },
                            }}
                          >
                            <button className="button btn ">رزرو</button>
                          </Link>
                        </div>
                      </div>

                      {/* </ListGroupItem> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Scrollbar>
          {/* </ListGroup> */}
        </div>
      );
    } else return <Loading />;
  } else return <ErrorAuth />;
};

export default Search;
