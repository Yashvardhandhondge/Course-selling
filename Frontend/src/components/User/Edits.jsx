import React, { useState, useMemo } from "react";
import { userAPI } from "../../services/userAPI";
import { useNavigate } from "react-router-dom";
import { compressImage } from "../../utlis/imageCompressionHelper";

function EditUserProfile() {
  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    image: '',
    password: ''
  });
  const navigate = useNavigate();
  const token = useMemo(() => localStorage.getItem('token'), []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressedImage = await compressImage(file);
        setFormData({ ...formData, image: compressedImage });
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const updatedData = { ...formData };
    if (!formData.password) delete updatedData.password; 

    try {
      await userAPI.updateUser(updatedData, token);
      navigate("/user/profile");
    } catch (e) {
      console.error("Error updating user data:", e);
    }
  };

  return (
    <div className="edit-user-profile h-screen">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSave}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={formData.firstname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditUserProfile;
