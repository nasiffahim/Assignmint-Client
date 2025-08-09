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
      dueDate: dueDate ? dueDate.toISOString() : null, // Changed from duedate to dueDate
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
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] p-8 rounded-2xl shadow-2xl"
        style={{
          background: `#d4c7ff`,
        }}
      >
        <button
          className="absolute top-3 right-8 text-4xl text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
          onClick={onClose}
        >
          ×
        </button>

        <form onSubmit={handleSubmit} className="space-y-3">

          <div>
            <label className="block text-base font-semibold text-gray-800 mb-2">
              Assignment Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              className="w-full p-3 border-0 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="Assignment Title"
            />
          </div>

          <div>
            <label className="block text-base font-semibold text-gray-800 mb-2">
              Assignment Photo
            </label>
            <input
              type="text"
              name="photo"
              value={formData.photo || ""}
              onChange={handleChange}
              className="w-full p-3 border-0 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="Photo URL"
            />
          </div>

          <div>
            <label className="block text-base font-semibold text-gray-800 mb-2">
              Assignment Due Date
            </label>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              className="w-full p-3 border-0 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
              wrapperClassName="w-full"
              placeholderText="Select a date"
              dateFormat="yyyy-MM-dd"
            />
          </div>

          <div>
            <label className="block text-base font-semibold text-gray-800 mb-2">
              Assignment Description
            </label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border-0 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
              placeholder="Assignment Description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-base font-semibold text-gray-800 mb-3">
                Difficulty Level
              </label>
              <select
                name="difficulty"
                className="w-full p-3 border-0 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
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
              <label className="block text-base font-semibold text-gray-800 mb-3">
                Assignment Marks
              </label>
              <input
                type="number"
                name="marks"
                value={formData.marks || ""}
                onChange={handleChange}
                className="w-full p-3 border-0 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Total Marks"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 bg-black text-white font-semibold rounded hover:bg-gray-800 transition-colors shadow-lg cursor-pointer"
            >
              Update Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
