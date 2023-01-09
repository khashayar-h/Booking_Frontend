import React from "react";
import Footer from "../Basic/Footer";
import Navbar from "../Basic/Navbar";
import About from "../Home/About";
import Jumbo from "../Home/Jumbo";
import LoginButton from "../Home/LoginButton";
import Scrollbar from "react-scrollbars-custom";

const Home = () => {
  return (
    <div>
      <Scrollbar
        noScrollX
        style={{ position: "", height: "100vh", maxWidth: "100%", rtl: "true" }}
        className="col-10 col-md-8"
      >
        <Navbar />
        <Jumbo />
        <About />
        <Footer />
      </Scrollbar>
    </div>
  );
};

export default Home;
