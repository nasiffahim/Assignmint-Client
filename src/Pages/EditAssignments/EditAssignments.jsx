import React, { useEffect, useState } from "react";
import { MdWorkHistory } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

export default function EditAssignments({
  isOpen,
  onClose,
  assignment,
  onSave,
}) {
  const [formData, setFormData] = useState({});
  const [dueDate, setDueDate] = useState(null);

  useEffect(() => {
    if (assignment) {
      setFormData(assignment);

      if (assignment.dueDate) {
        const isoDate = new Date(assignment.dueDate);
        if (!isNaN(isoDate.getTime())) {
          setDueDate(isoDate);
        } else {
          setDueDate(null);
        }
      } else {
        setDueDate(null);
      }
    } else {
      setFormData({});
      setDueDate(null);
    }
  }, [assignment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      dueDate: dueDate ? dueDate.toISOString() : null,
    };

    console.log("Submitting form data:", updatedFormData);

    fetch(`https://online-group-study-server-eosin.vercel.app/assignment/${assignment._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedFormData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Assignment Updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          onSave(updatedFormData);
        }
      })
      .catch((err) => {
        Swal.fire("Error", "Something went wrong while updating", "error");
      });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 sm:p-6 lg:p-8">
      {/* Scrollable container for mobile */}
      <div className="w-full flex items-center justify-center overflow-y-auto">
        <div
          className="relative w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl my-4 sm:my-6 lg:my-8 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-2xl"
          style={{
            background: `#d4c7ff`,
          }}
        >
          {/* Close button - mobile optimized */}
          <button
            className="absolute top-2 right-3 sm:top-3 sm:right-4 lg:right-8 text-2xl sm:text-3xl lg:text-4xl text-gray-700 hover:text-gray-900 transition-colors cursor-pointer z-10 bg-white/20 rounded-full w-8 h-8 sm:w-10 sm:h-10 lg:w-auto lg:h-auto lg:bg-transparent flex items-center justify-center"
            onClick={onClose}
          >
            ×
          </button>

          {/* Modal Header */}
          <div className="mb-4 sm:mb-6 lg:mb-8 pr-8 sm:pr-10 lg:pr-16">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 text-center lg:text-left">
              Edit Assignment
            </h2>
          </div>

          {/* Scrollable form content */}
          <div className="max-h-[calc(100vh-8rem)] sm:max-h-[calc(100vh-12rem)] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 lg:space-y-6">

              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-2">
                  Assignment Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ""}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 border-0 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm placeholder-gray-500 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Assignment Title"
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-2">
                  Assignment Photo
                </label>
                <input
                  type="text"
                  name="photo"
                  value={formData.photo || ""}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 border-0 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm placeholder-gray-500 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Photo URL"
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-2">
                  Assignment Due Date
                </label>
                <div className="w-full">
                  <DatePicker
                    selected={dueDate}
                    onChange={(date) => setDueDate(date)}
                    className="w-full p-2 sm:p-3 border-0 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm placeholder-gray-500 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white/50"
                    wrapperClassName="w-full"
                    placeholderText="Select a date"
                    dateFormat="yyyy-MM-dd"
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-2">
                  Assignment Description
                </label>
                <textarea
                  name="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  rows="3"
                  className="w-full p-2 sm:p-3 border-0 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm placeholder-gray-500 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                  placeholder="Assignment Description"
                />
              </div>

              {/* Grid layout - stacks on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-2">
                    Difficulty Level
                  </label>
                  <select
                    name="difficulty"
                    className="w-full p-2 sm:p-3 border-0 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white/50"
                    value={formData.difficulty || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-2">
                    Assignment Marks
                  </label>
                  <input
                    type="number"
                    name="marks"
                    value={formData.marks || ""}
                    onChange={handleChange}
                    className="w-full p-2 sm:p-3 border-0 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm placeholder-gray-500 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Total Marks"
                  />
                </div>
              </div>

              {/* Submit button */}
              <div className="flex justify-center pt-2 sm:pt-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 bg-black text-white font-semibold text-sm sm:text-base rounded hover:bg-gray-800 transition-colors shadow-lg cursor-pointer"
                >
                  Update Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}