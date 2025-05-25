import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { motion } from "framer-motion";

const ActionBox = ({ complaintId }) => {
  const [status, setStatus] = useState("resolved");
  const [note, setNote] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [venue, setVenue] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submitAction = async () => {
    if (!note.trim()) {
      setError("Note is required.");
      return;
    }

    if (status === "under review" && (!meetingDate || !meetingTime || !venue.trim())) {
      setError("Meeting date, time, and venue are required for 'Under Review' status.");
      return;
    }

    const actionData = {
      status,
      note,
      ...(status === "under review" && {
        meeting: {
          date: meetingDate,
          time: meetingTime,
          venue,
        },
      }),
    };

    try {
      setLoading(true);
      const res = await axios.put(
        `${BASE_URL}/complaint/update/${complaintId}`,
        actionData,
        { withCredentials: true }
      );
      setMessage(res.data?.message || "Action submitted successfully.");
      setError("");
      setNote("");
      setMeetingDate("");
      setMeetingTime("");
      setVenue("");
    } catch (err) {
      setError(err?.response?.data?.error || "Error submitting action");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-[#152535] border border-cyan-700 p-4 rounded-lg shadow-md mt-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-cyan-300 text-lg font-bold mb-3">➕ Take Action</h3>

      <div className="mb-3">
        <label className="block text-cyan-200 font-medium mb-1">Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full bg-[#1e2d3d] text-white border border-cyan-700 rounded px-3 py-2 focus:outline-none"
        >
          <option value="pending">Pending</option>
          <option value="under review">Under Review</option>
          <option value="resolved">Resolved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="block text-cyan-200 font-medium mb-1">Note:</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full bg-[#1e2d3d] text-white border border-cyan-700 rounded px-3 py-2 resize-none focus:outline-none"
          rows="3"
        />
      </div>

      {status === "under review" && (
        <div className="space-y-3 mb-4">
          <div>
            <label className="block text-cyan-200 font-medium mb-1">
              Meeting Date:
            </label>
            <input
              type="date"
              value={meetingDate}
              onChange={(e) => setMeetingDate(e.target.value)}
              className="w-full bg-[#1e2d3d] text-white border border-cyan-700 rounded px-3 py-2 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-cyan-200 font-medium mb-1">
              Meeting Time:
            </label>
            <input
              type="time"
              value={meetingTime}
              onChange={(e) => setMeetingTime(e.target.value)}
              className="w-full bg-[#1e2d3d] text-white border border-cyan-700 rounded px-3 py-2 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-cyan-200 font-medium mb-1">
              Venue:
            </label>
            <input
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="w-full bg-[#1e2d3d] text-white border border-cyan-700 rounded px-3 py-2 focus:outline-none"
              placeholder="e.g., Dept. Conference Room"
            />
          </div>
        </div>
      )}

      <button
        onClick={submitAction}
        disabled={loading}
        className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-4 py-2 rounded transition disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Action"}
      </button>

      {message && <p className="mt-3 text-green-400 font-medium">{message}</p>}
      {error && <p className="mt-3 text-red-400 font-medium">{error}</p>}
    </motion.div>
  );
};

export default ActionBox;
