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
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  console.log(user);

  // Check if assignment is bookmarked
  const checkBookmarkStatus = () => {
    if (!user?.email) return;
    
    fetch(`https://online-group-study-server-eosin.vercel.app/bookmarks/check/${id}?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setIsBookmarked(data.isBookmarked);
      })
      .catch((err) => {
        console.error("Error checking bookmark status:", err);
      });
  };

  // Toggle bookmark
  const handleBookmarkToggle = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Not Logged In",
        text: "Please log in to bookmark assignments",
      });
      return;
    }

    setBookmarkLoading(true);

    if (isBookmarked) {
      // Remove bookmark
      fetch(`https://online-group-study-server-eosin.vercel.app/bookmarks/${id}?email=${user.email}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          setIsBookmarked(false);
          setBookmarkLoading(false);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Bookmark Removed",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          console.error("Error removing bookmark:", err);
          setBookmarkLoading(false);
          Swal.fire({
            icon: "error",
            title: "Failed to remove bookmark",
            text: "Please try again later",
          });
        });
    } else {
      // Add bookmark
      const bookmarkData = {
        assignmentId: id,
        userEmail: user.email,
        assignmentTitle: assignment?.title,
        assignmentPhoto: assignment?.photo,
        assignmentMarks: assignment?.marks,
        assignmentDueDate: assignment?.dueDate,
        bookmarkedAt: new Date().toISOString(),
      };

      fetch("https://online-group-study-server-eosin.vercel.app/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookmarkData),
      })
        .then((res) => res.json())
        .then((data) => {
          setIsBookmarked(true);
          setBookmarkLoading(false);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Assignment Bookmarked!",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          console.error("Error adding bookmark:", err);
          setBookmarkLoading(false);
          Swal.fire({
            icon: "error",
            title: "Failed to bookmark",
            text: "Please try again later",
          });
        });
    }
  };

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

  // Fetch comments
  const fetchComments = () => {
    setLoadingComments(true);
    fetch(`https://online-group-study-server-eosin.vercel.app/assignments/${id}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
        setLoadingComments(false);
      })
      .catch((err) => {
        console.error("Error fetching comments:", err);
        setLoadingComments(false);
      });
  };

  // Handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Empty Comment",
        text: "Please write a comment before submitting",
      });
      return;
    }

    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Not Logged In",
        text: "Please log in to post a comment",
      });
      return;
    }

    setSubmittingComment(true);

    const commentData = {
      assignmentId: id,
      userEmail: user.email,
      userName: user.displayName || "Anonymous",
      userPhoto: user.photoURL || "",
      comment: newComment,
      createdAt: new Date().toISOString(),
    };

    fetch("https://online-group-study-server-eosin.vercel.app/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Comment Posted!",
          showConfirmButton: false,
          timer: 1500,
        });
        setNewComment("");
        fetchComments(); // Refresh comments
        setSubmittingComment(false);
      })
      .catch((err) => {
        console.error("Comment submission failed:", err);
        Swal.fire({
          icon: "error",
          title: "Failed to post comment",
          text: "Please try again later",
        });
        setSubmittingComment(false);
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

    // Fetch comments when component mounts
    fetchComments();
    
    // Check bookmark status
    checkBookmarkStatus();
  }, [id, user]);

  const { title, photo, description, dueDate, createdBy, createdAt, marks } =
    assignment || {};

  return (
    <div className="bg-white min-h-screen">
      <div className="w-11/12 mx-auto font-sevillana">
        {/* Mobile-first responsive layout */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start p-3 sm:p-5 gap-6 lg:gap-8">
          
          {/* Main Assignment Content */}
          <div className="w-full lg:w-[70%] space-y-4 lg:space-y-3">
            {/* Title with Bookmark Button */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <h1 className="text-xl sm:text-2xl font-bold leading-tight flex-1">
                <span className="font-extrabold">Assignment: </span>
                {title}
              </h1>
              
              {/* Bookmark Button */}
              <button
                onClick={handleBookmarkToggle}
                disabled={bookmarkLoading}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 border-2 ${
                  isBookmarked
                    ? "bg-[#1B0C4D] text-white border-[#1B0C4D]"
                    : "bg-white text-[#1B0C4D] border-[#1B0C4D] hover:bg-gray-50"
                } disabled:opacity-50 disabled:cursor-not-allowed self-start sm:self-auto`}
                title={isBookmarked ? "Remove Bookmark" : "Bookmark Assignment"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill={isBookmarked ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                <span className="text-sm sm:text-base font-semibold">
                  {bookmarkLoading ? "..." : isBookmarked ? "Saved" : "Save"}
                </span>
              </button>
            </div>
            
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

            {/* Comments Section */}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl mt-6">
              <h2 className="font-bold text-lg sm:text-xl mb-4">
                Comments ({comments.length})
              </h2>

              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B0C4D] resize-none"
                    rows="3"
                    disabled={submittingComment}
                  />
                  <button
                    type="submit"
                    disabled={submittingComment}
                    className="px-6 py-3 bg-[#1B0C4D] text-white rounded-lg hover:bg-[#2D1B69] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed h-fit"
                  >
                    {submittingComment ? "Posting..." : "Post Comment"}
                  </button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {loadingComments ? (
                  <p className="text-center text-gray-500">Loading comments...</p>
                ) : comments.length === 0 ? (
                  <p className="text-center text-gray-500">No comments yet. Be the first to comment!</p>
                ) : (
                  comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                    >
                      <div className="flex items-start gap-3">
                        {/* User Avatar */}
                        <div className="flex-shrink-0">
                          {comment.userPhoto ? (
                            <img
                              src={comment.userPhoto}
                              alt={comment.userName}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-[#1B0C4D] flex items-center justify-center text-white font-bold">
                              {comment.userName?.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>

                        {/* Comment Content */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-bold text-sm sm:text-base">
                              {comment.userName}
                            </p>
                            <span className="text-xs text-gray-500">
                              {new Date(comment.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm sm:text-base text-gray-700">
                            {comment.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
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