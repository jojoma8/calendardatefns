import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useAuth } from "../firebase";

export const ContactUs = () => {
  const currentUser = useAuth();
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_w1g7uoe",
        "template_c6t7lfj",
        form.current,
        "user_ptFNd2SoErGmvqdW0b6kI"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <div className="flex flex-col">
        <label className="headerText text-lg">Your Name</label>
        <input
          type="text"
          name="user_name"
          className="border-2 border-gray-300 text-lg p-2"
          defaultValue={currentUser?.displayName}
        />
        <label className="headerText text-lg">Your Email</label>
        <input
          type="email"
          name="user_email"
          className="border-2 border-gray-300 text-lg p-2"
          defaultValue={currentUser?.email}
        />
        <label className="headerText text-lg">Message</label>
        <textarea
          name="message"
          className="border-2 border-gray-300 text-lg p-2"
        />
        <div className="flex justify-evenly mt-5">
          <input type="submit" value="Send" className="btn w-44 " />
          <button
            className="btnCancel w-44 "
            onClick={() => {
              setContactUsModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};
