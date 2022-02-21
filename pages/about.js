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
  return (
    <div>
      <div className="absolute -z-10 ">
        <Image src={aboutImage} alt={`NXTgen e-clinic about us`} />
      </div>
      <div
        id="test"
        className="md:px-28 lg:px-40 px-10 md:w-4/5 w-full 
            pt-20 lg:pt-0"
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
      <div className="flex flex-col items-center justify-center mt-48">
        {/* our story */}
        <div className="headerText text-4xl">Our Story</div>
        <div className="wrapper  max-w-4xl mx-auto p-5">
          <div
            className="center-line absolute bg-orange-450 h-5/6 w-1 left-1/2
            translate-x-1/2 "
          ></div>

          <div className="row row-span-1 flex justify-start">
            <section
              className="bg-white rounded-3xl p-5 w-5/12 relative
              shadow-xl"
            >
              <div
                className="absolute bg-orange-450 -right-20 translate-x-4
                -translate-y-2
                h-10 w-10 rounded-full flex items-center justify-center"
              >
                <MdCoronavirus
                  className="  text-white
                    h-8 w-8 rounded-full text-center"
                />
              </div>
              <div
                className="arrow absolute bg-white h-5 w-5 -right-2
                -rotate-45 "
              ></div>
              <div className="details flex flex-col">
                <span>March 2020</span>
                <span className="title headerText">Pandemic Started</span>
              </div>
              <div className="bodyText">
                <li className="ml-5  -indent-6 pl-5">
                  During the start of the pandemic, one of our founders and
                  medical director, Dr. Daryl Del Mundo had problems connecting
                  with her patients during the lockdowns
                </li>
                <li className="ml-5  -indent-6 pl-5">
                  She created her own page FB page to reach patients and
                  explored using telemedicine platforms to offer online
                  consultations
                </li>
              </div>
            </section>
          </div>
          <div className="row row-span-2 flex justify-end">
            <section className="bg-white rounded-3xl p-5 w-5/12 shadow-xl">
              <div
                className="absolute bg-orange-450 left-1/2 -translate-x-4
                translate-y-4
                h-10 w-10 rounded-full flex items-center justify-center"
              >
                <FaLightbulb
                  className="  text-white
                    h-6 w-6 rounded-full text-center"
                />
              </div>
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
            </section>
          </div>
        </div>
        {/* our team */}
        <div>Our Team</div>
        {/* mission vision values */}
        <div> </div>
      </div>
    </div>
  );
}
