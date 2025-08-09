import React from "react";
import { FiEdit } from "react-icons/fi";
import { LuNotebook, LuNotebookText } from "react-icons/lu";
import { TfiCheckBox } from "react-icons/tfi";

export default function Services() {
  return (
    <div className="bg-white text-white pt-10 font-sevillana">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#1B0C4D"
          fill-opacity="1"
          d="M0,128L48,128C96,128,192,128,288,149.3C384,171,480,213,576,229.3C672,245,768,235,864,202.7C960,171,1056,117,1152,96C1248,75,1344,85,1392,90.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      <div className="bg-[#1B0C4D] -mt-1">
        <div className="w-10/12 mx-auto">
          <p className="pl-4 text-lg mb-4">Best Practices</p>
          <h1 className="pl-4 font-extrabold text-4xl mb-20">
            Online Assignment Submit & Review
          </h1>

          <div className="flex justify-between items-center gap-4">
            <div className="border-r-2 border-gray-200 p-4 w-[25%]">
              <div className="w-12 h-12 mb-4">
                <span className="text-5xl font-base">
                  <LuNotebookText />
                </span>
              </div>

              <h1 className="text-xl font-bold pt-4 pb-2 border-b-2 border-gray-200">
                Assignment Submission
              </h1>
              <p className="text-sm pt-4 text-justify">
                Login into your account, attempt an ongoing assignment and submit it, everyone
                will be able to review your assignment and mark them
              </p>
            </div>
            <div className="border-r-2 border-gray-200 p-4 w-[25%]">
              <div className="w-12 h-12 mb-4">
                <span className="text-5xl font-base">
                  <TfiCheckBox />
                </span>
              </div>

              <h1 className="text-xl font-bold pt-4 pb-2 border-b-2 border-gray-200">
                Assignment Review
              </h1>
              <p className="text-sm pt-4 text-justify">
                Different students can check your assignments and leave some
                reviews about what to change in you assignment and maybe some
                good feedback
              </p>
            </div>
            <div className="border-r-2 border-gray-200 p-4 w-[25%]">
              <div className="w-12 h-12 mb-4">
                <span className="text-5xl font-base">
                  <LuNotebook />
                </span>
              </div>

              <h1 className="text-xl font-bold pt-4 pb-2 border-b-2 border-gray-200">
                Online Group Session
              </h1>
              <p className="text-sm pt-4 text-justify">
                Disscuss the feedback of your assignment left by other students,
                debate whether you are wrong or write or show your response for
                our answer
              </p>
            </div>
            <div className="p-4 w-[25%]">
              <div className="w-12 h-12 mb-4">
                <span className="text-5xl font-base">
                  <FiEdit />
                </span>
              </div>

              <h1 className="text-xl font-bold pt-4 pb-2 border-b-2 border-gray-200">
                Assinment Fix
              </h1>
              <p className="text-sm pt-4 text-justify">
                You can edit your assignment if you feel the answer you gave is
                not correct or the review others provided is also feasible or
                maybe right!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#1B0C4D]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="white"
            fill-opacity="1"
            d="M0,160L48,149.3C96,139,192,117,288,112C384,107,480,117,576,133.3C672,149,768,171,864,176C960,181,1056,171,1152,170.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
