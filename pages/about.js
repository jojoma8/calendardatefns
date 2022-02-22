import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import aboutImage from "../assets/NXTgen-Page-Covers-About-1.jpg";
import Image from "next/image";
import { motion, motionValue } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  FaLightbulb,
  FaRocket,
  FaHospitalUser,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdCoronavirus } from "react-icons/md";

export default function about() {
  const cardVariants = {
    offscreen: {
      y: 300,
    },
    onscreen: {
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <div>
      <div className="absolute -z-10 ">
        <Image src={aboutImage} alt={`NXTgen e-clinic about us`} />
      </div>
      <div
        id="test"
        className="md:px-28 lg:px-40 px-10 md:w-4/5 w-full 
            pt-20 "
      >
        <div className="headerText md:text-5xl text-4xl ">About</div>
        <div className="pb-10 pt-20">
          <button
            onClick={() => setAppointmentBookingModal(true)}
            className="btn py-3 text-white w-full 
                  sm:w-3/6 md:w-7/12 lg:w-6/12"
          >
            Book an Appointment
          </button>
        </div>
      </div>
      <div
        className="flex flex-col items-center justify-center mt-48
        "
      >
        {/* our story */}
        <div className="headerText text-4xl">Our Story</div>
        <div className="wrapper  max-w-5xl mx-auto m-5  relative">
          <div
            className="center-line absolute bg-orange-450 h-full w-1 
            ml-10
             sm:left-1/2 sm:-translate-x-1/2 sm:ml-0"
          ></div>

          {/* Pandemic Started Card */}
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            className="row row-span-1 flex 
            sm:justify-center 
             relative "
          >
            <div className="absolute ">
              <div
                className="absolute bg-orange-450  
                ml-5
                sm:left-1/2 sm:-translate-x-1/2 top-14 sm:ml-0
                h-10 w-10 rounded-full flex items-center justify-center"
              >
                <MdCoronavirus
                  className="  text-white
                    h-8 w-8 rounded-full text-center"
                />
              </div>
            </div>
            <motion.section
              variants={cardVariants}
              className="bg-white rounded-3xl p-5  relative
              drop-shadow-2xl 
              m-5 ml-20
              sm:right-1/4 sm:w-5/12 sm:ml-0"
            >
              <div
                className="arrow absolute  h-5 w-5 
                -translate-x-7
                sm:-right-2 translate-y-6 sm:-translate-x-0
                -rotate-45 bg-white"
              ></div>
              <div>
                <div className="details flex flex-col">
                  <span>March 2020</span>
                  <span className="title headerText">Pandemic Started</span>
                </div>
                <div className="bodyText">
                  <li className="ml-5  -indent-6 pl-5">
                    During the start of the pandemic, one of our founders and
                    medical director, Dr. Daryl Del Mundo had problems
                    connecting with her patients during the lockdowns
                  </li>
                  <li className="ml-5  -indent-6 pl-5">
                    She created her own page FB page to reach patients and
                    explored using telemedicine platforms to offer online
                    consultations
                  </li>
                </div>
              </div>
            </motion.section>
          </motion.div>

          {/* Concept Development Card */}
          <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            className="relative row row-span-2 flex 
            sm:justify-center 
              "
          >
            <div className="absolute ">
              <div
                className="absolute bg-orange-450 
                ml-5
                sm:left-1/2 sm:-translate-x-1/2 top-14 sm:ml-0
                h-10 w-10 rounded-full flex items-center justify-center"
              >
                <FaLightbulb
                  className="  text-white
                    h-6 w-6 rounded-full text-center"
                />
              </div>
            </div>
            <motion.section
              variants={cardVariants}
              className="bg-white rounded-3xl p-5  relative 
              drop-shadow-2xl
              m-5 ml-20
              sm:left-1/4 sm:w-5/12 "
            >
              <div
                className="arrow absolute bg-white h-5 w-5 
                -rotate-45 -left-2 translate-y-6  "
              ></div>
              <div className="details flex flex-col">
                <span>April 2020</span>
                <span className="title headerText">Concept Development</span>
              </div>
              <div className="bodyText">
                <li className="ml-5  -indent-6 pl-5">
                  After a month of testing out, Dr. Del Mundo realized the
                  following problems:
                </li>
                <li className="ml-5  -indent-6 pl-16">
                  It can be exhausting for doctors to do the end-to-end
                  processes from marketing, booking and consultation
                </li>
                <li className="ml-5  -indent-6 pl-16">
                  Patients find it difficult to download apps or create log-ins
                  just to see a doctor
                </li>
                <li className="ml-5  -indent-6 pl-5">
                  With the help of her partner and experienced entrepreneur,
                  Rolf Madrid, Dr. Del Mundo found a global and secure
                  telemedicine solution that can help resolve the pain points of
                  both doctors and patients
                </li>
                <li className="ml-5  -indent-6 pl-5">
                  Together with Mr. Madrid’s business partners and marketing
                  professionals, Sheila Grace Moneza and Rodan Robles, they came
                  up with NXTGen E-Clinic
                </li>
              </div>
            </motion.section>
          </motion.div>
        </div>
        {/* our team */}
        <div>Our Team</div>
        {/* mission vision values */}
        <div> </div>
      </div>
    </div>
  );
}
