import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../../services/userAPI';
import { compressImage } from '../../utlis/imageCompressionHelper';
import UserNav from './ProfileNav';

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

  return (
    <div className='bg-gradient-to-r from-black to-[#2E0249] h-full flex'>
      <UserNav />
      <div className='flex-1 flex justify-center items-start'>
        {profile && !isEditing ? (
          <div className='text-purple-600 bg-gradient-to-r from-black to-[#2E0249] flex flex-col items-center p-8 w-full max-w-md'>
            <img src={profile.image} className='h-[200px] w-[200px] rounded-full' alt="Profile" />
            <div className='mt-6 text-center'>
              <h2 className='text-4xl text-purple-500 font-poppins'>{`${profile.firstname} ${profile.lastname}`}</h2>
              <p className='text-xl text-purple-600'>Email: <span className='text-purple-500'>{profile.email}</span></p>
              <p className='text-xl text-purple-600'>Created At: <span className='text-purple-500'>{formattedCreatedAt}</span></p>
              <p className='text-xl text-purple-600'>Updated At: <span className='text-purple-500'>{formattedUpdatedAt}</span></p>
              <div className='flex mt-4'>
                <button
                  onClick={handleEditToggle}
                  className="text-black hover:scale-95 transition-transform py-2 px-4 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 w-32 hover:text-purple-600 hover:bg-black border hover:border-purple-text-purple-600 border-blue-400"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="ml-4 text-black hover:scale-95 transition-transform py-2 px-4 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 w-32 hover:text-purple-600 hover:bg-black border hover:border-purple-text-purple-600 border-blue-400"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex flex-col items-start p-8 w-full max-w-md'>
            <h2 className="text-purple-500 text-3xl font-medium mb-4">Edit Profile</h2>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="First Name"
              className='border placeholder-black p-2 mb-4 font-poppins focus:outline-none focus:border-black w-full rounded-2xl'
            />
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Last Name"
              className='border placeholder-black p-2 mb-4 font-poppins focus:outline-none focus:border-black w-full rounded-2xl'
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className='border placeholder-black p-2 mb-4 font-poppins focus:outline-none focus:border-black w-full rounded-2xl'
            />
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className='border bg-white mb-4 placeholder-black font-poppins focus:outline-none focus:border-black w-full rounded-2xl'
            />
            <button
              className='text-black w-full py-2 mt-1 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:bg-purple-text-purple-600 hover:text-black transition duration-200'
              onClick={handleUpdate}
            >
              Save Changes
            </button>
            <button
              onClick={handleEditToggle}
              className='text-black text-lg border bg-red-200 w-full py-2 rounded-2xl mt-2 font-poppins'
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

export default UserProfile;
