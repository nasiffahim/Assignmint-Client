import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthContext";

const MyAssignments = () => {
  const { user } = useContext(AuthContext);
  const [myAssignments, setMyAssignments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch submitted assignments for the user
        const submittedRes = await axios.get(
          `https://online-group-study-server-eosin.vercel.app/my-submitted-assignments?email=${user.email}`
        );
        const submittedAssignments = submittedRes.data;

        // 2. Fetch all assignments
        const allAssignmentsRes = await axios.get(
          `https://online-group-study-server-eosin.vercel.app/assignments`
        );
        const allAssignments = allAssignmentsRes.data;

        // 3. Merge submitted assignment with full assignment info
        const merged = submittedAssignments.map((sub) => {
          const fullAssignment = allAssignments.find(
            (a) => a._id === sub.assignmentId
          );
          return {
            ...sub,
            assignmentInfo: fullAssignment || {},
          };
        });

        setMyAssignments(merged);
      } catch (error) {
        console.error("Error loading assignments:", error);
      }
    };

    if (user?.email) {
      fetchData();
    }
  }, [user?.email]);

  return (
    <div className="overflow-x-auto bg-white pb-20">
      <div className="w-11/12 mx-auto font-sevillana">
        <h2 className="text-2xl font-semibold text-center my-10">
          My Submitted Assignments
        </h2>
        <table className="table-auto w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Title</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Total Marks</th>
              <th className="border p-2">Obtained Marks</th>
              <th className="border p-2">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {myAssignments.map((a) => (
              <tr key={a._id}>
                <td className="border p-2">
                  {a.assignmentInfo?.title || "Untitled"}
                </td>
                <td className="border p-2 capitalize text-center">{a.status}</td>
                <td className="border p-2 text-center">
                  {a.assignmentInfo?.marks ?? "N/A"}
                </td>
                <td className="border p-2 text-center">{a.obtainedMark ?? "Pending"}</td>
                <td className="border p-2 text-center">{a.feedback ?? "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAssignments;
