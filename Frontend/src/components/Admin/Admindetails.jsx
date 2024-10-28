import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../../services/adminApi';
import { compressImage } from '../../utlis/imageCompressionHelper';
function Admindetails() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    image: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await adminAPI.getAdmin(token);
          setProfile(response.data.admin);
          setFormData({
            email: response.data.admin.email,
            firstname: response.data.admin.firstname,
            lastname: response.data.admin.lastname,
            image: response.data.admin.image,
          });
        } catch (e) {
          console.error('Failed to fetch profile:', e);
        }
      }
    };
    fetchProfile();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressedImage = await compressImage(file);
        setFormData((prev) => ({ ...prev, image: compressedImage }));
      } catch (error) {
        console.error('Error compressing image:', error);
      }
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await adminAPI.updateAdmin(formData, token);
        alert('Profile updated successfully');
        setIsEditing(false);
        window.location.reload();
      } catch (e) {
        console.error('Failed to update profile:', e);
      }
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await adminAPI.deleteAdmin({ email: formData.email }, token);
        alert('Account deleted successfully');
        localStorage.removeItem('token');
        navigate('/admin/signup');
      } catch (e) {
        console.error('Failed to delete profile:', e);
      }
    }
  };

  return (
    <div>
      {profile && !isEditing && (
        <div>
          <img src={profile.image} alt="Profile" />
          <span className="text-white bg-red-600">
            {profile.firstname} {profile.lastname}
          </span>
          <p className="text-black">{profile.email}</p>
          <p className="text-black">{profile.createdAt}</p>
          <button onClick={handleEditToggle} className="text-black">
            Edit
          </button>
        </div>
      )}
      {isEditing && (
        <div>
          <h2>Edit Profile</h2>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="First name"
          />
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Last name"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input type="file" name="image" onChange={handleImageChange} />
          <button className='bg-red-600' onClick={handleUpdate}>Save Changes</button>
          <button onClick={handleEditToggle}>Cancel</button>
        </div>
      )}
      <button onClick={handleDelete} className="text-red-600 mt-4">
        Delete Account
      </button>
    </div>
  );
}

export default Admindetails;
