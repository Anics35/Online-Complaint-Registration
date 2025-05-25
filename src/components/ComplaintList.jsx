import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import ActionBox from "./ActionBox";
import { motion, AnimatePresence } from "framer-motion";

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openSections, setOpenSections] = useState({});
  const user = useSelector((state) => state.user.user);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/complaint/list`, {
        withCredentials: true,
      });
      setComplaints(res.data);
    } catch (err) {
      setError(err?.response?.data || "Error fetching complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const groupByStatus = (complaints) =>
    complaints.reduce((acc, complaint) => {
      const status = complaint.status || "Unknown";
      if (!acc[status]) acc[status] = [];
      acc[status].push(complaint);
      return acc;
    }, {});

  const groupedComplaints = groupByStatus(complaints);

  const toggleSection = (status) => {
    setOpenSections((prev) => ({ ...prev, [status]: !prev[status] }));
  };

  if (loading)
    return (
      <p className="text-center text-cyan-300 my-10">Loading complaints...</p>
    );
  if (error) return <p className="text-center text-red-500 my-10">{error}</p>;

  return (
    <motion.div
      className="p-6 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-cyan-400">
        📋 Complaint List
      </h2>

      {complaints.length === 0 ? (
        <p className="text-center text-gray-300">No complaints found.</p>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedComplaints).map(([status, group]) => (
            <div key={status}>
              <motion.button
                className="w-full text-xl font-semibold text-left px-4 py-3 rounded-md bg-[#112233] text-cyan-300 shadow-md hover:shadow-cyan-500/50 transition"
                onClick={() => toggleSection(status)}
                whileHover={{ scale: 1.01 }}
              >
                {status} {openSections[status] ? "▲" : "▼"}
              </motion.button>

              <AnimatePresence>
                {openSections[status] && (
                  <motion.div
                    className="grid gap-6 mt-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {group.map((complaint) => (
                      <motion.div
                        key={complaint._id}
                        className="bg-[#1e2d3d] rounded-lg p-6 shadow-lg border border-cyan-700 hover:shadow-cyan-400/50 transition"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h4 className="text-lg font-bold text-cyan-300 mb-2">
                          {complaint.title}
                        </h4>
                        <p>
                          <span className="font-medium text-cyan-200">
                            Category:
                          </span>{" "}
                          {complaint.category}
                        </p>
                        <p>
                          <span className="font-medium text-cyan-200">
                            Description:
                          </span>{" "}
                          {complaint.description}
                        </p>

                        {/* ✅ Attachments preview */}
                     {complaint.attachments?.length > 0 && (
  <div className="mt-4">
    <p className="font-semibold text-cyan-200 mb-2">Attachments:</p>
    <div className="flex flex-wrap gap-4">
      {complaint.attachments.map((file, index) => (
        <div key={index}>
          {file.url.endsWith(".pdf") ? (
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 underline"
            >
              View PDF {index + 1}
            </a>
          ) : (
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              <img
                src={file.url}
                alt={`attachment-${index + 1}`}
                className="w-40 rounded border border-cyan-600 hover:scale-105 transition-transform"
              />
            </a>
          )}
        </div>
      ))}
    </div>
  </div>
)}


                        <p>
                          <span className="font-medium text-cyan-200">Status:</span>{" "}
                          {complaint.status}
                        </p>
                        <p>
                          <span className="font-medium text-cyan-200">
                            Submitted by:
                          </span>{" "}
                          {complaint.submittedBy?.firstName || "Unknown"} (
                          {complaint.submittedBy?.rollNumber || "N/A"})
                        </p>
                        <p className="text-sm text-gray-400">
                          Submitted on:{" "}
                          {new Date(complaint.createdAt).toLocaleString()}
                        </p>

                        {complaint.actions?.length > 0 && (
                          <div className="mt-4">
                            <p className="font-semibold text-cyan-200 mb-2">Actions:</p>
                            {complaint.actions.map((action) => (
                              <div
                                key={action._id}
                                className="border border-cyan-600 rounded p-3 mb-2 bg-[#0f1a26]"
                              >
                                <p>
                                  <span className="font-medium">Status:</span> {action.status}
                                </p>
                                <p>
                                  <span className="font-medium">By:</span>{" "}
                                  {action.actionTakenBy?.firstName || "Unknown"} (
                                  {action.actionTakenBy?.role || "N/A"})
                                </p>
                                <p>
                                  <span className="font-medium">Remarks:</span> {action.remarks}
                                </p>
                                {action.note && (
                                  <p>
                                    <span className="font-medium">Note:</span> {action.note}
                                  </p>
                                )}

                                {action.meetingDetails?.scheduled && (
                                  <div className="mt-2 bg-[#223344] p-2 rounded text-cyan-300">
                                    <p>
                                      <span className="font-semibold">Meeting Scheduled:</span>{" "}
                                      Yes
                                    </p>
                                    <p>
                                      <span className="font-semibold">Date & Time:</span>{" "}
                                      {action.meetingDetails.datetime
                                        ? new Date(action.meetingDetails.datetime).toLocaleString()
                                        : "N/A"}
                                    </p>
                                    <p>
                                      <span className="font-semibold">Location:</span>{" "}
                                      {action.meetingDetails.location || "N/A"}
                                    </p>
                                    {action.meetingDetails.note && (
                                      <p>
                                        <span className="font-semibold">Note:</span>{" "}
                                        {action.meetingDetails.note}
                                      </p>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {(user?.role === "panel" || user?.role === "admin") && (
                          <ActionBox
                            complaintId={complaint._id}
                            onUpdate={fetchComplaints}
                          />
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ComplaintList;
