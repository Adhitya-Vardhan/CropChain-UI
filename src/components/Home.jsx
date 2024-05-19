import React from "react";
import img from "../assets/hero.svg";
import Button from "../layout/Button";
import { Link } from "react-scroll";

const Home = () => {
  return (
    <div className=" min-h-[70vh] flex flex-col md:flex-row md:justify-between items-center md:mx-32 mx-5 mt-10">
      <div className=" md:w-2/4 text-center">
        <h2 className=" text-5xl font-semibold leading-tight">
          Knowledge with
          <span className="text-brightGreen"> CropChain</span>
        </h2>
        <p className=" text-lightText mt-5 text-start">
          AgriChain opens the door to a revolutionary approach to agricultural
          management. Our platform leverages blockchain technology to create a
          decentralized ecosystem for plant disease detection and solution
          verification. Explore our comprehensive suite of tools tailored to
          farmers, scientists, and administrators, empowering you to make
          informed decisions and drive sustainable agriculture forward.
        </p>

        <Link to="contact" spy={true} smooth={true} duration={500}>
          <Button title="Contact Us" />
        </Link>
      </div>

      <div className=" w-full md:w-2/4">
        <img src={img} alt="img" />
      </div>
    </div>
  );
};

export default Home;
