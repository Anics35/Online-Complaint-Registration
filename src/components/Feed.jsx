import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Feed = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (!user) return null;

  const isPanel = user.user?.role === "panel";
console.log("User from Redux:", user);

  const cardData = isPanel
    ? [
      
        {
          title: "View Complaints",
          description: "See all complaints submitted by users.",
          route: "/complaints",
          icon: "📋",
        },
        // {
        //   title: "Add Action",
        //   description: "Take action on submitted complaints.",
        //   route: "/add-action",
        //   icon: "✅",
        // },
      ]
    : [
        {
          title: "Raise Complaint",
          description: "Submit a new complaint to the department.",
          route: "/submit-complaint",
          icon: "✍️",
        },
        {
          title: "View Complaints",
          description: "Track status of your submitted complaints.",
          route: "/complaints",
          icon: "🕵️",
        },
      ];

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-extrabold text-center text-cyan-300 mb-8 tracking-wide">
        🚀 Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {cardData.map((card, index) => (
          <motion.div
            key={card.title}
            className="bg-[#122740] text-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-cyan-500/50 transition duration-300 border border-cyan-700"
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => navigate(card.route)}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{card.title}</h2>
              <motion.span
                className="text-2xl"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                {card.icon}
              </motion.span>
            </div>
            <p className="text-sm text-cyan-100">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Feed;
