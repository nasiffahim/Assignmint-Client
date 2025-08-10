import React from "react";
import { motion } from "framer-motion";
import MainBanner from "../../assets/banner.webp";
import Banner1 from "../../assets/banner1.webp";
import Banner2 from "../../assets/banner2.webp";
import Banner3 from "../../assets/banner3.webp";
import Banner4 from "../../assets/banner4.webp";
import Banner5 from "../../assets/banner5.webp";
import { Link } from "react-router";

const floating = {
  animate: {
    y: [0, 20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
const floating2 = {
  animate: {
    y: [20, 0, 20],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const sliding = {
  animate: {
    x: [0, 20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function Banner() {
  return (
    <div className="hero bg-[#1B0C4D] h-fit lg:min-h-screen relative overflow-hidden">
      <div className="hero-content flex-col-reverse lg:flex-row-reverse relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-0">
        
        {/* Images Container */}
        <div className="flex-1 relative min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] w-full lg:pl-[100px]">
          {/* Mobile Layout */}
          <div className="block lg:hidden">
            {/* Main central image for mobile */}
            <motion.img
              src={MainBanner}
              {...floating2}
              className="w-48 h-48 sm:w-60 sm:h-60 rounded-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-xl z-10 will-change-transform"
            />
            {/* Smaller decorative images around main image for mobile */}
            <motion.img
              src={Banner1}
              {...sliding}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover absolute top-4 left-4 shadow-xl z-20 will-change-transform"
            />
            <motion.img
              src={Banner3}
              {...floating}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover absolute bottom-4 left-8 shadow-xl z-20 will-change-transform"
            />
            <motion.img
              src={Banner4}
              {...sliding}
              className="w-18 h-18 sm:w-22 sm:h-22 rounded-full object-cover absolute top-8 right-4 shadow-xl z-20 will-change-transform"
            />
            <motion.img
              src={Banner5}
              {...floating}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover absolute bottom-8 right-8 shadow-xl z-20 will-change-transform"
            />
            <motion.img
              src={Banner2}
              {...floating2}
              className="w-16 h-16 sm:w-18 sm:h-18 rounded-full object-cover absolute top-20 right-12 shadow-xl z-10 will-change-transform"
            />
            {/* Background circles for mobile */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 absolute rounded-full top-12 left-12 shadow-xl z-0 bg-[#3a277b]"></div>
            <div className="w-24 h-24 sm:w-28 sm:h-28 absolute rounded-full bottom-12 right-4 shadow-xl z-0 bg-[#3a277b]"></div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block">
            {/* Image 1 */}
            <motion.img
              src={Banner1}
              {...sliding}
              className="w-40 h-40 rounded-full object-cover absolute top-0 left-20 shadow-xl z-20 will-change-transform"
            />
            {/* Image 2 */}
            <motion.img
              src={MainBanner}
              {...floating2}
              className="w-[350px] h-[350px] rounded-full object-cover absolute top-20 left-40 shadow-xl z-10 will-change-transform"
            />
            {/* Image 3 */}
            <motion.img
              src={Banner3}
              {...floating}
              className="w-36 h-36 rounded-full object-cover absolute top-80 left-15 shadow-xl z-20 will-change-transform"
            />
            {/* Image 4 */}
            <motion.img
              src={Banner4}
              {...sliding}
              className="w-30 h-30 rounded-full object-cover absolute bottom-10 left-120 shadow-xl z-20 will-change-transform"
            />
            <motion.img
              src={Banner5}
              {...floating}
              className="w-30 h-30 rounded-full object-cover absolute top-0 left-100 shadow-xl z-20 will-change-transform"
            />
            <motion.img
              src={Banner2}
              {...floating2}
              className="w-28 h-28 rounded-full object-cover absolute top-107 left-80 shadow-xl z-10 will-change-transform"
            />
            <div className="w-28 h-28 absolute rounded-full top-50 left-20 shadow-xl z-0 bg-[#3a277b]"></div>
            <div className="w-40 h-40 absolute rounded-full top-0 left-55 shadow-xl z-0 bg-[#3a277b]"></div>
            <div className="w-60 h-60 absolute rounded-full top-40 left-100 shadow-xl z-0 bg-[#3a277b]"></div>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1 font-sevillana text-white text-center lg:text-left mt-8 lg:mt-0">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 lg:mb-10">
            <span className="text-yellow-200">Assign</span>Mint
          </h1>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">A Fresh Take on Group Study</h2>
          <p className="py-4 lg:py-6 text-sm sm:text-base px-4 lg:px-0">
            Assignment Review Service in the World. Looking for help from other
            students and get review on your assignment.
          </p>
          <Link to="/assignments">
            <button className="btn bg-[#8EA3A6] hover:bg-[#7a8f92] rounded-lg font-bold mt-6 lg:mt-15 cursor-pointer px-6 py-3 transition-colors duration-200">
              Explore All Assignments
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}