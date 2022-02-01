import React, { useState } from "react";

import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import plainT from "../assets/plainT.png";
import { useSignInContext } from "../contextProvider/SignInContext";

// Product Placeholder
// Normally this is an API Call to pull data from db
const product = {
  id: "1",
  name: "Plain White T's",
  description: "Your Everyday White T-Shirt",
  price: 250.0,
  stock: 15,
};

export default function PaymongoHome() {
  const [quantity, setQuantity] = useState(0);
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
  } = useSignInContext();

  // Add to Cart Placeholder
  // Normally this is an API Call to push data to the db and updating the cart
  // We simulate this by saving to local storage
  const AddToCart = (product, quantity) => {
    if (quantity > 0) {
      const cartItems = [];
      cartItems.push({
        product,
        quantity,
      });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      //   router.push("/cart");
      setPaymongoModal(false);
      setCartModal(true);
    }
  };

  return (
    <div
      className="flex fixed pb-60 md:px-0 bg-gray-200 min-h-screen items-center
            justify-center z-50 bg-opacity-90 w-screen"
      onClick={() => {
        setPaymongoModal(false);
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
          {/* <Header subtitle="Product Page" /> */}
          <section className={styles.grid}>
            <div className={styles.productCard}>
              <div className={styles.productImage}>
                <Image src={plainT} alt={`${product.name} image`} />
              </div>
              <div>
                <div className={styles.productInfo}>
                  <h2>{product.name} </h2>
                  <p className={styles.description}>{product.description}</p>
                  <p className={styles.price}>Php {product.price}</p>
                </div>
                {/* <div className={styles.productOrder}> */}
                <div>
                  <h3>Order Now</h3>
                  <p>{product.stock} units available</p>
                  {/* <div className={styles.quantityContainer}> */}
                  <div className="flex justify-between m-5">
                    <button
                      className="btn"
                      onClick={() => {
                        if (quantity > 0) {
                          setQuantity(quantity - 1);
                        }
                      }}
                      disabled={quantity <= 0}
                    >
                      -
                    </button>
                    <p>{quantity}</p>
                    <button
                      className="btn"
                      onClick={() => {
                        if (quantity < product.stock) {
                          setQuantity(quantity + 1);
                        }
                      }}
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                  <div className="flex items-center justify-evenly">
                    <button
                      className="btn"
                      onClick={() => {
                        AddToCart(product, quantity);
                      }}
                      // className={styles.addCart}
                      disabled={quantity == 0}
                    >
                      Add to Cart &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
