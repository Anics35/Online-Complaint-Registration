import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue via-blue to-blue">
      <div className="container mx-auto px-6 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-5xl font-bold text-white mb-6"
        >
          Complaint Registration & Redressal System
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto"
        >
          A secure and transparent system for students and staff to report and resolve issues effectively.
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center gap-4"
        >
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-100 transition-all"
          >
            Sign Up
          </Link>
        </motion.div>

        <motion.img
          src="https://upload.wikimedia.org/wikipedia/en/c/c8/Tezpur_University_logo.png"
          alt="Complaint Icon"
          className="w-40 md:w-52 mx-auto mt-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        />
      </div>
    </div>
  );
};

export default Home;