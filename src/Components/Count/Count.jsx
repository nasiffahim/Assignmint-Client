import React from "react";
import CountUp from "react-countup";

export default function Count() {
  return (
    <div className="bg-white font-sevillana">
      <h1 className="text-center font-bold text-4xl pb-20">Our Services Throughout The World</h1>
      <div className="flex justify-center items-center gap-6">
        <div className="px-12 py-10 bg-white">
          <h3 className="font-sevillana text-6xl pb-3 flex items-center justify-center">
            <CountUp start={0} end={800} duration={5} delay={0} />+
          </h3>
          <p className='font-sevillana text-gray-500 text-xl'>Active Students</p>
        </div>

        <div className="px-12 py-10 bg-white ">
          <h3 className="font-sevillana text-6xl pb-3 flex items-center justify-center">
            <CountUp start={0} end={1500} duration={5} delay={0} />+
          </h3>
          <p className='font-sevillana text-gray-500 text-xl'>Assignments Created</p>
        </div>

        <div className="px-12 py-10 bg-white ">
          <h3 className="font-sevillana text-6xl pb-3 flex items-center justify-center">
            <CountUp start={0} end={1200} duration={5} delay={0} />+
          </h3>
          <p className='font-sevillana text-gray-500 text-xl'>Assignment Submitted</p>
        </div>

        <div className="px-12 py-10 bg-white ">
          <h3 className="font-sevillana text-6xl pb-3 flex items-center justify-center">
            <CountUp start={0} end={950} duration={5} delay={0} />+
          </h3>
          <p className='font-sevillana text-gray-500 text-xl'>Assignment Reviewed</p>
        </div>
      </div>
    </div>
  );
}
