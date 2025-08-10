import React from "react";
import CountUp from "react-countup";

export default function Count() {
  return (
    <div className="bg-white font-sevillana px-4 sm:px-8">
      <h1 className="text-center font-bold text-2xl sm:text-3xl md:text-4xl pb-10 sm:pb-16 md:pb-20">
        Our Services Throughout The World
      </h1>

      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6">
        <div className="px-6 sm:px-8 md:px-12 py-6 sm:py-8 md:py-10 bg-white shadow rounded-lg w-full sm:w-auto text-center">
          <h3 className="font-sevillana text-4xl sm:text-5xl md:text-6xl pb-3 flex items-center justify-center">
            <CountUp start={0} end={800} duration={5} delay={0} />+
          </h3>
          <p className="font-sevillana text-gray-500 text-lg sm:text-xl">
            Active Students
          </p>
        </div>

        <div className="px-6 sm:px-8 md:px-12 py-6 sm:py-8 md:py-10 bg-white shadow rounded-lg w-full sm:w-auto text-center">
          <h3 className="font-sevillana text-4xl sm:text-5xl md:text-6xl pb-3 flex items-center justify-center">
            <CountUp start={0} end={1500} duration={5} delay={0} />+
          </h3>
          <p className="font-sevillana text-gray-500 text-lg sm:text-xl">
            Assignments Created
          </p>
        </div>

        <div className="px-6 sm:px-8 md:px-12 py-6 sm:py-8 md:py-10 bg-white shadow rounded-lg w-full sm:w-auto text-center">
          <h3 className="font-sevillana text-4xl sm:text-5xl md:text-6xl pb-3 flex items-center justify-center">
            <CountUp start={0} end={1200} duration={5} delay={0} />+
          </h3>
          <p className="font-sevillana text-gray-500 text-lg sm:text-xl">
            Assignment Submitted
          </p>
        </div>

        <div className="px-6 sm:px-8 md:px-12 py-6 sm:py-8 md:py-10 bg-white shadow rounded-lg w-full sm:w-auto text-center">
          <h3 className="font-sevillana text-4xl sm:text-5xl md:text-6xl pb-3 flex items-center justify-center">
            <CountUp start={0} end={950} duration={5} delay={0} />+
          </h3>
          <p className="font-sevillana text-gray-500 text-lg sm:text-xl">
            Assignment Reviewed
          </p>
        </div>
      </div>
    </div>
  );
}
