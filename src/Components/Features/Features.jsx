import React from "react";
import Ban1 from "../../assets/ban1.png";
import Ban2 from "../../assets/ban2.png";
import Ban3 from "../../assets/ban3.png";
import Animation1 from "../../../public/animation1.json";
import Animation2 from "../../../public/animation2.json";
import Animation3 from "../../../public/animation3.json";
import Lottie from "lottie-react";


export default function Features() {
  return (
    <div className="bg-white">
      <h1 className="text-5xl font-extrabold font-sevillana pt-10 pb-5 text-center">Assign<span className="text-yellow-300">Mint</span>'s Features</h1>
      <p className="text-lg text-gray-400 font-sevillana pb-10 text-center">Our goal is to help student's around the world in their studies and ease their difficulties by helping in their assignment</p>
      <div>
        <div className="w-8/12 mx-auto grid grid-cols-1">
          <div className="flex justify-between items-center border-b-2 border-gray-200 py-10">
            <div className="w-1/2 flex justify-center items-center border-r-2 border-gray-200">
              <Lottie
                animationData={Animation1}
                loop={true}
                style={{ width: 300, height: 300 }}
              ></Lottie>
            </div>

            <div className="w-1/2 p-10">
              <img src={Ban1} alt="" className="w-14 h-14"/>
              <h1 className="text-xl font-bold font-sevillana mt-6">Assignment Writing</h1>
              <p className="text-sm mt-4 font-lato text-justify">
                Get step-by-step support for writing clear, well-researched, and organized assignments. Whether it's essays, reports, or case studies, our expert guidance helps you understand the topic, plan your structure, and improve your writing skills to produce top-quality academic work.
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center border-b-2 border-gray-200 py-10">
            <div className="w-1/2 p-10">
              <img src={Ban2} alt="" className="w-14 h-14"/>
              <h1 className="text-xl font-bold font-sevillana mt-6">Assignment Review</h1>
              <p className="text-sm mt-4 font-lato text-justify">
                Before submitting your assignment, let our experienced reviewers go through it in detail. We provide constructive feedback on structure, content, grammar, and formatting to ensure your work meets academic standards. Perfect your assignment and boost your chances of scoring higher.
              </p>
            </div>

            <div className="w-1/2 flex justify-center items-center border-l-2 border-gray-200">
              <Lottie
                animationData={Animation2}
                loop={true}
                style={{ width: 300, height: 300 }}
              ></Lottie>
            </div>
          </div>

          <div className="flex justify-between items-center py-10">
            <div className="w-1/2 flex justify-center items-center border-r-2 border-gray-200">
              <Lottie
                animationData={Animation3}
                loop={true}
                style={{ width: 300, height: 300 }}
              ></Lottie>
            </div>

            <div className="w-1/2 p-10">
              <img src={Ban3} alt="" className="w-14 h-16"/>
              <h1 className="text-xl font-bold font-sevillana mt-6">Online Group Session</h1>
              <p className="text-sm mt-4 font-lato text-justify">
                Collaborate and learn in real-time with other students and instructors through live group sessions. These interactive sessions are designed to help you discuss course materials, ask questions, share ideas, and strengthen your understanding through teamwork and guided discussions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
