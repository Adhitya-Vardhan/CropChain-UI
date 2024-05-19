import React from "react";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import Courses from "../components/Courses";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import About from "../components/About";
import { TimeLine } from "../components/TimeLine";

export default function HomePage() {
  return (
    <div>
      <Navbar />

      <main>
        <div id="home">
          <Home />
        </div>

        <div id="about">
          <About />
        </div>

        <div className="my-20px">
          <TimeLine />
        </div>

        <div id="courses">
          <Courses />
        </div>

        <div id="contact">
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  );
}
