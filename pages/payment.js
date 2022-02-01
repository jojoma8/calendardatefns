import React, { useEffect, useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import styles from "../styles/Payment.module.css";
import Header from "../components/Header";
import CreditCard from "../components/payments/CreditCard";
import GCash from "../components/payments/GCash";
import GrabPay from "../components/payments/GrabPay";
import { useSignInContext } from "../contextProvider/SignInContext";

export default function Payment() {
  const [paymentOption, setPaymentOption] = useState(0);
  const [total, setTotal] = useState(0);
  const [checkoutID, setCheckoutID] = useState("");
  const router = useRouter();

  const {
    signInModal,
    setSignInModal,
    signUpModal,
    setSignUpModal,
    forgotPasswordModal,
    setForgotPasswordModal,
    currentUserID,
    setCurrentUserID,
    setPaymongoModal,
    setCartModal,
    setPaymentModal,
  } = useSignInContext();

  const displayPaymentForm = (paymentOption) => {
    const description = checkoutID;
    if (paymentOption == 0) {
      return <CreditCard amount={total} description={description} />;
    } else if (paymentOption == 1) {
      return <GCash amount={total} description={description} />;
    } else if (paymentOption == 2) {
      return <GrabPay amount={total} description={description} />;
    }
  };

  // Getting the Checkout Information
  useEffect(() => {
    const totalJSON = localStorage.getItem("totalPayment");
    const totalNumber = !!totalJSON ? JSON.parse(totalJSON) : 0;
    setTotal(totalNumber);

    const checkoutIDJSON = localStorage.getItem("checkoutID");
    const checkoutIDString = !!checkoutIDJSON ? JSON.parse(checkoutIDJSON) : "";
    setCheckoutID(checkoutIDString);
  }, []);

  return (
    <div
      className="flex fixed pb-60 md:px-0 bg-gray-200 min-h-screen items-center
          justify-center z-50 bg-opacity-90 w-screen"
      onClick={() => {
        setPaymentModal(false);
      }}
    >
      <div className="container bg-white" onClick={(e) => e.stopPropagation()}>
        {/* <Head>
          <title>Online Store Example</title>
          <meta
            name="description"
            content="Next.js - Paymongo Integration Tutorial"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head> */}

        <main className="main">
          {/* <Header subtitle="Payment Page" /> */}
          {/* <section className={styles.payment}> */}
          <section>
            {/* <div className={styles.paymentHeader}> */}
            <div className="flex justify-between">
              <h1>Select Payment Option</h1>
              <button
                className="btn"
                onClick={() => {
                  //   router.back();
                  setPaymentModal(false);
                  setCartModal(true);
                }}
              >
                Back
              </button>
            </div>

            <form
              onChange={(event) => {
                setPaymentOption(event.target.value);
              }}
              //   className={styles.paymentSelection}
              className="flex flex-wrap"
            >
              <label className={styles.option}>
                <input
                  className={styles.radio}
                  name="paymentOption"
                  type="radio"
                  value={0}
                  defaultChecked
                />
                <span className={styles.optionDetails}>
                  <span className={styles.optionText}>Credit Card</span>
                </span>
              </label>
              <label className={styles.option}>
                <input
                  className={styles.radio}
                  name="paymentOption"
                  type="radio"
                  value={1}
                />
                <span className={styles.optionDetails}>
                  <span className={styles.optionText}>GCash</span>
                </span>
              </label>
              <label className={styles.option}>
                <input
                  className={styles.radio}
                  name="paymentOption"
                  type="radio"
                  value={2}
                />
                <span className={styles.optionDetails}>
                  <span className={styles.optionText}>GrabPay</span>
                </span>
              </label>
            </form>
            <div className={styles.paymentFormsContainer}>
              <div className={styles.paymentInfo}>
                <h2>Payment for ID{checkoutID}</h2>
                <h3>Amount to pay: {total}</h3>
              </div>
              <div className={styles.paymentForm}>
                {displayPaymentForm(paymentOption)}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
