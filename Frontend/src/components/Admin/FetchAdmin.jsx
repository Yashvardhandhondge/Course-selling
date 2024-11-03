import React,{useState,useEffect} from 'react'
import { adminAPI } from '../../services/adminApi';
import { Link } from 'react-router-dom';
function Fetchadmin() {

    const [profile, setProfile] = useState(null);

    useEffect(() => {
      const fetchProfile = async () => {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const response = await adminAPI.getAdmin(token);
            setProfile(response.data.admin);
          } catch (e) {
            console.error('Failed to fetch profile:', e);
          }
        }
      };
      fetchProfile();
    }, []);
  return (
    <div> {profile && (
        <div className="flex items-center">
            <Link to='/admin/profile'>
          <img
            src={profile.image}
            alt="Profile"
            className="w-10 h-10  rounded-full mr-2"
          />
          </Link>
          <span className="text-white hidden  font-poppins sm:inline">{profile.firstname}</span>
        </div>
      )}</div>
  )
}


export default Fetchadmin