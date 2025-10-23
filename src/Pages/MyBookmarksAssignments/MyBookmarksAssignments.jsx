import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";
import Swal from "sweetalert2";

export default function MyBookmarks() {
  const { user } = useContext(AuthContext);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(null);

  // Fetch user's bookmarks
  const fetchBookmarks = () => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`http://localhost:3000/bookmarks/user/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBookmarks(data.bookmarks || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookmarks:", err);
        setLoading(false);
      });
  };

  // Remove bookmark
  const handleRemoveBookmark = (assignmentId, assignmentTitle) => {
    Swal.fire({
      title: "Remove Bookmark?",
      text: `Do you want to remove "${assignmentTitle}" from your bookmarks?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1B0C4D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setRemoving(assignmentId);

        fetch(`http://localhost:3000/bookmarks/${assignmentId}?email=${user.email}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Bookmark Removed",
              showConfirmButton: false,
              timer: 1500,
            });
            fetchBookmarks(); // Refresh bookmarks
            setRemoving(null);
          })
          .catch((err) => {
            console.error("Error removing bookmark:", err);
            Swal.fire({
              icon: "error",
              title: "Failed to remove bookmark",
              text: "Please try again later",
            });
            setRemoving(null);
          });
      }
    });
  };

  useEffect(() => {
    fetchBookmarks();
  }, [user]);

  // Check if assignment deadline has passed
  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  if (!user) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Required</h2>
          <p className="text-gray-600">Please log in to view your bookmarks</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="w-11/12 mx-auto py-8 font-sevillana">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1B0C4D] mb-2">
            My Bookmarks
          </h1>
          <p className="text-gray-600 text-lg">
            Your saved assignments ({bookmarks.length})
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#1B0C4D]"></div>
          </div>
        ) : bookmarks.length === 0 ? (
          /* Empty State */
          <div className="text-center py-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-32 w-32 mx-auto text-gray-300 mb-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No Bookmarks Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start bookmarking assignments to see them here
            </p>
            <Link
              to="/assignments"
              className="inline-block px-6 py-3 bg-[#1B0C4D] text-white rounded-lg hover:bg-[#2D1B69] transition-colors duration-200 font-semibold"
            >
              Browse Assignments
            </Link>
          </div>
        ) : (
          /* Bookmarks Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((bookmark) => (
              <div
                key={bookmark._id}
                className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Assignment Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={bookmark.assignmentPhoto}
                    alt={bookmark.assignmentTitle}
                    className="w-full h-full object-cover"
                  />
                  {/* Overdue Badge */}
                  {isOverdue(bookmark.assignmentDueDate) && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Overdue
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3">
                  {/* Title */}
                  <h3 className="font-bold text-lg text-gray-800 line-clamp-2">
                    {bookmark.assignmentTitle}
                  </h3>

                  {/* Details */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Marks:</span>
                      <span className="text-[#1B0C4D] font-bold">
                        {bookmark.assignmentMarks}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Due Date:</span>
                      <span className={isOverdue(bookmark.assignmentDueDate) ? "text-red-500 font-semibold" : ""}>
                        {bookmark.assignmentDueDate
                          ? new Date(bookmark.assignmentDueDate).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Bookmarked:</span>
                      <span>
                        {new Date(bookmark.bookmarkedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-3 border-t border-gray-200">
                    <Link
                      to={`/assignment/${bookmark.assignmentId}`}
                      className="flex-1 px-4 py-2 bg-[#1B0C4D] text-white rounded-lg hover:bg-[#2D1B69] transition-colors duration-200 text-center text-sm font-semibold"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() =>
                        handleRemoveBookmark(
                          bookmark.assignmentId,
                          bookmark.assignmentTitle
                        )
                      }
                      disabled={removing === bookmark.assignmentId}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Remove bookmark"
                    >
                      {removing === bookmark.assignmentId ? (
                        <div className="animate-spin h-5 w-5 border-2 border-red-600 border-t-transparent rounded-full"></div>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}