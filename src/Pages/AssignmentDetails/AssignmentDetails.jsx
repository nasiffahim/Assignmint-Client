import { set } from "date-fns";
import React, { use, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import SubmitModal from "../SubmitModal/SubmitModal";
import { AuthContext } from "../../Provider/AuthContext";
import Swal from "sweetalert2";

export default function AssignmentDetails() {
  const { id } = useParams();
  const { user } = use(AuthContext);
  const [assignment, setAssignment] = useState(null);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);

  console.log(user);

  const handleSubmit = (formData) => {
    const submissionData = {
      assignmentId: id,
      email: user?.email,
      googleDocLink: formData.googleDocLink,
      quickNote: formData.quickNote,
      status: "pending",
      submittedAt: new Date().toISOString(),
    };

    console.log("Submitting assignment:", submissionData);

    fetch("https://online-group-study-server-eosin.vercel.app/submitted-assignment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Assignment Submitted Successfully",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          setSubmitModalOpen(false);
        });
      })
      .catch((err) => {
        console.error("Submission failed:", err);
      });
  };

  useEffect(() => {
    fetch(`https://online-group-study-server-eosin.vercel.app/assignments`)
      .then((res) => res.json())
      .then((data) => {
        const assignmentData = data.find(
          (assignment) => assignment?._id === id
        );
        setAssignment(assignmentData);
        console.log("Assignment data:", assignmentData);
      })
      .catch((err) => {
        console.error("Error fetching assignment details:", err);
      });
  }, [id]);

  const { title, photo, description, dueDate, createdBy, createdAt, marks } =
    assignment || {};

  return (
    <div className="bg-white min-h-screen">
      <div className="w-11/12 mx-auto font-sevillana">
        {/* Mobile-first responsive layout */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start p-3 sm:p-5 gap-6 lg:gap-8">
          
          {/* Main Assignment Content */}
          <div className="w-full lg:w-[70%] space-y-4 lg:space-y-3">
            <h1 className="text-xl sm:text-2xl font-bold leading-tight">
              <span className="font-extrabold">Assignment: </span>
              {title}
            </h1>
            
            <img
              src={photo}
              alt="Assignment"
              className="w-full h-[40vh] sm:h-[50vh] lg:h-[70vh] object-cover rounded-xl"
            />
            
            <div className="space-y-2">
              <p className="font-bold text-base sm:text-lg">What to do?</p>
              <p className="text-sm sm:text-base leading-relaxed"># {description}</p>
            </div>
            
            <div className="space-y-2 text-sm sm:text-base">
              <p>
                <span className="font-bold">Assignment Marks: </span>
                {marks}
              </p>
              <p>
                <span className="font-bold">Assignment Deadline: </span>
                {dueDate ? new Date(dueDate).toISOString().split("T")[0] : "N/A"}
              </p>
            </div>
          </div>

          {/* Creator Info and Action Section */}
          <div className="w-full lg:w-[30%] flex flex-col space-y-6">
            
            {/* Creator Information */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
              <h2 className="font-bold text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6 text-center">
                Assignment Created By:
              </h2>
              
              <div className="space-y-2 text-sm sm:text-base">
                <p>
                  <span className="font-bold">Name: </span>
                  {createdBy?.name}
                </p>
                <p>
                  <span className="font-bold">Email: </span>
                  <span className="break-all">{createdBy?.email}</span>
                </p>
                <p>
                  <span className="font-bold">Created At: </span>
                  {createdAt
                    ? new Date(createdAt).toISOString().split("T")[0]
                    : "N/A"}
                </p>
              </div>
            </div>

            {/* Action Section */}
            <div className="bg-gradient-to-br from-[#1B0C4D] to-[#2D1B69] p-4 sm:p-6 rounded-xl text-white text-center">
              <h2 className="font-bold text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6 leading-tight">
                Interested in taking the Assignment?
              </h2>
              
              <button
                onClick={() => setSubmitModalOpen(true)}
                className="px-6 py-3 rounded-lg bg-white text-[#1B0C4D] font-semibold hover:bg-gray-100 transition-colors duration-200 text-sm sm:text-base w-full sm:w-auto"
              >
                Take Assignment
              </button>
            </div>
          </div>
        </div>

        <SubmitModal
          isOpen={submitModalOpen}
          onClose={() => setSubmitModalOpen(false)}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}