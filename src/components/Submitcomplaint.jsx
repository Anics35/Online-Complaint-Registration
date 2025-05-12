import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SubmitComplaint = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Updated the URL to match your backend
      const response = await axios.post(
        "http://localhost:3018/complaint/submit",  // Updated URL
        { title, description, category },
        { withCredentials: true }
      );
      setSuccess("Complaint submitted successfully!");
      setTimeout(() => navigate("/profile"), 1500);  // Redirect after success
    } catch (err) {
      setError("Failed to submit complaint. Please try again.");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Submit Complaint</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control my-2">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-bordered"
                required
              />
            </div>

            <div className="form-control my-2">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <div className="card-actions justify-center m-2">
              <button type="submit" className="btn btn-primary">
                Submit Complaint
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitComplaint;
