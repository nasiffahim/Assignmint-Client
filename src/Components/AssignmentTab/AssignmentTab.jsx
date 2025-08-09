import React from "react";
import { Link } from "react-router";

export default function AssignmentTab({ data }) {
  const recentAssignments = [...data]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  return (
    <div className="bg-[#1B0C4D]">
      <div className=" border-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto block bg-white z-0"
          style={{ verticalAlign: "top" }}
        >
          <path
            fill="#1B0C4D"
            fill-opacity="1"
            d="M0,128L48,144C96,160,192,192,288,170.7C384,149,480,75,576,74.7C672,75,768,149,864,154.7C960,160,1056,96,1152,80C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="w-11/12 mx-auto py-10 font-sevillana relative z-10">
        <h1 className="text-center text-4xl font-extrabold mb-16 text-white">
          Recently Created Assignments
        </h1>
        <div className="grid grid-cols-4 gap-6">
          {recentAssignments.map((assignment, index) => (
            <div key={index}>
              <div className="rounded-xl overflow-hidden mb-4">
                <img
                  src={assignment.photo}
                  className="w-full h-40 object-cover rounded"
                />
              </div>

              <div className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4 p-3 bg-white">
                <h2 className="text-lg font-semibold mt-2 truncate">
                  {assignment.title}
                </h2>
                <p className="text-sm text-gray-600 truncate">
                  {assignment.description}
                </p>
                <div className="mt-2 text-sm">
                  <p>
                    <strong>Difficulty:</strong> {assignment.difficulty}
                  </p>
                  <p>
                    <strong>Marks:</strong> {assignment.marks}
                  </p>
                  <p>
                    <strong>Due:</strong>{" "}
                    {new Date(assignment.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link to="/assignments" className="flex justify-center items-center py-10">
          <button className="btn bg-white text-xl rounded">View More</button>
        </Link>
      </div>
      <div className="bg-[#1B0C4D]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="white"
            fill-opacity="1"
            d="M0,192L48,165.3C96,139,192,85,288,90.7C384,96,480,160,576,160C672,160,768,96,864,85.3C960,75,1056,117,1152,133.3C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
