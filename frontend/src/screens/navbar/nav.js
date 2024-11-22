import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
// Corrected imports for Heroicons v2
import { UserIcon, MoonIcon, SunIcon } from '@heroicons/react/24/solid';

const Nav = ({ darkMode, handleToggleDarkMode }) => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false); // To toggle username/logout dropdown
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('token');
      if (!token) return;

      try {
        const response = await fetch(`https://campus-nav-backend.onrender.com/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.log("Failed to fetch user data");
        }
      } catch (error) {
        console.log("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    navigate("/");
  };

  // Toggle dropdown on icon click
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Hide dropdown if clicked outside (optional but improves UX)
  const handleOutsideClick = (e) => {
    if (showDropdown) setShowDropdown(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [showDropdown]);

  return (
    <div className={`flex justify-between items-center py-4 px-6 bg-black`}>
      {/* Left side (Title or logo) */}
      <div className="text-3xl font-bold"></div>

      {/* Right side (Dark mode toggle and user icon) */}
      <div className="flex items-center space-x-4 relative">
        {/* Dark Mode Toggle Button with Icon */}
        <button className="bg-gray-700 rounded-full p-2" onClick={(e) => { e.stopPropagation(); handleToggleDarkMode(); }}>
          {darkMode ? (
            <SunIcon className="h-6 w-6 text-yellow-400" />
          ) : (
            <MoonIcon className="h-6 w-6 text-gray-300" />
          )}
        </button>

        {/* User Icon that toggles the dropdown */}
        <div className="relative">
          <button onClick={(e) => { e.stopPropagation(); toggleDropdown(); }}>
            <UserIcon className="h-8 w-8 text-white" />
          </button>

          {/* Username and Logout dropdown, visible on click */}
          {showDropdown && (
            <div className={`absolute right-0 mt-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} shadow-lg rounded-lg p-3 w-48`}>
              {/* Display username */}
              <div className="text-center mb-2">
                Hello, {user ? user.name : "Guest"}
              </div>

              {/* Logout button */}
              <button
                className={`w-full text-left p-2 hover:${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded`}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
