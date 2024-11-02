import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PiBasketballBold } from "react-icons/pi";
import Profileshortcut from './Profile';
import { userAPI } from '../../services/userAPI';

function UserDashboard() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchActivityLogs = async () => {
      try {
        const response = await userAPI.fetchActivities(token);
        setActivities(response.data.activities);
      } catch (error) {
        console.error('Error fetching activity logs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivityLogs();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/login'); // Redirect to login page
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-[#2E0249] p-8 font-poppins text-white">
      <div className='flex justify-between mb-6'>
        <Link to="/" className="text-3xl text-white flex font-bold">
          <PiBasketballBold className="text-blue-500 h-8 w-8 mt-1 mr-4" />
          Koursely
        </Link>
        <div className="flex items-center">
          <Profileshortcut />
          <button
            onClick={handleLogout}
            className='text-black bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2 rounded 2xl ml-4'
          >
            Logout
          </button>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-6">User Activity Logs</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {activities.length > 0 ? (
          <ul className="space-y-4">
            {activities.map((activity) => (
              <li key={activity._id} className="p-4 bg-gray-50 rounded-md shadow">
                <p><strong>Action:</strong> {activity.action}</p>
                <p><strong>Details:</strong> {activity.details}</p>
                <p><strong>Date:</strong> {new Date(activity.timestamp).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No activities logged yet.</p>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
