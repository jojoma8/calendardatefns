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

  return (
    <div className="  mt-10  overflow-x-hidden ">
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
    </div>
  );
}
