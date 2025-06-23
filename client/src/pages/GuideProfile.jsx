import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosConfig";
import { api } from "../utils/api";

const GuideProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/auth/me");
        setProfile(response.data);
        setFormData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load profile. Please try again later.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      const response = await axiosInstance.put(
        "/auth/update-profile",
        formData
      );
      setProfile(response.data);
      setIsEditing(false);
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">My Profile</h1>
      {profile && (
        <div className="card">
          <div className="card-body text-center">
            <img
              src={
                api + profile.profileImage || "https://via.placeholder.com/150"
              }
              alt={profile.name}
              className="img-fluid rounded-circle mb-3"
              style={{ width: "150px" }}
            />
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    value={formData.location || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Rate per Hour</label>
                  <input
                    type="number"
                    className="form-control"
                    name="ratePerHour"
                    value={formData.ratePerHour || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Availability</label>
                  <select
                    className="form-control"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                  >
                    <option value={true}>Available</option>
                    <option value={false}>Not Available</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-success me-2">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <h3>{profile.name}</h3>
                <p>Email: {profile.email}</p>
                <p>Role: {profile.role}</p>
                <p>Location: {profile.location || "Not specified"}</p>
                <p>Rate per Hour: ${profile.ratePerHour || "N/A"}</p>
                <p>Availability: {profile.availability ? "Yes" : "No"}</p>
                <p>Joined: {new Date(profile.date).toLocaleDateString()}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GuideProfile;
