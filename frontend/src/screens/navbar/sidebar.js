// Sidebar.js
import React from 'react';
import { FaHome, FaMapMarkerAlt, FaInfoCircle, FaPhone, FaCalendarAlt, FaComments } from 'react-icons/fa'; // Import chat icon
import { Link } from 'react-router-dom'; // Import Link
import i from "../../images/logo.png";

const Sidebar = ({ sidebarExpanded, handleSidebarHover }) => {
  return (
    <div
      className={`fixed left-0 top-0 h-full transition-all duration-300 z-50 ${sidebarExpanded ? 'w-40' : 'w-16'} bg-black flex flex-col`}
      onMouseEnter={() => handleSidebarHover(true)}
      onMouseLeave={() => handleSidebarHover(false)}
    >
      {/* Logo Area */}
      <div className="flex flex-col items-center justify-start py-4">
      <div className="mb-2">
      <img src={i} alt="VImap" className="w-12 h-12" />
    </div>
     {/* Logo */}
        {sidebarExpanded && (
          <span className="text-white text-lg font-semibold">VImap</span>
        )}
      </div>
      
      {/* Icons Area */}
      <div className="flex flex-col items-center justify-center flex-grow space-y-8 mb-20">
        <Link to="/home" className="flex items-center space-x-4">
          <FaHome className="text-white text-2xl" />
          {sidebarExpanded && <span className="text-white">Home</span>}
        </Link>
        <Link to="/maps" className="flex items-center space-x-4">
          <FaMapMarkerAlt className="text-white text-2xl" />
          {sidebarExpanded && <span className="text-white">Maps</span>}
        </Link>
        <Link to="/about" className="flex items-center space-x-4">
          <FaInfoCircle className="text-white text-2xl" />
          {sidebarExpanded && <span className="text-white">About</span>}
        </Link>
        <Link to="/contact" className="flex items-center space-x-4">
          <FaPhone className="text-white text-2xl" />
          {sidebarExpanded && <span className="text-white">Contact</span>}
        </Link>
        <Link to="/eve" className="flex items-center space-x-4">
          <FaCalendarAlt className="text-white text-2xl" />
          {sidebarExpanded && <span className="text-white">Events</span>}
        </Link>
        <Link to="/chat" className="flex items-center space-x-4">
          <FaComments className="text-white text-2xl" />
          {sidebarExpanded && <span className="text-white">AI Chat</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
