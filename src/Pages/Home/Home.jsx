import React from "react";
import Layout from "../../Layout/Layout";
import "../Home/Home.css";
import Flow from "../../Components/Flow";
import discountbus from "../../Photos/discountbus.png";
import Services from "../../Components/Services";

const Home = () => {
  return (
    <Layout>
      <div className="main-container">
        <div className="main-text">
          <h1>RIMJIME Travels </h1>
          <h6>Make your travel along with the patiece with travel</h6>
          <button className="main-button">Explore more</button>
        </div>
        <div className="main-bus-banner">
          <img src={discountbus} alt="Bus" />

          <div className="circular"></div>
        </div>
      </div>
      <Flow />
      <Services></Services>
    </Layout>
  );
};

export default Home;
