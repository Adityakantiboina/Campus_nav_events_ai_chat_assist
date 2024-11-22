import React, { useState, useEffect } from "react";
import bannerImage from "../../images/vitap.jpg";
import Navbar from "../navbar/nav";
import Sidebar from "../navbar/sidebar";

const HomePage = () => {
    const [showLogout, setShowLogout] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [events, setEvents] = useState([]);
    const [sidebarExpanded, setSidebarExpanded] = useState(false);
    const [darkMode, setDarkMode] = useState(true);
    const [selectedBox, setSelectedBox] = useState(null);


    const BASE_URL = 'https://campus-nav-backend.onrender.com';

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${BASE_URL}/events`);
                if (response.ok) {
                    const data = await response.json();
                    setEvents(data);
                } else {
                    console.log("Failed to fetch events");
                }
            } catch (error) {
                console.log("Error fetching events", error);
            }
        };

        fetchEvents();
    }, []);

    // Auto-change event index every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
        }, 2000);

        return () => clearInterval(interval); // Clear interval on unmount
    }, [events.length]);

    const handleSidebarHover = (isHovered) => {
        setSidebarExpanded(isHovered);
    };

    const [selectedFAQ, setSelectedFAQ] = useState(null);

    const faqData = [
        {
            question: "How does the AI Chat feature work?",
            answer: "Our AI Chat feature uses advanced natural language processing to provide instant responses to your questions about campus navigation and event details. Simply ask about any location or event on campus, and the AI will guide you effectively.",
        },
        {
            question: "How can I find information about live events?",
            answer: "You can find information about live, past, and upcoming events directly on our platform. Our event feature is regularly updated to ensure you have the latest information on everything happening around the campus.",
        },
        {
            question: "How do I navigate the campus using the 3D map?",
            answer: "The 3D map feature provides an interactive way to explore the campus. You can locate different buildings, facilities, and event venues easily, helping you navigate efficiently and find the fastest routes to your destination.",
        },
    ];
    const imageData = [
        {
            id: 1,
            title: "Library",
            thumbnail: require("../../images/l.jpg"),
            images: [
                require("../../images/l1.jpg"),
                require("../../images/l2.jpg"),
                require("../../images/l3.jpg"),
            ],
        },
        {
            id: 2,
            title: "ClassRoom",
            thumbnail: require("../../images/c.jpg"),
            images: [
                require("../../images/c1.jpg"),
                require("../../images/c2.jpg"),
                require("../../images/c3.jpg"),
            ],
        },
        {
            id: 3,
            title: "Grounds",
            thumbnail: require("../../images/g.jpg"),
            images: [
                require("../../images/g1.jpg"),
                require("../../images/g2.jpg"),
                require("../../images/g3.jpg"),
            ],
        },
    ];
    
    const toggleFAQ = (index) => {
        if (selectedFAQ === index) {
            setSelectedFAQ(null);
        } else {
            setSelectedFAQ(index);
        }
    };

    const handleToggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <div className={`min-h-screen flex w-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
    <Sidebar sidebarExpanded={sidebarExpanded} handleSidebarHover={handleSidebarHover} />
    <div className={`flex-1 transition-all duration-300 ${sidebarExpanded ? 'blur-md' : ''}`}>
        <div className="fixed top-0 left-0 right-0 z-40 w-full">
            <Navbar darkMode={darkMode} setShowLogout={setShowLogout} showLogout={showLogout} handleToggleDarkMode={handleToggleDarkMode} />
        </div>
        <div className="w-full px-4 py-6 mt-16 space-y-12">
            {/* Events Section */}
            <div className="mb-6 flex flex-col items-center">
                <h1 className="text-5xl font-bold mb-4 text-center animate-sparkle">Live Events</h1>
                <div className="relative flex items-center justify-center w-full max-w-4xl">
                    {events.length > 0 && (
                        <div
                            key={events[currentIndex]._id}
                            className={`relative w-full h-[400px] rounded-lg overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
                        >
                            <img
                                src={events[currentIndex].eimage}
                                alt={events[currentIndex].ename}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-50 text-white p-4">
                                <h3 className="text-2xl font-bold mb-2">{events[currentIndex].ename}</h3>
                                <p className="text-sm">{events[currentIndex].edescription}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Banner Boxes */}
            <div className="mb-12">
                {selectedBox === null ? (
                    <div className="flex justify-center space-x-6">
                        {imageData.map((box) => (
                            <div
                                key={box.id}
                                className="relative w-64 h-64 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
                                onClick={() => setSelectedBox(box.id)}
                            >
                                <img
                                    src={box.thumbnail}
                                    alt={box.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                    <h3 className="text-white font-bold text-lg">{box.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex flex-col items-center justify-center overflow-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 animate-slide-up">
                            {imageData
                                .find((box) => box.id === selectedBox)
                                ?.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="w-full max-w-sm p-4 rounded-lg overflow-hidden shadow-md bg-white"
                                    >
                                        <img
                                            src={image}
                                            alt={`Gallery ${index + 1}`}
                                            className="w-full h-48 object-cover rounded-lg shadow-md"
                                        />
                                    </div>
                                ))}
                        </div>
                        <div className="text-center mb-4">
                            <h3 className="text-xl font-bold text-white">
                                Wanna explore more? Then press below
                            </h3>
                        </div>
                        <button
                            onClick={() => setSelectedBox(null)}
                            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
                        >
                            Back
                        </button>
                    </div>
                )}
            </div>

            {/* Services Section */}
            <div className="mb-10 text-center">
                <h2 className="text-4xl font-bold mb-6">What are the services we offer?</h2>
                <p className="text-gray-600 mb-8">We provide a wide range of services to make your events successful.</p>
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {[{
                            title: "AI Chat Assist",
                            description: "Our AI chat feature provides interactive responses to your questions about campus navigation and event details.",
                        },
                        {
                            title: "Event Details",
                            description: "Users can access comprehensive details of live events happening around the campus, outdated, upcoming events to stay informed.",
                        },
                        {
                            title: "3D Map",
                            description: "We offer a 3D interactive campus map, enabling easy navigation across the college.",
                        }].map((service, index) => (
                            <div
                                key={index}
                                className={`relative w-48 h-48 p-4 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                            >
                                <div className="absolute top-2 left-2 bg-pink-400 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-xs">{index + 1}</div>
                                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                                <p className="text-sm">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-10 flex flex-col items-center">
                <h2 className="text-4xl font-bold mb-6">Frequently Asked Questions</h2>
                <div className="w-full max-w-3xl">
                    <div className="max-h-96 overflow-y-auto">
                        {faqData.map((faq, index) => (
                            <div key={index} className="mb-4">
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className={`flex justify-between items-center w-full p-4 rounded-lg transition duration-300 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}
                                >
                                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                                    <span className="text-lg">{selectedFAQ === index ? '-' : '+'}</span>
                                </button>
                                {selectedFAQ === index && (
                                    <div className={`p-4 rounded-lg mt-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
                                        <p>{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <footer className={`p-4 text-center w-full ${darkMode ? 'bg-black text-white' : 'bg-gray-800 text-white-900'}`}>
            <p>&copy; 2024 Vmap. All rights reserved.</p>
        </footer>
    </div>
</div>

    );
};

export default HomePage;
