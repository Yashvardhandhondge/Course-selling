import React, { useEffect, useMemo, useState } from "react";
import { userAPI } from "../../services/userAPI";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const [userData, setUserData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    image: '',
  });
  const navigate = useNavigate();
  const token = useMemo(() => localStorage.getItem('token'), []);

  useEffect(() => {
    const fetchDataUserData = async () => {
      try {
        const response = await userAPI.fetchProfile(token);
        setUserData(response.data.user);
      } catch (e) {
        console.error("Error fetching user data:", e);
      }
    };
    fetchDataUserData();
  }, [token]);

  const handleDelete = async () => {
    try {
      await userAPI.deleteUser({ email: userData.email }, token);
      localStorage.removeItem('token');
      navigate("/signin");
    } catch (e) {
      console.error("Error deleting user:", e);
    }
  };

  return (
    <div className="user-profile">
      {userData.image && (
        <img src={userData.image} alt="User Avatar" className="profile-image" />
      )}
      <h2>{userData.firstname} {userData.lastname}</h2>
      <p>{userData.email}</p>
      <div className="profile-actions">
        <button onClick={() => navigate("/user/edit")}>Edit Profile</button>
        <button onClick={handleDelete} className="delete-button">Delete Account</button>
      </div>
    </div>
  );
}

export default UserProfile;
