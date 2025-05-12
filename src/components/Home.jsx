import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue from-blue-50 to-purple-100 text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
        Online Complaint & Redressal System
      </h1>
      <p className="text-lg md:text-xl text-amber-50 max-w-xl mb-8">
        Submit, track, and resolve complaints effortlessly. Join us to make a better campus.
      </p>
      <div className="flex space-x-4">
        <Link to="/login">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">Login</button>
        </Link>
        <Link to="/signup">
          <button className="px-6 py-2 bg-white text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition">
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
