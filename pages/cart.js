import React, { useEffect, useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import styles from "../styles/Cart.module.css";
import PaymongoHeader from "../components/PaymongoHeader";
import { useSignInContext } from "../contextProvider/SignInContext";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(0);
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

  // Getting the Cart
  useEffect(() => {
    const cartItemsJSON = localStorage.getItem("cartItems");
    const cartItems = !!cartItemsJSON ? JSON.parse(cartItemsJSON) : undefined;
    setCart(cartItems);
  }, []);

  // Updating Total Price
  useEffect(() => {
    if (cart && total == 0) {
      cart.map((item) => {
        setTotal(total + item.quantity * item.product.price);
      });
    }
  }, [cart, total]);

  const ProceedPayment = (total) => {
    localStorage.setItem("totalPayment", JSON.stringify(total));
    localStorage.setItem("checkoutID", JSON.stringify(`${Date.now()}-Guide`));
    // router.push("/payment");
    setCartModal(false);
    setPaymentModal(true);
  };

  return (
    <div
      className="flex fixed pb-60 md:px-0 bg-gray-200 min-h-screen items-center
            justify-center z-50 bg-opacity-90 w-screen"
      onClick={() => {
        setCartModal(false);
      }}
    >
      {/* <div className="container"> */}
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
          {/* <Header subtitle="Cart Page" /> */}
          <section className={styles.cart}>
            {/* <div className={styles.cartHeader}> */}
            <div>
              <h2>Cart</h2>
              <button
                className="btn"
                onClick={() => {
                  //   router.back();
                  setCartModal(false);
                  setPaymongoModal(true);
                }}
              >
                Back
              </button>
            </div>
            {cart ? (
              <ul className={styles.cartList}>
                <li className={styles.cartListLabel}>
                  <p>Product</p>
                  <div>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                  </div>
                </li>
                {cart.map((item, index) => {
                  return (
                    <li key={index}>
                      <p>{item.product.name}</p>
                      <div>
                        <p>Php {item.product.price}</p>
                        <p>{item.quantity}</p>
                        <p>Php {item.product.price * item.quantity}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>Loading..</p>
            )}
            <hr />
            {/* <div className={styles.cartFooter}> */}
            <div className="">
              <button
                className="btn"
                onClick={() => {
                  ProceedPayment(total);
                }}
              >
                Proceed to Payment
              </button>
              <p>
                Total: <span>Php {total}</span>
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
