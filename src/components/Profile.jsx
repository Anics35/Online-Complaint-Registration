import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { motion } from "framer-motion";
import { FaUserAstronaut } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/profile/me`, {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        setError("Failed to load profile. Please login again.");
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <p className="text-red-400 text-center mt-10">{error}</p>;
  }

  if (!user) {
    return <p className="text-center mt-10 text-gray-300 animate-pulse">Loading profile...</p>;
  }

  return (
    <div className="flex justify-center my-10">
      <motion.div
        className="bg-[#05080c] border border-gray-700 p-6 rounded-2xl shadow-2xl w-full max-w-md text-white"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center mb-4">
          <FaUserAstronaut className="text-6xl text-cyan-400 mb-3 animate-bounce" />
          <h2 className="text-2xl font-bold text-cyan-200">Your Profile</h2>
        </div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <ProfileField label="First Name" value={user.firstName} />
          <ProfileField label="Last Name" value={user.lastName} />
          <ProfileField label="Email" value={user.emailId} />
          <ProfileField label="Roll Number" value={user.rollNumber} />
          <ProfileField label="Age" value={user.age} />
          <ProfileField label="Gender" value={user.gender} />
          <ProfileField label="Role" value={user.role} />
        </motion.div>
      </motion.div>
    </div>
  );
};

const ProfileField = ({ label, value }) => (
  <div className="bg-gray-800 rounded-xl px-4 py-3 shadow hover:shadow-lg transition duration-200">
    <p className="text-sm text-gray-400">{label}</p>
    <p className="text-lg font-semibold text-gray-100">{value}</p>
  </div>
);

export default Profile;
