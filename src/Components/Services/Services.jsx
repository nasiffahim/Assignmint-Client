import React from "react";
import { FiEdit } from "react-icons/fi";
import { LuNotebook, LuNotebookText } from "react-icons/lu";
import { TfiCheckBox } from "react-icons/tfi";

export default function Services() {
  return (
    <div className="bg-white text-white pt-10 font-sevillana">
      {/* Top Wave */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#1B0C4D"
          fillOpacity="1"
          d="M0,128L48,128C96,128,192,128,288,149.3C384,171,480,213,576,229.3C672,245,768,235,864,202.7C960,171,1056,117,1152,96C1248,75,1344,85,1392,90.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>

      {/* Content Section */}
      <div className="bg-[#1B0C4D] -mt-1">
        <div className="w-11/12 sm:w-10/12 mx-auto">
          <p className="pl-2 sm:pl-4 text-base sm:text-lg mb-2 sm:mb-4">Best Practices</p>
          <h1 className="pl-2 sm:pl-4 font-extrabold text-2xl sm:text-3xl md:text-4xl mb-10 sm:mb-20">
            Online Assignment Submit & Review
          </h1>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="p-4 border-b-2 sm:border-b-0 sm:border-r-2 border-gray-200">
              <div className="w-12 h-12 mb-4">
                <span className="text-5xl">
                  <LuNotebookText />
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold pt-4 pb-2 border-b-2 border-gray-200">
                Assignment Submission
              </h1>
              <p className="text-sm pt-4 text-justify">
                Login into your account, attempt an ongoing assignment and submit it, everyone
                will be able to review your assignment and mark them.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-4 border-b-2 sm:border-b-0 sm:border-r-2 border-gray-200">
              <div className="w-12 h-12 mb-4">
                <span className="text-5xl">
                  <TfiCheckBox />
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold pt-4 pb-2 border-b-2 border-gray-200">
                Assignment Review
              </h1>
              <p className="text-sm pt-4 text-justify">
                Different students can check your assignments and leave some
                reviews about what to change in your assignment and maybe some
                good feedback.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-4 border-b-2 sm:border-b-0 sm:border-r-2 border-gray-200">
              <div className="w-12 h-12 mb-4">
                <span className="text-5xl">
                  <LuNotebook />
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold pt-4 pb-2 border-b-2 border-gray-200">
                Online Group Session
              </h1>
              <p className="text-sm pt-4 text-justify">
                Discuss the feedback of your assignment left by other students,
                debate whether you are wrong or right, or show your response to
                our answer.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-4">
              <div className="w-12 h-12 mb-4">
                <span className="text-5xl">
                  <FiEdit />
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold pt-4 pb-2 border-b-2 border-gray-200">
                Assignment Fix
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

      {/* Bottom Wave */}
      <div className="bg-[#1B0C4D]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="white"
            fillOpacity="1"
            d="M0,160L48,149.3C96,139,192,117,288,112C384,107,480,117,576,133.3C672,149,768,171,864,176C960,181,1056,171,1152,170.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
