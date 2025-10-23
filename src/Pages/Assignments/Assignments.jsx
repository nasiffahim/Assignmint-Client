import React, { useState, useEffect, use } from "react";
import { MdDeleteOutline, MdEdit, MdRemoveRedEye, MdSearch, MdFilterList, MdClear } from "react-icons/md";
import { Link, useLoaderData } from "react-router";
import Swal from "sweetalert2";
import EditAssignments from "../EditAssignments/EditAssignments";
import { AuthContext } from "../../Provider/AuthContext";

export default function Assignments() {
  const { user } = use(AuthContext);
  const data = useLoaderData();
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  
  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setAssignments(data);
    setFilteredAssignments(data);
  }, [data]);

  // Apply search and filters
  useEffect(() => {
    let result = [...assignments];

    // Search by title
    if (searchQuery.trim()) {
      result = result.filter((assignment) =>
        assignment.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by difficulty
    if (selectedDifficulty !== "all") {
      result = result.filter(
        (assignment) => assignment.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()
      );
    }

    // Sort
    switch (sortBy) {
      case "title-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "marks-high":
        result.sort((a, b) => b.marks - a.marks);
        break;
      case "marks-low":
        result.sort((a, b) => a.marks - b.marks);
        break;
      case "date-newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "date-oldest":
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      default:
        // Keep original order
        break;
    }

    setFilteredAssignments(result);
  }, [searchQuery, selectedDifficulty, sortBy, assignments]);

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedDifficulty("all");
    setSortBy("default");
  };

  // Check if any filters are active
  const hasActiveFilters = searchQuery || selectedDifficulty !== "all" || sortBy !== "default";

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
        fetch(`https://online-group-study-server-eosin.vercel.app/assignment/${_id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount && data.deletedCount > 0) {
              setAssignments((prevAssignments) =>
                prevAssignments.filter((assignment) => assignment._id !== _id)
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
    <div className="bg-white min-h-screen">
      <div className="w-11/12 mx-auto py-10 font-sevillana">
        <h1 className="text-center text-3xl sm:text-4xl font-extrabold mb-7">
          All Assignments
        </h1>

        {/* Search and Filter Section */}
        <div className="mb-8 bg-gray-50 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
          {/* Search Bar */}
          <div className="relative mb-4">
            <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search assignments by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#1B0C4D] transition-colors"
            />
          </div>

          {/* Filter Toggle Button (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#1B0C4D] text-white rounded-lg mb-4 hover:bg-[#2D1B69] transition-colors"
          >
            <MdFilterList className="text-xl" />
            <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
          </button>

          {/* Filters */}
          <div className={`${showFilters ? "block" : "hidden"} space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-4`}>
            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Difficulty Level
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#1B0C4D] transition-colors"
              >
                <option value="all">All Levels</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#1B0C4D] transition-colors"
              >
                <option value="default">Default</option>
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
                <option value="marks-high">Marks (High to Low)</option>
                <option value="marks-low">Marks (Low to High)</option>
                <option value="date-newest">Newest First</option>
                <option value="date-oldest">Oldest First</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            <div className="flex items-end">
              <button
                onClick={handleClearFilters}
                disabled={!hasActiveFilters}
                className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold border-2 border-red-200"
              >
                <MdClear className="text-xl" />
                <span>Clear Filters</span>
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-300">
            <p className="text-sm text-gray-600 text-center">
              Showing <span className="font-bold text-[#1B0C4D]">{filteredAssignments.length}</span> of{" "}
              <span className="font-bold">{assignments.length}</span> assignments
              {hasActiveFilters && (
                <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  Filters Active
                </span>
              )}
            </p>
          </div>
        </div>

        {/* No Results Message */}
        {filteredAssignments.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Assignments Found</h2>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={handleClearFilters}
              className="px-6 py-3 bg-[#1B0C4D] text-white rounded-lg hover:bg-[#2D1B69] transition-colors font-semibold"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          /* Assignments Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssignments.map((assignment) => (
              <div key={assignment._id}>
                {/* Image */}
                <div className="rounded-xl overflow-hidden mb-4 relative">
                  <figure>
                    <img
                      src={assignment.photo}
                      alt={assignment.title}
                      className="w-full h-48 sm:h-60 lg:h-[400px] object-cover"
                    />
                  </figure>
                  {/* Difficulty Badge */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                        assignment.difficulty.toLowerCase() === "easy"
                          ? "bg-green-500"
                          : assignment.difficulty.toLowerCase() === "medium"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {assignment.difficulty}
                    </span>
                  </div>
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
                        <div className="p-2 rounded border-2 border-gray-300 cursor-pointer flex items-center gap-1 text-sm sm:text-base hover:bg-gray-100 transition-colors">
                          <MdRemoveRedEye />
                          <span>View More</span>
                        </div>
                      </Link>

                      <div
                        onClick={() => handleEditClick(assignment)}
                        className="p-2 rounded border-2 border-gray-300 cursor-pointer flex items-center gap-1 text-sm sm:text-base hover:bg-gray-100 transition-colors"
                      >
                        <MdEdit />
                        <span>Edit</span>
                      </div>

                      {assignment.createdBy?.email === user?.email && (
                        <div
                          onClick={() => handleDelete(assignment._id)}
                          className="p-2 rounded border-2 border-gray-300 cursor-pointer flex items-center gap-1 text-sm sm:text-base hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
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
        )}

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