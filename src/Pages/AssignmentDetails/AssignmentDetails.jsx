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
    <div className="bg-white">
      <div className="w-11/12 mx-auto font-sevillana">
        <div className="flex justify-between items-start p-5 gap-8">
          <div className="w-[70%] space-y-3">
            <h1 className="text-2xl text-bold">
              <span className="font-extrabold">Assignment: </span>
              {title}
            </h1>
            <img
              src={photo}
              alt=""
              className="w-full h-[70vh] object-cover rounded-xl"
            />
            <div>
              <p className="font-bold text-lg">What to do?</p>
              <p># {description}</p>
            </div>
            <p>
              <span className="font-bold">Assignment Marks: </span>
              {marks}
            </p>
            <p>
              <span className="font-bold">Assignment Deadline: </span>
              {dueDate ? new Date(dueDate).toISOString().split("T")[0] : "N/A"}
            </p>
          </div>

          <div className="w-[30%] flex flex-col">
            <h1 className="font-bold text-2xl mb-10 text-center">
              Assignment Created By:
            </h1>
            <p>
              <span className="font-bold">Name: </span>
              {createdBy?.name}
            </p>
            <p>
              <span className="font-bold">Email: </span>
              {createdBy?.email}
            </p>
            <p>
              <span className="font-bold">Created At: </span>
              {createdAt
                ? new Date(createdAt).toISOString().split("T")[0]
                : "N/A"}
            </p>

            <h1 className="font-bold text-3xl text-center pt-50">
              Interested in taking the Assignment?
            </h1>
            <div className="flex justify-center items-center">
              <button
                onClick={() => setSubmitModalOpen(true)}
                className="mt-10 px-4 py-2 rounded-lg bg-[#1B0C4D] text-white w-fit"
              >
                Take Assignmnet
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
