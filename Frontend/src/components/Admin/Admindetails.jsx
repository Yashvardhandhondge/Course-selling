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
    <div className='h-full flex max-w-fit font-poppins'>
      {profile && !isEditing && (
        <div className='text-white flex'>
          <div>
            <img src={profile.image} className='h-[300px] w-[300px] mt-4 ml-[100px] rounded-full' alt="Profile" />
          </div>
          <div className='mt-8'>
            <p className='text-3xl text-white mt-2 ml-[160px]'>Name :</p>
            <span className="text-purple-500 ml-[170px] text-4xl">
              {profile.firstname} {profile.lastname}
            </span>
            <p className='text-3xl text-white mt-2 ml-[160px]'>Email :</p>
            <p className="text-purple-500 ml-[170px] text-4xl">{profile.email}</p>
            <p className='text-3xl text-white mt-2 ml-[160px]'>Created At :</p>
            <p className="text-purple-500 ml-[170px] text-4xl">{formattedCreatedAt}</p>
            <p className='text-3xl text-white mt-2 ml-[160px]'>Updated At :</p>
            <p className="text-purple-500 ml-[170px] text-4xl">{formattedUpdatedAt}</p>
            <button
              onClick={handleEditToggle}
              className="text-white ml-[160px] hover:scale-95 transition-transform mt-4 px-6 text-2xl py-2 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 w-32 hover:bg-black border border-blue-400"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-white ml-[30px] hover:scale-95 transition-transform mt-4 px-6 text-2xl py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 w-32 rounded-2xl hover:bg-black border border-blue-400"
            >
              Delete
            </button>
          </div>
        </div>
      )}
      {isEditing && (
        <div className='flex justify-start flex-col ml-[610px] mt-[100px]'>
          <p className="w-full text-purple-500 mr-[900px] text-4xl font-medium leading-snug">Edit Profile</p>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="First Name"
            className='border placeholder-black p-2 mb-[20px] mt-5 focus:outline-none focus:border-black w-[300px] rounded-2xl'
          />
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Last name"
            className='border placeholder-black mb-[20px] focus:outline-none focus:border-black w-[300px] rounded-2xl'
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className='border placeholder-black mb-[20px] focus:outline-none focus:border-black w-[300px] rounded-2xl'
          />
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className='border mb-[20px] placeholder-black focus:outline-none w-[300px] rounded-2xl'
          />
          <button
            className='inline-block w-[300px] pt-3 text-xl font-medium text-center text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl transition duration-200 hover:bg-white hover:text-black ease'
            onClick={handleUpdate}
          >
            Save Changes
          </button>
          <button onClick={handleEditToggle} className="text-white mt-4">Cancel</button>
        </div>
      )}
    </div>
  );
});

export default Admindetails;
