import React, { useState, Suspense } from "react";
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Navbar from "../navbar/nav";
import Sidebar from "../navbar/sidebar";
import "../../index.css";
import Vmap from "../../Vmap";
import Stone from "../../STONE";
import Vstone from "../../Vstone";
import Vm from "../../Vm";

const Map = () => {
    const [showLogout, setShowLogout] = useState(true);
    const [sidebarExpanded, setSidebarExpanded] = useState(false);
    const [darkMode, setDarkMode] = useState(true);

    const handleSidebarHover = (isHovered) => {
        setSidebarExpanded(isHovered);
    };

    const handleToggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <div className={`min-h-screen w-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <Sidebar sidebarExpanded={sidebarExpanded} handleSidebarHover={handleSidebarHover} />
            <div className={`flex flex-col w-full transition-all duration-300 ${sidebarExpanded ? 'blur-md' : ''}`}>
                <div className="fixed top-0 left-0 right-0 z-40 w-full">
                    <Navbar darkMode={darkMode} setShowLogout={setShowLogout} showLogout={showLogout} handleToggleDarkMode={handleToggleDarkMode} />
                </div>
                <div className="p-0 mt-20 flex flex-col items-center w-full">
                    {/* Heading Section */}
                    <div className="mb-6 text-center">
                        <h1 className="text-5xl font-bold mb-4">3D Campus Map</h1>
                        <p className="text-xl text-gray-400">Explore the campus with our interactive 3D map.</p>
                    </div>

                    {/* Canvas Container */}
                    <div className="w-full max-w-7xl flex items-center justify-center">
                        <Canvas className="w-full h-[80vh]">
                            <OrbitControls />
                            <Suspense fallback={null}>
                                <ambientLight intensity={1} />
                                <Vm />
                            </Suspense>
                            <Environment preset='sunset' />
                        </Canvas>
                    </div>
                </div>
                
                {/* Footer Section */}
                <footer className={`p-4 mt-8 text-center w-full ${darkMode ? 'bg-black text-white' : 'bg-gray-800 text-white-900'}`}>
                    <p>&copy; 2024 Vmap. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default Map;
