import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/nav';
import Sidebar from '../navbar/sidebar';

const Eve = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [liveeve,setLive] = useState([]);
  const [upcomeve,setUpcom] = useState([]);
  const [outeve, setOut] = useState([]);
  const [showLogout, setShowLogout] = useState(true);

  useEffect(()=>{
    const fetch1 = async ()=>{
        try{
            const res = await fetch(`http://localhost:5000/live`);
            if(res.ok){
                const data = await res.json();
                setLive(data);
            }
            else{
                console.log("Falied to fetch data");
            }
        }
        catch(error){
            console.log("Error fetching details",error);
        }
    };
    fetch1();

  },[]);

  useEffect(()=>{
    const fetch2 = async ()=>{
        try{
            const res1 = await fetch(`http://localhost:5000/upcom`);
            if(res1.ok){
                const data1 = await res1.json();
                setUpcom(data1);
            }
            else{
                console.log("Falied to fetch data");
            }
        }
        catch(error){
            console.log("Error fetching details",error);
        }
    };
    fetch2();
  },[]);

  useEffect(()=>{
    const fetch3 = async ()=>{
        try{
            const res2 = await fetch(`http://localhost:5000/outdate`);
            if(res2.ok){
              const data2 = await res2.json();
              setOut(data2);
            }
            else{
                console.log("Falied to fetch data");
            }
        }
        catch(error){
            console.log("Error fetching details",error);
        }
    };
    fetch3();
  },[]);

  

  const filteredLiveEvents = liveeve.filter(
    (event) =>
      event.ename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.eclub.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.edescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUpcomingEvents = upcomeve.filter(
    (event) =>
      event.ename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.eclub.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.edescription.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredOutdatedEvents = outeve.filter(
    (event) =>
      event.ename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.eclub.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.edescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSidebarHover = (isHovered) => {
    setSidebarExpanded(isHovered);
  };

  const handleToggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <Sidebar sidebarExpanded={sidebarExpanded} handleSidebarHover={handleSidebarHover} />
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarExpanded ? 'ml-64' : 'ml-20'
        }`} // Ensure the main content has space for the sidebar
      >
        <div className="fixed top-0 left-0 right-0 z-40">
          <Navbar darkMode={darkMode} setShowLogout={setShowLogout} showLogout={showLogout} handleToggleDarkMode={handleToggleDarkMode} />
        </div>
        <div className="p-6 mt-16">
          {/* Header */}
          <header className="bg-gradient-to-r from-blue-500 to-teal-400 text-white py-8 text-center rounded-lg mb-6">
            <h1 className="text-4xl font-bold mb-2">College Events</h1>
            <p className="text-lg">Explore the latest events happening in college</p>
            <div className="mt-6">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for events..."
                className="w-64 p-3 rounded-full text-gray-700 focus:outline-none shadow-md"
              />
            </div>
          </header>

          {/* Live Events Section */}
          <section className="my-10">
            <h2 className="text-3xl font-semibold border-b-4 border-blue-500 mb-6 pb-2">Live Events</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredLiveEvents.length > 0 ? (
                filteredLiveEvents.map((event, index) => (
                  <div
                    key={index}
                    className={`rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 overflow-hidden ${
                      darkMode ? 'bg-black text-white' : 'bg-white text-black'
                    }`}
                  >
                    <img src={event.eimage} alt={event.ename} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{event.ename}</h3>
                      <p><strong>Club:</strong> {event.eclub}</p>
                      <p><strong>Time:</strong> {event.etiming}</p>
                      <p><strong>Venue:</strong> {event.evenue}</p>
                      <p className="mt-2">{event.edescription}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No events found.</p>
              )}
            </div>
          </section>

          {/* Upcoming Events Section */}
          <section className="my-10">
            <h2 className="text-3xl font-semibold border-b-4 border-blue-500 mb-6 pb-2">Upcoming Events</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredUpcomingEvents.length > 0 ? (
                filteredUpcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className={`rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 overflow-hidden ${
                      darkMode ? 'bg-black text-white' : 'bg-white text-black'
                    }`}
                  >
                    <img src={event.eimage} alt={event.ename} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                      <p><strong>Club:</strong> {event.eclub}</p>
                      <p><strong>Time:</strong> {event.etiming}</p>
                      <p><strong>Venue:</strong> {event.evenue}</p>
                      <p className="mt-2">{event.edescription}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No events found.</p>
              )}
            </div>
          </section>


          {/* Outdated Events Section */}
          <section className="my-10">
            <h2 className="text-3xl font-semibold border-b-4 border-blue-500 mb-6 pb-2">Outdated Events</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredOutdatedEvents.length > 0 ? (
                filteredOutdatedEvents.map((event, index) => (
                  <div
                    key={index}
                    className={`rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 overflow-hidden ${
                      darkMode ? 'bg-black text-white' : 'bg-white text-black'
                    }`}
                  >
                    <img src={event.eimage} alt={event.ename} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                      <p><strong>Club:</strong> {event.eclub}</p>
                      <p><strong>Time:</strong> {event.etiming}</p>
                      <p><strong>Venue:</strong> {event.evenue}</p>
                      <p className="mt-2">{event.edescription}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No events found.</p>
              )}
            </div>
          </section>
        </div>

        

        {/* Footer */}
        <footer className={`p-4 text-center ${darkMode ? 'bg-black text-white' : 'bg-gray-800 text-white'}`}>
          <p>&copy; 2024 College Events Portal</p>
        </footer>
      </div>
    </div>
  );
};

export default Eve;
