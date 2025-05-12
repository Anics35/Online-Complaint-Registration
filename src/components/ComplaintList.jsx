import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import ActionBox from "./ActionBox";

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = useSelector((state) => state.user);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/complaint/list`, {
        withCredentials: true,
      });
      setComplaints(res.data);
      setLoading(false);
    } catch (err) {
      setError(err?.response?.data || "Error fetching complaints");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  if (loading) return <p className="text-center my-10">Loading complaints...</p>;
  if (error) return <p className="text-center text-red-500 my-10">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Complaint List</h2>
      {complaints.length === 0 ? (
        <p className="text-center">No complaints found.</p>
      ) : (
        <div className="grid gap-4">
          {complaints.map((complaint) => (
            <div key={complaint._id} className="card bg-base-200 shadow-md p-4">
              <h3 className="text-lg font-semibold">{complaint.title}</h3>
              <p><span className="font-medium">Category:</span> {complaint.category}</p>
              <p><span className="font-medium">Description:</span> {complaint.description}</p>
              <p><span className="font-medium">Status:</span> {complaint.status}</p>

              {/* Display who submitted it */}
              <p>
                <span className="font-medium">Submitted by:</span>{" "}
                {complaint.submittedBy?.firstName || "Unknown"}
                
                 (
                {complaint.submittedBy?.rollNumber || "N/A"}
               )
              </p>
              <p className="text-sm text-gray-500">
                Submitted on: {new Date(complaint.createdAt).toLocaleString()}
              </p>

              {user?.role === "panel" && (
                <div className="mt-4">
                  <ActionBox complaintId={complaint._id} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComplaintList;
