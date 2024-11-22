import React, { useState } from 'react';
import i1 from "../../images/anime1.jpg";
import i2 from "../../images/anime2"; // Ensure you have the correct extension
import i3 from "../../images/tech1.jpg";
import i4 from "../../images/tech2.jpeg";
import i5 from "../../images/dance1.jpg";
import { useNavigate } from "react-router-dom";
import Navbar from './nav';
import Sidebar from './sidebar'; // Import Sidebar

const EventsPage = () => {
    const [showLogout, setShowLogout] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(false); // State for sidebar expansion
    const navigate = useNavigate();

    // Event data for each section
    const liveEvents = [
        {
            title: 'Live Event 1',
            description: 'Description for live event 1',
            image: i1,
            timing: '10:00 AM - 12:00 PM',
            club: 'Tech Club',
            place: 'Auditorium',
        },
        {
            title: 'Live Event 2',
            description: 'Description for live event 2',
            image: i2,
            timing: '2:00 PM - 4:00 PM',
            club: 'Music Club',
            place: 'Main Hall',
        },
    ];

    const upcomingEvents = [
        {
            title: 'Upcoming Event 1',
            description: 'Description for upcoming event 1',
            image: i3,
            timing: 'Tomorrow 5:00 PM',
            club: 'Art Club',
            place: 'Room 205',
        },
        {
            title: 'Upcoming Event 2',
            description: 'Description for upcoming event 2',
            image: i4,
            timing: 'Next Week 3:00 PM',
            club: 'Dance Club',
            place: 'Main Hall',
        },
    ];

    const outdatedEvents = [
        {
            title: 'Outdated Event 1',
            description: 'Description for outdated event 1',
            image: i5,
            timing: 'Last Week 4:00 PM',
            club: 'Drama Club',
            place: 'Auditorium',
        },
        {
            title: 'Outdated Event 2',
            description: 'Description for outdated event 2',
            image: i1,
            timing: 'Last Month 10:00 AM',
            club: 'Tech Club',
            place: 'Room 101',
        },
    ];

    // Reusable card component for each event
    const EventCard = ({ event }) => (
        <div className="flex bg-white shadow-lg rounded-lg p-4 mb-8 w-full max-w-3xl mx-auto">
            <img src={event.image} alt={event.title} className="w-40 h-40 object-cover rounded-lg mr-4" />
            <div>
                <h3 className="text-xl font-bold">{event.title}</h3>
                <p className="text-gray-600">{event.description}</p>
                <p className="text-gray-500">
                    <strong>Timing:</strong> {event.timing}
                </p>
                <p className="text-gray-500">
                    <strong>Organized by:</strong> {event.club}
                </p>
                <p className="text-gray-500">
                    <strong>Place:</strong> {event.place}
                </p>
            </div>
        </div>
    );

    const handleSidebarHover = (isHovered) => {
        setSidebarExpanded(isHovered);
    };

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <Sidebar sidebarExpanded={sidebarExpanded} handleSidebarHover={handleSidebarHover} />

            <div className={`flex-1 flex flex-col`}>
                {/* Navbar */}
                <Navbar setShowLogout={setShowLogout} showLogout={showLogout} />

                <div className={`flex-1 p-6 transition-all duration-300 ${sidebarExpanded ? 'blur-md' : ''}`}>
                    {/* Live Events */}
                    <h2 className="text-2xl font-bold text-center mb-8">Live Events</h2>
                    {liveEvents.map((event, index) => (
                        <EventCard key={index} event={event} />
                    ))}

                    {/* Upcoming Events */}
                    <h2 className="text-2xl font-bold text-center mb-8">Upcoming Events</h2>
                    {upcomingEvents.map((event, index) => (
                        <EventCard key={index} event={event} />
                    ))}

                    {/* Outdated Events */}
                    <h2 className="text-2xl font-bold text-center mb-8">Outdated Events</h2>
                    {outdatedEvents.map((event, index) => (
                        <EventCard key={index} event={event} />
                    ))}
                </div>

                {/* Footer */}
                <footer className="bg-gray-800 text-white p-4 text-center">
                    <p>&copy; 2024 Website Name. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default EventsPage;
