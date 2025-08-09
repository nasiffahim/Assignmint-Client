import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthContext";
import Swal from "sweetalert2";

const PendingAssignments = () => {
  const { user } = useContext(AuthContext);
  const [pending, setPending] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [combined, setCombined] = useState([]);

  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [mark, setMark] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      try {
        const [pendingRes, assignmentsRes] = await Promise.all([
          axios.get(
            `https://online-group-study-server-eosin.vercel.app/pending-assignments?examiner=${user.email}`
          ),
          axios.get("https://online-group-study-server-eosin.vercel.app/assignments"),
        ]);

        setPending(pendingRes.data);
        setAssignments(assignmentsRes.data);

        const enriched = pendingRes.data.map((p) => {
          const matched = assignmentsRes.data.find(
            (a) => a._id === p.assignmentId
          );
          return {
            ...p,
            title: matched?.title || "Untitled",
            marks: matched?.marks || "N/A",
            createdBy: matched?.createdBy || {},
          };
        });

        setCombined(enriched);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData();
  }, [user?.email]);

  const handleSubmitMark = async () => {
    if (!mark) {
      return Swal.fire("Error", "Please provide a mark", "error");
    }

    try {
      await axios.patch(
        `https://online-group-study-server-eosin.vercel.app/submitted-assignments/${selectedAssignment._id}`,
        {
          obtainedMark: parseFloat(mark),
          feedback,
        }
      );

      Swal.fire("Success", "Marked successfully!", "success");

      // Optionally remove marked item from list
      setCombined(
        combined.filter((item) => item._id !== selectedAssignment._id)
      );

      // Reset modal state
      setSelectedAssignment(null);
      setMark("");
      setFeedback("");
    } catch (error) {
      console.error("Error submitting mark:", error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="overflow-x-auto bg-white pb-20">
      <div className="w-11/12 mx-auto font-sevillana">
        <h2 className="text-2xl font-semibold text-center my-10">
          Pending Assignments
        </h2>
        {combined.length === 0 ? (
          <p className="text-2xl font-semibold text-center my-10">
            No pending assignments to evaluate.
          </p>
        ) : (
          <table className="table-auto w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Title</th>
                <th className="border p-2">Assignment Answer</th>
                <th className="border p-2">Note</th>
                <th className="border p-2">Marks</th>
                <th className="border p-2">Examinee Email</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {combined.map((item) => (
                <tr key={item._id}>
                  <td className="border p-2">{item.title}</td>
                  <td className="border p-2 text-center">
                    <a
                      href={item.googleDocLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Answer
                    </a>
                  </td>
                  <td className="border p-2 text-center">{item.quickNote}</td>
                  <td className="border p-2 text-center">{item.marks}</td>
                  <td className="border p-2 text-center">{item.email}</td>
                  <td className="border p-2 text-center">
                    {item.email !== user?.email ? (
                      <button
                        onClick={() => setSelectedAssignment(item)}
                        className="btn bg-[#1B0C4D] text-white rounded px-3 py-1 text-sm"
                      >
                        Give Mark
                      </button>
                    ) : (
                      <span
                        className="text-red-500 text-lg"
                        title="You cannot mark your own created assinment"
                      >
                        🚫
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {selectedAssignment && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">Evaluate Assignment</h2>
            <p>
              <strong>Google Doc:</strong>{" "}
              <a
                href={selectedAssignment.googleDocLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Answer
              </a>
            </p>
            <p className="mt-2">
              <strong>Note:</strong> {selectedAssignment.quickNote}
            </p>

            <div className="mt-4">
              <label className="block font-medium mb-1">Marks:</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max={selectedAssignment.marks}
                value={mark}
                onChange={(e) => setMark(e.target.value)}
                className="w-full border rounded px-3 py-1"
              />
            </div>

            <div className="mt-4">
              <label className="block font-medium mb-1">Feedback:</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full border rounded px-3 py-2"
              ></textarea>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setSelectedAssignment(null)}
                className="px-4 py-1 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitMark}
                className="bg-[#1B0C4D] text-white px-4 py-1 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingAssignments;
