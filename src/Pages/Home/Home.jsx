import React from "react";
import Layout from "../../Layout/Layout";
import "../Home/Home.css";
import Flow from "../../Components/Flow";
import discountbus from "../../Photos/discountbus.png";
import Services from "../../Components/Services";
import Features from "../../Components/Features";

const Home = () => {
  return (
    <Layout>
      <div className="main-container">
        <div className="main-text">
          <h1 className="Rimjim">RIMJIM Travels </h1>
          {/* <h6>Seamless Reservations, Anytime, Anywhere</h6> */}
          <h6>Elevate Your Journey Seamless and Connected</h6>
          <button className="main-button">Explore more</button>
        </div>
        <div className="main-bus-banner">
          <img src={discountbus} alt="Bus" />

          <div className="circular"></div>
        </div>
      </div>
      <Flow />
      <Features />
      <Services></Services>
    </Layout>
  );
};

export default Home;
