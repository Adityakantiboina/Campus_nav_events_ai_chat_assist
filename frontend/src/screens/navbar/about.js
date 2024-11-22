import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import navImage from "../../images/navigation.jpg"; // Example navigation image
import eventsImage from "../../images/events.jpg"; // Example events image
import aiImage from "../../images/ai.png"; // Example AI chat image
import Navbar from './nav';
import Sidebar from './sidebar'; // Import Sidebar

const AboutUsPage = () => {
    const [darkMode, setDarkMode] = useState(true); // State for dark mode
    const [showLogout, setShowLogout] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(false); // State for sidebar expansion
    const navigate = useNavigate();

    const handleSidebarHover = (isHovered) => {
        setSidebarExpanded(isHovered);
    };

    // Function to toggle dark mode
    const handleToggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`min-h-screen flex ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            {/* Sidebar */}
            <Sidebar 
                sidebarExpanded={sidebarExpanded} 
                handleSidebarHover={handleSidebarHover} 
            />

            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <Navbar 
                    setShowLogout={setShowLogout} 
                    showLogout={showLogout} 
                    darkMode={darkMode} // Pass darkMode to Navbar
                    handleToggleDarkMode={handleToggleDarkMode} // Pass toggle function to Navbar
                />

                <div className={`flex-1 p-6 my-4 transition-all duration-300 ${sidebarExpanded ? 'blur-md' : 'ml-20'}`}>
                    {/* About Us Section */}
                    <h1 className="text-4xl font-bold mb-4 text-center">About Us</h1>
                    <p className={`text-lg mb-8 text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Our website is designed to streamline campus navigation, keep you updated on live events, 
                        and provide AI-powered assistance for all your campus-related queries. We aim to enhance your 
                        university experience by offering a platform that's easy to use, interactive, and informative.
                    </p>

                    {/* Feature 1: Campus Navigation System */}
                    <section className="mb-8 flex justify-center items-center">
                        <div className="w-1/2 p-4">
                            <h2 className="text-2xl font-bold mb-4">Campus Navigation System</h2>
                            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                Our interactive campus map helps you find your way around the university with ease. Whether you're 
                                looking for a lecture hall, library, or administrative office, our map is equipped with real-time 
                                navigation features powered by React.js and Mapbox, ensuring you never get lost.
                            </p>
                        </div>
                        <img src={navImage} alt="Campus Navigation" className="w-1/3 rounded-lg shadow-2xl transform transition-transform duration-300 hover:scale-105"/>
                    </section>

                    {/* Feature 2: Live Events Information */}
                    <section className="mb-8 flex justify-center items-center">
                        <img src={eventsImage} alt="Live Events" className="w-1/3 rounded-lg shadow-2xl transform transition-transform duration-300 hover:scale-105"/>
                        <div className="w-1/2 p-4">
                            <h2 className="text-2xl font-bold mb-4">Live Events Information</h2>
                            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                Stay updated with the latest events happening around campus. Our event feed provides real-time 
                                information on seminars, workshops, and social activities, keeping you in the loop at all times.
                            </p>
                        </div>
                    </section>

                    {/* Feature 3: AI-Responsive Chat Feature */}
                    <section className="mb-8 flex justify-center items-center">
                        <div className="w-1/2 p-4">
                            <h2 className="text-2xl font-bold mb-4">AI-Responsive Chat Feature</h2>
                            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                Our AI-powered chat assistant is here to answer all your campus-related queries. Whether it's 
                                finding your way to the main library or learning about today's events, our chat feature, powered by 
                                advanced NLP models, provides instant and accurate responses.
                            </p>
                        </div>
                        <img src={aiImage} alt="AI Chat" className="w-1/3 rounded-lg shadow-2xl transform transition-transform duration-300 hover:scale-105"/>
                    </section>
                </div>

                {/* Footer */}
                <footer className={`p-4 text-center ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'}`}>
                    <p>&copy; 2024 Vmap. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default AboutUsPage;
