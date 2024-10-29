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
    <div className='h-full flex    max-w-fit'>
      {profile && !isEditing && (

        <div className='text-white'>
        
          <img src={profile.image} className='h-[300px] w-[300px] mt-4 ml-[100px] rounded-full' alt="Profile" />
          <p className='text-3xl text-white mt-2 ml-[160px] font-sans '>Name :</p>
          <span className="text-blue-300 ml-[170px] text-4xl font-serif">
            {profile.firstname} {profile.lastname}
          </span>
          <p className='text-3xl text-white mt-2 ml-[160px] font-sans '>Email :</p>
         
          <p className="text-blue-300 ml-[170px] text-4xl font-serif">{profile.email}</p>
          <button onClick={handleEditToggle} className=" ml-[160px] text-black mt-4 px-6 text-2xl font-serif py-2 rounded bg-blue-400 hover:text-white hover:bg-black border hover:border-white border-blue-400 ">
            Edit
          </button>
          <button onClick={handleDelete} className="text-black ml-[30px] mt-4 px-6 text-2xl font-serif py-2 rounded bg-blue-400 hover:text-white hover:bg-black border hover:border-white border-blue-400 ">
        Delete 
      </button>
        </div>
      )}
      {isEditing && (
        <div className='flex justify-start flex-col ml-[610px] mt-[100px]'>
                        <p className="w-full text-blue-500 mr-[900px] text-4xl font-medium  leading-snug font-serif">Edit Profile</p>

          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="First Name"
            className='border placeholder-black p-2 mb-[20px] font-serif focus:outline-none focus:border-black w-[300px] pt-3 pr-2 pb-3 pl-2 mt-1 text-base block bg-slate-300 border-gray-300 rounded-md'
          />
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Last name"
            className='border placeholder-black mb-[20px] font-serif focus:outline-none focus:border-black w-[300px] pt-3 pr-2 pb-3 pl-2 mt-1 text-base block bg-slate-300 border-gray-300 rounded-md'
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className='border placeholder-black mb-[20px] font-serif focus:outline-none focus:border-black w-[300px] pt-3 pr-2 pb-3 pl-2 mt-1 text-base block bg-slate-300 border-gray-300 rounded-md'
          />
          <input type="file" name="image" className='border mb-[20px] placeholder-black font-serif focus:outline-none focus:border-black w-[300px] pt-3 pr-2 pb-3 pl-2 mt-1 text-base block bg-slate-300 border-gray-300 rounded-md' onChange={handleImageChange} />
          <button className='inline-block  w-[300px] pt-3 pr-2 pb-3 pl-2 mt-1  text-xl font-medium text-center text-white bg-indigo-500 rounded-lg transition duration-200 hover:bg-white hover:text-black border-solid ease' onClick={handleUpdate}>Save Changes</button>
          <button onClick={handleEditToggle}>Cancel</button>
        </div>
      )}
  
    </div>
  );
}

export default Admindetails;
