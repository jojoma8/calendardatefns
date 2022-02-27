import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import HeaderIcon from "../HeaderIcon";

export default function SliderBtn({ direction, moveSlide }) {
  return (
    <div>
      <button onClick={moveSlide} className="">
        {direction !== "next" ? (
          <ChevronLeftIcon className="h-5" />
        ) : (
          <ChevronRightIcon className="h-5" />
        )}
      </button>
    </div>
  );
}
