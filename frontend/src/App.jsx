import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./screens/login/login"; 
import './App.css';
import HomePage from "./screens/home/home";
import EventsPage from "./screens/navbar/events";
import AboutUsPage from "./screens/navbar/about";
import ContactUs from "./screens/navbar/contact";
import CampusAi from "./screens/navbar/chat";
import Eve from "./screens/navbar/event";
import Map from "./screens/navbar/Map";
import Register from "./screens/login/register";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        
      
          
            <Route path="/home" element={<HomePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/chat" element={<CampusAi />} />
            <Route path="/eve" element={<Eve/>}/>
            <Route path="/maps" element={<Map/>}/>
            <Route path="/register" element={<Register/>}/>
      </Routes>
    </Router>
  );
};

export default App;
