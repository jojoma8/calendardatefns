import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import SliderBtn from "./SliderBtn";
import { sliderData } from "./sliderData";
import { wrap } from "popmotion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Slider() {
  const [slideIndex, setSlideIndex] = useState(1);
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, sliderData.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const nextSlide = () => {
    if (slideIndex !== sliderData.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === sliderData.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(sliderData.length);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  // const nextSlide = () => {
  //   const activeSlide = document.querySelector(".slide.translate-x-0");
  //   activeSlide.classList.remove("translate-x-0");
  //   activeSlide.classList.add("-translate-x-full");

  //   const nextSlide = activeSlide.nextElementSibling;
  //   nextSlide.classList.remove("translate-x-full");
  //   nextSlide.classList.add("translate-x-0");
  // };

  // const previousSlide = () => {
  //   const activeSlide = document.querySelector(".slide.translate-x-0");
  //   activeSlide.classList.remove("translate-x-0");
  //   activeSlide.classList.add("translate-x-full");

  //   const previousSlide = activeSlide.previousElementSibling;
  //   previousSlide.classList.remove("-translate-x-full");
  //   previousSlide.classList.add("translate-x-0");
  // };

  return (
    <div className="  mt-10   ">
      <div className="flex  items-center justify-center  ">
        <div className="flex-grow  h-80 max-w-5xl m-5">
          <div
            className="relative 
            
           "
          >
            {sliderData.map((obj, index) => {
              return (
                <AnimatePresence initial={false} custom={direction}>
                  {page === index && (
                    <motion.div
                      key={index}
                      className={`absolute bg-blue-10 rounded-3xl 
                      p-10 h-64 font-serif translate-x-0
                      text-lg leading-loose italic 
                      
                  `}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                      }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={1}
                      onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeConfidenceThreshold) {
                          paginate(1);
                          // nextSlide();
                        } else if (swipe > swipeConfidenceThreshold) {
                          paginate(-1);
                          // prevSlide();
                        }
                      }}
                    >
                      {obj.title}
                    </motion.div>
                  )}
                </AnimatePresence>
              );
            })}
          </div>
        </div>
      </div>
      {/* <SliderBtn moveSlide={nextSlide} direction={"next"} />
      <SliderBtn moveSlide={prevSlide} direction={"prev"} /> */}
      <div className="flex items-center justify-center">
        {Array.from({ length: sliderData.length }).map((item, index) => (
          <div
            // onClick={() => moveDot(index + 1)}
            className={` mt-5
          ${
            // slideIndex === index + 1
            page === index
              ? "h-3 w-3 m-2 rounded-full border-2 bg-sky-200"
              : "h-3 w-3 m-2 rounded-full border-2 bg-gray-550"
          }`}
          ></div>
        ))}
      </div>
      {/* <div className="flex items-center justify-center relative max-w-5xl m-5">
        <Carousel
          showStatus={false}
          showThumbs={false}
          autoPlay
          infiniteLoop
          interval={5000}
        >
          {sliderData.map((obj, index) => {
            return (
              <div
                className={` bg-blue-10 rounded-3xl p-10 h-64 font-serif 
            text-lg leading-loose italic text-gray-500 text-left
            `}
              >
                {obj.title}
              </div>
            );
          })}
        </Carousel>
      </div> */}
      {/* <div className="relative mb-96">
        <div className="absolute inset-0 w-screen h-48 bg-pink-500 text-white flex items-center justify-center text-5xl transition-all ease-in-out duration-1000 transform translate-x-0 slide">
          Hello
        </div>
        <div className="absolute inset-0 w-screen h-48 bg-purple-500 text-white flex items-center justify-center text-5xl transition-all ease-in-out duration-1000 transform translate-x-full slide">
          There
        </div>
        <div className="absolute inset-0 w-screen h-48 bg-teal-500 text-white flex items-center justify-center text-5xl transition-all ease-in-out duration-1000 transform translate-x-full slide">
          Booya!
        </div>
        <div
          onclick={() => nextSlide()}
          className="cursor-pointer fixed top-40 right-0 bg-red-500 w-16 h-16 flex items-center justify-center text-black"
        >
          &#x276F;
        </div>
        <div
          onclick={() => previousSlide()}
          className="cursor-pointer fixed top-40 right-0 bg-red-200 w-16 h-16 mr-16 border-r border-gray-400 flex items-center justify-center text-black"
        >
          &#x276E;
        </div>
      </div> */}
    </div>
  );
}
