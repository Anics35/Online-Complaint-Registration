import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const ActionBox = ({ complaintId }) => {
  const [status, setStatus] = useState("resolved");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submitAction = async () => {
    if (!note) {
      setError("Note is required.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${BASE_URL}/complaint/update/${complaintId}`,
        { status, note },
        { withCredentials: true }
      );
      setMessage(res.data?.message || "Action submitted successfully.");
      setError("");
      setNote("");
    } catch (err) {
      setError(err?.response?.data?.error || "Error submitting action");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded-md shadow-sm bg- my-4">
      <h3 className="text-lg font-semibold mb-2">Take Action</h3>

      <div className="mb-2">
        <label className="block font-medium">Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="pending">Pending</option>
          <option value="under review">Under Review</option>
          <option value="resolved">Resolved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="mb-2">
        <label className="block font-medium">Note:</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="border rounded w-full px-2 py-1"
          rows="3"
        />
      </div>

      <button
        onClick={submitAction}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Action"}
      </button>

      {message && <p className="text-green-600 mt-2">{message}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default ActionBox;
