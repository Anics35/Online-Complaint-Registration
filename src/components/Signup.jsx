import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    rollNumber: "",
    age: "",
    gender: "male",
    role: "student",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      await axios.post(BASE_URL + "/signup", formData, {
        withCredentials: true,
      });
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Signup</h2>

          {["firstName", "lastName", "emailId", "password", "rollNumber", "age"].map((field) => (
            <label className="form-control w-full max-w-xs my-1" key={field}>
              <div className="label">
                <span className="label-text capitalize">{field}</span>
              </div>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          ))}

          {/* Gender */}
          <label className="form-control w-full max-w-xs my-1">
            <div className="label">
              <span className="label-text">Gender</span>
            </div>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="select select-bordered"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </label>

          {/* Role */}
          <label className="form-control w-full max-w-xs my-1">
            <div className="label">
              <span className="label-text">Role</span>
            </div>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="select select-bordered"
            >
              <option value="student">Student</option>
              <option value="staff">Staff</option>
              <option value="panel">Panel</option>
            </select>
          </label>

          <p className="text-red-500">{error}</p>

          <div className="card-actions justify-center mt-3">
            <button className="btn btn-primary" onClick={handleSignup}>
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;