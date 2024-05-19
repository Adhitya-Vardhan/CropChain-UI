import React from "react";
import Heading from "../layout/Heading";
import CoursesCard from "../layout/CoursesCard";
import webImg from "../assets/web-dev.svg";
import appImg from "../assets/App-dev.svg";
import graphicImg from "../assets/graphic.svg";
import digitalImg from "../assets/digital.svg";

const Courses = () => {
  return (
    <div className=" min-h-screen flex flex-col items-center md:px-32 px-5 my-10">
      <Heading title1="Technologies" title2="Used" />

      <div className=" flex flex-wrap justify-center gap-6 mt-6">
        <CoursesCard img={webImg} title="React JS, Taileindwind CSS" />
        <CoursesCard img={appImg} title="Solidity" />
        <CoursesCard img={graphicImg} title="Hardhat" />
        <CoursesCard img={digitalImg} title="IPFS" />
      </div>
    </div>
  );
};

export default Courses;
