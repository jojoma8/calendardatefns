import React from "react";

import Image from "next/image";
import FooterLinks from "./FooterLinks";

import { FaFacebookF, FaInstagram, FaFacebookMessenger } from "react-icons/fa";
import FooterIcon from "./FooterIcon";

const Footer = () => {
  return (
    <footer className="bg-blue-10 p-12 mt-10 flex flex-col">
      <div>
        {/* left section */}
        <div
          className="flex flex-col items-center justify-items-center
              "
        >
          {/* logo */}
          <div>
            <Image
              className="cursor-pointer"
              src="https://nxtgeneclinic.com.ph/wp-content/uploads/2021/08/NXTgen-logo-horizontal-1536x540.png"
              width={150}
              height={60}
              layout="fixed"
              alt="logo"
            />
          </div>
          {/* text */}
          <div className="bodyText flex  items-center text-center mt-5 ">
            <div>
              NXTgen E-clinic makes telemedicine more accessible to Filipinos by
              offering video consultations with our specialists through an
              easy-to-use platform.
            </div>
          </div>
          {/* icons */}
          <div className="flex mt-5">
            <FooterIcon Icon={FaFacebookF} />
            <FooterIcon Icon={FaFacebookMessenger} />
            <FooterIcon Icon={FaInstagram} />
          </div>
        </div>
        {/* right section */}
        <div className="flex flex-col items-center text-center ">
          {/* navigation */}
          <div>
            {/* heading */}
            <div
              className="headerText mb-5 mt-5
              "
            >
              Navigation
            </div>
            {/* menu */}
            <div className="flex flex-col items-center justify-items-center">
              <FooterLinks name={"Home"} href={"/"} />
              <FooterLinks name={"About"} href={"/about"} />
              <FooterLinks name={"Our Doctors"} />
              <FooterLinks name={"FAQ"} />
              <FooterLinks name={"Terms of Use"} />
              <FooterLinks name={"Book an Appointment"} />
            </div>
          </div>
          {/* specialisation */}
          <div>
            {/* header */}
            <div className="headerText mb-5 mt-5">Specializations</div>
            {/* specializations list */}
            <div className="flex flex-col items-center justify-items-center">
              <FooterLinks name={"Dermatology"} href={"#Dermatology"} />
              <FooterLinks
                name={"Otorhinolaryngology - Head and Neck Surgery (ENT)"}
                href={"#Otorhinolaryngology - Head and Neck Surgery (ENT)"}
              />
              <FooterLinks name={"Family Medicine"} href={"#Family Medicine"} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
