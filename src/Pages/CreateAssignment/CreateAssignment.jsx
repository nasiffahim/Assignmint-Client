import React, { use } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthContext";

export default function CreateAssignment() {
  const { user } = use(AuthContext);
  console.log(user);
  const [dueDate, setDueDate] = useState(null);

  const handleCreateAssignment = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const assignmentData = Object.fromEntries(formData.entries());
    assignmentData.dueDate = dueDate?.toISOString();

    assignmentData.createdBy = {
      name: user.displayName,
      email: user.email,
    };

    assignmentData.createdAt = new Date().toISOString();

    console.log(assignmentData);

    axios
      .post("https://online-group-study-server-eosin.vercel.app/create-assignment", assignmentData)
      .then((res) => {
        const data = res.data;
        console.log("Data added successfully", data);
        if (data.insertedId) {
          Swal.fire({
            title: "Assignment Created Successfully",
            icon: "success",
            draggable: true,
          });
          form.reset();
          setDueDate(null);
        }
      })
      .catch((error) => {
        console.error("Failed to add assignment", error);
      });
  };

  return (
    <div>
      <svg
        className="bg-[#1B0C4D]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="white"
          fill-opacity="1"
          d="M0,160L48,160C96,160,192,160,288,138.7C384,117,480,75,576,80C672,85,768,139,864,138.7C960,139,1056,85,1152,85.3C1248,85,1344,139,1392,165.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      <div
        className="relative min-h-screen bg-white bg-center flex items-center justify-center px-4 py-10 -mt-32 font-sevillana"
        //   style={{ backgroundImage: `url(${FormBg})` }}
      >
        {/* Content wrapper */}
        <div className="relative z-10 w-full max-w-4xl">
          <h1 className="text-3xl font-extrabold text-center mb-2">
            Add Your Assignments Here!!!
          </h1>
          <p className="text-sm text-center mb-6">
            Share your assignments with other students, get answers and reviews
            on your assignments by others
          </p>

          <form
            onSubmit={handleCreateAssignment}
            className="rounded-2xl p-6 bg-white/50 backdrop-blur-sm shadow-lg space-y-6"
          >
            <fieldset className="p-2">
              <label className="text-base font-semibold">Assigment Title</label>
              <input
                type="text"
                name="title"
                className="input w-full rounded-lg bg-white"
                placeholder="Title"
                required
              />
            </fieldset>

            <fieldset className="p-2">
              <label className="text-base font-semibold">
                Assignment Photo URL
              </label>
              <input
                type="text"
                name="photo"
                className="input w-full rounded-lg bg-white"
                placeholder="Photo URL"
                required
              />
            </fieldset>

            <fieldset className="p-2 flex flex-col">
              <label className="text-base font-semibold">
                Assignment Due Date
              </label>
              <DatePicker
                selected={dueDate}
                onChange={(date) => setDueDate(date)}
                className="input w-full rounded-lg bg-white"
                placeholderText="Select a date"
                dateFormat="yyyy-MM-dd"
                required
              />
            </fieldset>

            <fieldset className="p-2">
              <label className="text-base font-semibold">
                Assignment Description
              </label>
              <textarea
                name="description"
                className="p-2 bg-white w-full rounded-lg border-2 border-gray-300"
                placeholder="Description"
                rows={4}
                required
              ></textarea>
            </fieldset>

            <div className="grid grid-cols-2 gap-4">
              <fieldset className="p-2">
                <label className="text-base font-semibold">
                  Difficulty Level
                </label>
                <select
                  name="difficulty"
                  className="w-full p-2 bg-white rounded-lg border-2 border-gray-300"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </fieldset>

              <fieldset className="p-2">
                <label className="text-base font-semibold">
                  Assignment Marks
                </label>
                <input
                  type="number"
                  min="0"
                  name="marks"
                  className="w-full bg-white p-2 rounded border-2 border-gray-300"
                  required
                />
              </fieldset>
            </div>

            <div className="flex justify-center">
              <input
                type="submit"
                className=" px-6 py-2 bg-black text-white text-xl font-semibold rounded cursor-pointer"
                value="Add Assignment"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
