import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../../services/adminApi';
import { compressImage } from '../../utlis/imageCompressionHelper';

const Admindetails = React.memo(() => {
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

  const formattedCreatedAt = useMemo(() => {
    if (profile?.createdAt) {
      const date = new Date(profile.createdAt);
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
             ', ' +
             date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true });
    }
    return '';
  }, [profile?.createdAt]);

  const formattedUpdatedAt = useMemo(() => {
    if (profile?.updatedAt) {
      const date = new Date(profile.updatedAt);
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
             ', ' +
             date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true });
    }
    return '';
  }, [profile?.updatedAt]);

  const handleImageChange = useCallback(async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressedImage = await compressImage(file);
        setFormData((prev) => ({ ...prev, image: compressedImage }));
      } catch (error) {
        console.error('Error compressing image:', error);
      }
    }
  }, []);

  const handleEditToggle = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleUpdate = useCallback(async () => {
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
  }, [formData]);

  const handleDelete = useCallback(async () => {
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
  }, [formData.email, navigate]);

  return (
    <div className='min-h-screen flex flex-col items-center font-poppins text-white p-4 sm:p-8'>
      {profile && !isEditing && (
        <div className="flex flex-col items-center space-y-4 w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
          <img src={profile.image} className="h-40 w-40 rounded-full object-cover" alt="Profile" />
          <div className="flex flex-col items-center text-center space-y-2">
            <p className="text-xl font-semibold">Name:</p>
            <span className="text-purple-500 text-2xl">
              {profile.firstname} {profile.lastname}
            </span>
            <p className="text-xl font-semibold">Email:</p>
            <p className="text-purple-500 text-2xl">{profile.email}</p>
            <p className="text-xl font-semibold">Created At:</p>
            <p className="text-purple-500 text-xl">{formattedCreatedAt}</p>
            <p className="text-xl font-semibold">Updated At:</p>
            <p className="text-purple-500 text-xl">{formattedUpdatedAt}</p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4 ml-0  w-full">
            <button
              onClick={handleEditToggle}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:bg-black transition-transform text-xl"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="w-full sm:w-auto px-4 py-2  rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:bg-black transition-transform text-xl"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {isEditing && (
        <div className="flex flex-col items-center space-y-4 w-full sm:max-w-md md:max-w-lg lg:max-w-xl">
          <h2 className="text-purple-500 text-4xl font-medium">Edit Profile</h2>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="First Name"
            className="border p-2 rounded-lg w-full text-black focus:outline-none"
          />
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Last Name"
            className="border p-2 rounded-lg w-full text-black focus:outline-none"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded-lg w-full text-black focus:outline-none"
          />
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="border p-2 bg-white text-black rounded-lg w-full"
          />
          <button
            onClick={handleUpdate}
            className="w-full px-4 py-2  bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg transition duration-200 hover:bg-white hover:text-black text-xl"
          >
            Save Changes
          </button>
          <button onClick={handleEditToggle} className="text-white mt-2">Cancel</button>
        </div>
      )}
    </div>
  );
});

export default Admindetails;
