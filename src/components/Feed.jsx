import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const Feed = () => {
  const user = useSelector((store) => store.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return <div className="text-center text-xl py-20">Please login to continue.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Welcome, {user.firstName} 👋</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Raise Complaint Button */}
          {user.role === "student" && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/submit-complaint")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg"
            >
              📣 Raise a Complaint
            </motion.button>
          )}

          {/* View Complaints (For all roles) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/complaints")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg"
          >
            📋 View Complaints
          </motion.button>
        </div>

        {/* Panel-specific section */}
        {user.role !== "student" && (
          <div className="mt-10 text-center text-lg text-gray-600">
            You can review complaints and take necessary actions from the <span className="font-medium text-blue-700">Panel Dashboard</span>.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Feed;
