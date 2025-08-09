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
    <div className="hero bg-[#1B0C4D] min-h-screen relative overflow-hidden">
      <div className="hero-content flex-col lg:flex-row-reverse relative z-10 w-11/12 mx-auto m-0 p-0">
        <div className="flex-1 pl-[100px] relative min-h-[400px]">
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

        {/* Text Content */}
        <div className="flex-1 font-sevillana text-white">
          <h1 className="text-6xl font-bold mb-10">
            <span className="text-yellow-200">Assign</span>Mint
          </h1>
          <h2 className="text-3xl font-bold">A Fresh Take on Group Study</h2>
          <p className="py-6 text-base">
            Assignment Review Service in the World. Looking for help from other
            students and get review on your assignment.
          </p>
          <Link to="/assignments">
            <button className="btn bg-[#8EA3A6] rounded-lg font-bold mt-15 cursor-pointer">
              Explore All Assignments
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
