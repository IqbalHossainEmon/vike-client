import React from "react";
import Footer from "../../Shared/Footer";
import Navigation from "../../Shared/Navigation";
import Banner from "../Banner/Banner";
import Gallery from "../Gallery/Gallery";
import HomeProducts from "../HomeProducts/HomeProducts";
import Reviews from "../Reviews/Reviews";

const Home = () => {
  return (
    <div>
      <Navigation>top</Navigation>
      <Banner />
      <HomeProducts />
      <Gallery />
      <Reviews />
      <Footer />
    </div>
  );
};

export default Home;
