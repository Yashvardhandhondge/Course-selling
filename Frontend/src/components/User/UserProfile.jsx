import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../../services/userAPI';
import { compressImage } from '../../utlis/imageCompressionHelper';
import Sidebar from './Sliderbar';

const UserProfile = React.memo(() => {
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
          const response = await userAPI.fetchProfile(token);
          setProfile(response.data.user);
          setFormData({
            email: response.data.user.email,
            firstname: response.data.user.firstname,
            lastname: response.data.user.lastname,
            image: response.data.user.image,
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
      return date.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    }
    return '';
  }, [profile?.createdAt]);

  const formattedUpdatedAt = useMemo(() => {
    if (profile?.updatedAt) {
      const date = new Date(profile.updatedAt);
      return date.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
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
        await userAPI.updateUser(formData, token);
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
        await userAPI.deleteUser({ email: formData.email }, token);
        alert('Account deleted successfully');
        localStorage.removeItem('token');
        navigate('/signin');
      } catch (e) {
        console.error('Failed to delete profile:', e);
      }
    }
  }, [formData.email, navigate]);

  
  const handleLogout = useCallback(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      navigate('/');
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-black to-[#2E0249] ">
            <Sidebar handleLogout={handleLogout} />
      
        {profile && !isEditing ? (

<div className="flex justify-center items-center   sm:ml-[10px]  ml-12 lg:ml-64  p-4">
<div className="text-purple-600 flex flex-col items-center p-4 ml-[20px] sm:ml-[30px] lg:ml-[290px] sm: sm:p-6 md:p-8 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
    <img
        src={profile.image}
        className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 rounded-full object-cover"
        alt="Profile"
    />
    <div className="mt-4 sm:mt-6 text-center ">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-purple-500 font-poppins">
            {`${profile.firstname} ${profile.lastname}`}
        </h2>
        <p className="text-md sm:text-lg md:text-xl mt-2 sm:mt-4 text-purple-600">
            Email: <span className="text-purple-500">{profile.email}</span>
        </p>
        <p className="text-md sm:text-lg md:text-xl text-purple-600">
            Created At: <span className="text-purple-500">{formattedCreatedAt}</span>
        </p>
        <p className="text-md sm:text-lg md:text-xl text-purple-600">
            Updated At: <span className="text-purple-500">{formattedUpdatedAt}</span>
        </p>
        <div className="flex mt-4 space-x-4">
            <button
                onClick={handleEditToggle}
                className="text-sm md:text-base text-black hover:scale-95 transition-transform py-1 sm:py-2 px-3 sm:px-4 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 w-24 sm:w-28 md:w-32 hover:text-purple-600 hover:bg-black border border-blue-400"
            >
                Edit
            </button>
            <button
                onClick={handleDelete}
                className="text-sm md:text-base text-black hover:scale-95 transition-transform py-1 sm:py-2 px-3 sm:px-4 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 w-24 sm:w-28 md:w-32 hover:text-purple-600 hover:bg-black border border-blue-400"
            >
                Delete
            </button>
        </div>
    </div>
</div>
</div>

        
        ) : (
          <div className="flex items-center justify-center min-h-screen  sm:ml-1 md:ml-[150px] lg:ml-[300px] ml-12 lg:ml-64  p-4">
          <div className="flex flex-col items-center p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-sm md:max-w-md">
              <h2 className="text-purple-500 text-2xl sm:text-3xl font-medium mb-4 text-center">Edit Profile</h2>
              <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="border placeholder-black text-sm sm:text-base p-2 mb-3 sm:mb-4 font-poppins focus:outline-none focus:border-black w-full rounded-2xl"
              />
              <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="border placeholder-black text-sm sm:text-base p-2 mb-3 sm:mb-4 font-poppins focus:outline-none focus:border-black w-full rounded-2xl"
              />
              <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="border placeholder-black text-sm sm:text-base p-2 mb-3 sm:mb-4 font-poppins focus:outline-none focus:border-black w-full rounded-2xl"
              />
              <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  className="border bg-white text-sm sm:text-base p-2 mb-3 sm:mb-4 placeholder-black font-poppins focus:outline-none focus:border-black w-full rounded-2xl"
              />
              <button
                  className="text-sm sm:text-base w-full py-2 mt-1 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:bg-purple-text-purple-600 hover:text-black transition duration-200"
                  onClick={handleUpdate}
              >
                  Save Changes
              </button>
              <button
                  onClick={handleEditToggle}
                  className="text-sm sm:text-base text-black border bg-red-200 w-full py-2 rounded-2xl mt-2 font-poppins"
              >
                  Cancel
              </button>
          </div>
      </div>
      
        )}
      </div>
     
  );
});

export default UserProfile;
