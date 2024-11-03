import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { userAPI } from '../../services/userAPI';

function Profileshortcut() {
    const [userData, setUserData] = useState(null);
    const token = localStorage.getItem('token');

    const fetchUserData = useCallback(async () => {
        try {
            const response = await userAPI.fetchProfile(token);
            setUserData(response.data.user);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }, [token]);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    return (
        <div>
            <Link to="/user/profile" className="flex items-center text-white py-2 px-3 rounded">
                {userData?.image && (
                    <img 
                        src={userData.image} 
                        alt="User Avatar" 
                        className="rounded-full w-10 h-10 border mr-2" 
                    />
                )}
                <span className="font-poppins ml-2 hidden sm:inline">
                    {userData ? userData.firstname : 'Loading...'}
                </span>
            </Link>
        </div>
    );
}

export default Profileshortcut;
