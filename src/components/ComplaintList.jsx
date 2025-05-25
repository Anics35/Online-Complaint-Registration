import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import ActionBox from "./ActionBox";
import { motion, AnimatePresence } from "framer-motion";

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [actions, setActions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openSections, setOpenSections] = useState({});
  const user = useSelector((state) => state.user.user);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/complaint/list`, {
        withCredentials: true,
      });
      const complaintsData = res.data;
      setComplaints(complaintsData);

      const actionsResponses = await Promise.all(
        complaintsData.map((complaint) =>
          axios.get(`${BASE_URL}/action/get-action/${complaint._id}`, {
            withCredentials: true,
          })
        )
      );

      const actionsMap = {};
      complaintsData.forEach((complaint, index) => {
        actionsMap[complaint._id] = actionsResponses[index].data;
      });
      setActions(actionsMap);
    } catch (err) {
      setError(err?.response?.data || "Error fetching complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const groupByStatus = (complaints) => {
    return complaints.reduce((acc, complaint) => {
      const status = complaint.status || "Unknown";
      if (!acc[status]) acc[status] = [];
      acc[status].push(complaint);
      return acc;
    }, {});
  };

  const groupedComplaints = groupByStatus(complaints);

  const toggleSection = (status) => {
    setOpenSections((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
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
                        <p>
                          <span className="font-medium text-cyan-200">
                            Status:
                          </span>{" "}
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

                        {complaint.notes && (
                          <div className="mt-4">
                            <p className="font-semibold text-cyan-200">
                              Notes:
                            </p>
                            <p>{complaint.notes}</p>
                          </div>
                        )}

                        {complaint.attachments &&
                          complaint.attachments.length > 0 && (
                            <div className="mt-4">
                              <p className="font-semibold text-cyan-200">
                                Attachments:
                              </p>
                              <div className="flex flex-wrap gap-3 mt-2">
                                {complaint.attachments.map((fileObj, index) => {
                                  const url = fileObj.url;
                                  const isImage = /\.(jpg|jpeg|png|gif)$/i.test(
                                    url
                                  );
                                  const fullUrl =
                                    url.startsWith("http") ||
                                    url.startsWith("blob:")
                                      ? url
                                      : `${BASE_URL}${
                                          url.startsWith("/") ? "" : "/"
                                        }${url}`;

                                  return isImage ? (
                                    <a
                                      key={index}
                                      href={fullUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="block"
                                    >
                                      <img
                                        src={fullUrl}
                                        alt={`Attachment ${index + 1}`}
                                        className="w-32 h-32 object-cover rounded border border-cyan-700 hover:scale-105 transition"
                                      />
                                    </a>
                                  ) : (
                                    <a
                                      key={index}
                                      href={fullUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="block text-blue-400 underline hover:text-blue-200"
                                    >
                                      📎 Attachment {index + 1}
                                    </a>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                        {actions[complaint._id]?.length > 0 && (
                          <div className="mt-4">
                            <p className="font-semibold text-cyan-200">
                              Actions Taken:
                            </p>
                            {actions[complaint._id].map((action) => (
                              <div
                                key={action._id}
                                className="bg-[#26445d] p-3 rounded-md mb-2"
                              >
                                <p>
                                  <span className="font-medium">Status:</span>{" "}
                                  {action.status}
                                </p>
                                <p>
                                  <span className="font-medium">By:</span>{" "}
                                  {action.actionTakenBy.firstName} (
                                  {action.actionTakenBy.role})
                                </p>
                                <p>
                                  <span className="font-medium">Note:</span>{" "}
                                  {action.note}
                                </p>
                                {action.meetingDetails && (
                                  <p>
                                    <span className="font-medium">
                                      Meeting:
                                    </span>{" "}
                                    {new Date(
                                      action.meetingDetails.datetime
                                    ).toLocaleString()}{" "}
                                    ({action.meetingDetails.location})
                                  </p>
                                )}
                                <p className="text-xs text-gray-400">
                                  {new Date(action.createdAt).toLocaleString()}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {user?.role === "panel" && (
                          <div className="mt-4">
                            <ActionBox complaintId={complaint._id} />
                          </div>
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
