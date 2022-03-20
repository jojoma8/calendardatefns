import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useAuth } from "../firebase";
import { useSignInContext } from "../contextProvider/SignInContext";
// import emailjs from "@emailjs/browser";

export const ContactUs = () => {
  const currentUser = useAuth();
  const form = useRef();
  const { contactUsModal, setContactUsModal } = useSignInContext();

  // const sendEmail = (e) => {
  //   e.preventDefault();

  //   emailjs
  //     .sendForm(
  //       "service_w1g7uoe",
  //       "template_c6t7lfj",
  //       form.current,
  //       "user_ptFNd2SoErGmvqdW0b6kI"
  //     )
  //     .then(
  //       (result) => {
  //         console.log(result.text);
  //       },
  //       (error) => {
  //         console.log(error.text);
  //       }
  //     );
  // };

  async function handleOnSubmit(e) {
    e.preventDefault();

    // temporarily disabled
    // const formData = {};
    // Array.from(e.currentTarget.elements).forEach((field) => {
    //   if (!field.name) return;
    //   formData[field.name] = field.value;
    // });
    // fetch("/api/mail", {
    //   // fetch("/api/sms", {
    //   method: "post",
    //   body: JSON.stringify(formData),
    // });
    // console.log(formData);

    const data = new FormData(e.target);
    const form = Object.fromEntries(data.entries());
    console.log(form);
    emailjs
      .send(
        "service_w1g7uoe",
        "template_c6t7lfj",
        form,
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
  }

  return (
    // <form ref={form} onSubmit={sendEmail}>
    // <form method="post" ref={form} onSubmit={handleOnSubmit}>
    //   <div className="flex flex-col">
    //     <label className="headerText text-lg">Your Name</label>
    //     <input
    //       type="text"
    //       name="user_name"

    //       className="border-2 border-gray-300 text-lg p-2"
    //       defaultValue={currentUser?.displayName}
    //     />
    //     <label className="headerText text-lg">Your Email</label>
    //     <input
    //       type="email"
    //       name="user_email"
    //       className="border-2 border-gray-300 text-lg p-2"
    //       defaultValue={currentUser?.email}
    //     />
    //     <label className="headerText text-lg">Message</label>
    //     <textarea
    //       name="message"
    //       className="border-2 border-gray-300 text-lg p-2"
    //     />
    //     <div className="flex justify-evenly mt-5">
    //       <input type="submit" value="Send" className="btn w-44 " />
    //       <button
    //         className="btnCancel w-44 "
    //         onClick={(e) => {
    //           e.preventDefault();
    //           setContactUsModal(false);
    //         }}
    //       >
    //         Cancel
    //       </button>
    //       <button
    //         className="btn w-44 "
    //         // onClick={(e) => {
    //         //   e.preventDefault();
    //         //   setContactUsModal(false);
    //         // }}
    //       >
    //         SenMail
    //       </button>
    //     </div>
    //   </div>
    // </form>
    <form method="post" ref={form} onSubmit={handleOnSubmit}>
      <div className="flex flex-col">
        <label className="headerText text-lg">Your Name</label>
        <input
          type="text"
          name="name"
          className="border-2 border-gray-300 text-lg p-2"
          defaultValue={currentUser?.displayName}
        />
        <label className="headerText text-lg">Your Email</label>
        <input
          type="email"
          name="email"
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
            onClick={(e) => {
              e.preventDefault();
              setContactUsModal(false);
            }}
          >
            Cancel
          </button>
          <button
            className="btn w-44 "
            // onClick={(e) => {
            //   e.preventDefault();
            //   setContactUsModal(false);
            // }}
          >
            SendMail
          </button>
        </div>
      </div>
    </form>
  );
};
