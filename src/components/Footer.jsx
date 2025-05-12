import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaGithub, FaEnvelope, FaUniversity } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-base-200 text-base-content py-6 mt-12 border-t border-gray-300"
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="font-bold text-lg">CSE Complaint Portal</p>
          <p className="text-sm">© {new Date().getFullYear()} Tezpur University. All rights reserved.</p>
        </div>

        <div className="flex gap-6 text-xl">
          <a
            href="mailto:sahaanirban278@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://www.tezu.ernet.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-600 transition-colors"
          >
            <FaUniversity />
          </a>
          <a
            href="https://github.com/anics35"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
