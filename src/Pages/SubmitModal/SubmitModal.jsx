import React, { useState } from "react";

export default function SubmitModal({ isOpen, onClose, onSubmit }) {
  const [googleDocLink, setGoogleDocLink] = useState("");
  const [quickNote, setQuickNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ googleDocLink, quickNote });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg w-[90%] md:w-[40%]">
        <h2 className="text-xl font-bold mb-4 text-center">Submit Assignment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Google Docs Link:</label>
            <input
              type="url"
              required
              value={googleDocLink}
              onChange={(e) => setGoogleDocLink(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="https://docs.google.com/..."
            />
          </div>
          <div>
            <label className="block font-semibold">Quick Note:</label>
            <textarea
              value={quickNote}
              onChange={(e) => setQuickNote(e.target.value)}
              className="w-full border p-2 rounded"
              rows={4}
              placeholder="Write a short note..."
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
