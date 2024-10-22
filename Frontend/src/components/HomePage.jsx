import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <h1>Welcome to the Course Selling App</h1>
            <div>
                <h2>User Options</h2>
                <Link to="/signin">Sign In</Link>
                <Link to="/signup">Sign Up</Link>
            </div>
            <div>
                <h2>Admin Options</h2>
                <Link to="/admin/signin">Admin Sign In</Link>
                <Link to="/admin/signup">Admin Sign Up</Link>
            </div>
        </div>
    );
};

export default HomePage;
