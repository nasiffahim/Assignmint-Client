import React, { useState, useEffect, use } from "react";
import { MdDeleteOutline, MdEdit, MdRemoveRedEye } from "react-icons/md";
import { Link, useLoaderData } from "react-router";
import Swal from "sweetalert2";
import EditAssignments from "../EditAssignments/EditAssignments";
import { AuthContext } from "../../Provider/AuthContext";

export default function Assignments() {
  const { user } = use(AuthContext);
  const data = useLoaderData();
  const [assignments, setAssignments] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    setAssignments(data);
  }, [data]);

  const handleEditClick = (assignment) => {
    setSelectedAssignment(assignment);
    setEditModalOpen(true);
  };

  const handleSave = (updatedAssignment) => {
    setAssignments((prevAssignments) =>
      prevAssignments.map((assignment) =>
        assignment._id === updatedAssignment._id
          ? updatedAssignment
          : assignment
      )
    );
    setEditModalOpen(false);
    setSelectedAssignment(null);
  };

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://online-group-study-server-eosin.vercel.app/assignment/${_id}`,
          { method: "DELETE" }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount && data.deletedCount > 0) {
              setAssignments((prevAssignments) =>
                prevAssignments.filter(
                  (assignment) => assignment._id !== _id
                )
              );
              Swal.fire("Deleted!", "Your Assignment has been deleted.", "success");
            } else {
              Swal.fire("Error", "Failed to delete the assignment", "error");
            }
          })
          .catch(() => {
            Swal.fire("Error", "Something went wrong while deleting", "error");
          });
      }
    });
  };

  return (
    <div className="bg-white">
      <div className="w-11/12 mx-auto py-10 font-sevillana">
        <h1 className="text-center text-3xl sm:text-4xl font-extrabold mb-7">
          All Assignments
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((assignment) => (
            <div key={assignment._id}>
              {/* Image */}
              <div className="rounded-xl overflow-hidden mb-4">
                <figure>
                  <img
                    src={assignment.photo}
                    alt=""
                    className="w-full h-48 sm:h-60 lg:h-[400px] object-cover"
                  />
                </figure>
              </div>

              {/* Card */}
              <div className="rounded-xl bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300 mt-4 border-2 border-gray-300">
                <div className="card-body space-y-1">
                  <h2 className="card-title text-xl sm:text-2xl font-extrabold">
                    {assignment.title}
                  </h2>
                  <p className="text-sm sm:text-base font-extrabold">
                    Difficulty Level:{" "}
                    <span className="font-normal">{assignment.difficulty}</span>
                  </p>
                  <p className="text-sm sm:text-base font-extrabold">
                    Marks: <span className="font-normal">{assignment.marks}</span>
                  </p>

                  <p className="text-sm sm:text-base">
                    <span className="font-bold">Question:</span>{" "}
                    {assignment.description}
                  </p>

                  {/* Buttons */}
                  <div className="card-actions flex flex-wrap justify-center items-center gap-2 mt-4">
                    <Link to={`/assignment/${assignment._id}`}>
                      <div className="p-2 rounded border-2 border-gray-300 cursor-pointer flex items-center gap-1 text-sm sm:text-base">
                        <MdRemoveRedEye />
                        <span>View More</span>
                      </div>
                    </Link>

                    <div
                      onClick={() => handleEditClick(assignment)}
                      className="p-2 rounded border-2 border-gray-300 cursor-pointer flex items-center gap-1 text-sm sm:text-base"
                    >
                      <MdEdit />
                      <span>Edit</span>
                    </div>

                    {assignment.createdBy?.email === user?.email && (
                      <div
                        onClick={() => handleDelete(assignment._id)}
                        className="p-2 rounded border-2 border-gray-300 cursor-pointer flex items-center gap-1 text-sm sm:text-base"
                      >
                        <MdDeleteOutline />
                        <span>Delete</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        <EditAssignments
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          assignment={selectedAssignment}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
