import React, { useState } from 'react';
import Navbar from './nav'; // Adjust the path as necessary
import Sidebar from './sidebar'; // Import Sidebar component

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [sidebarExpanded, setSidebarExpanded] = useState(false); // State for sidebar expansion
  const [darkMode, setDarkMode] = useState(true); // State for dark mode

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle form submission (send data to an API)
    try {
      const response = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful submission
        setSuccessMessage('Form submitted successfully! We will get back to you soon.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: '',
        });
      } else {
        // Handle submission error
        const errorData = await response.json();
        console.error('Error submitting form:', response.status, errorData);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleSidebarHover = (isHovered) => {
    setSidebarExpanded(isHovered);
  };

  const handleToggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      {/* Navbar */}
      <Navbar darkMode={darkMode} handleToggleDarkMode={handleToggleDarkMode} />

      <div className="flex flex-1 ml-70 mt-16">
        {/* Sidebar */}
        <Sidebar sidebarExpanded={sidebarExpanded} handleSidebarHover={handleSidebarHover} />

        <div className={`flex-1 flex justify-center items-start px-4 transition-all duration-300 ${sidebarExpanded ? 'blur-md' : ''}`}>
          <div className="flex space-x-8">
            {/* Left Side Text Section with Gradient Background */}
            <div className="bg-gradient-to-b from-sky-400 to-white p-8 w-full max-w-md rounded-lg shadow-md transition-transform duration-300 hover:translate-y-1">
              <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-black' : 'text-gray-800'}`}>Contact Information</h2>
              <p className={`mb-2 ${darkMode ? 'text-black' : 'text-gray-700'}`}>For any inquiries, please feel free to reach out to us. We are here to help you with any questions or issues you might have.</p>
              <p className={`mb-2 ${darkMode ? 'text-black' : 'text-gray-700'}`}>You can contact us via:</p>
              <ul className="list-disc list-inside">
                <li className={`list-item ${darkMode ? 'text-black' : 'text-gray-700'}`}>Email: vimap.gmail.com</li>
                <li className={`list-item ${darkMode ? 'text-black' : 'text-gray-700'}`}>Phone: 9848038168</li>
                <li className={`list-item ${darkMode ? 'text-black' : 'text-gray-700'}`}>Address: Vit-ap University,near ap-secratariat,MH-2 626 </li>
              </ul>
            </div>

            {/* Right Side Contact Form */}
            <div className={`p-8 rounded-lg w-full max-w-md border-2 border-black shadow-2xl transition-transform duration-300 hover:translate-y-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-800'}`}>
              <h2 className={`text-3xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-white'}`}>Get in Touch</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 ${darkMode ? 'border-gray-600 bg-gray-800 text-white focus:ring-blue-500' : 'border-gray-300 bg-white text-black focus:ring-blue-500'}`}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 ${darkMode ? 'border-gray-600 bg-gray-800 text-white focus:ring-blue-500' : 'border-gray-300 bg-white text-black focus:ring-blue-500'}`}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 ${darkMode ? 'border-gray-600 bg-gray-800 text-white focus:ring-blue-500' : 'border-gray-300 bg-white text-black focus:ring-blue-500'}`}
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 ${darkMode ? 'border-gray-600 bg-gray-800 text-white focus:ring-blue-500' : 'border-gray-300 bg-white text-black focus:ring-blue-500'}`}
                  />
                </div>
                <div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 ${darkMode ? 'border-gray-600 bg-gray-800 text-white focus:ring-blue-500' : 'border-gray-300 bg-white text-black focus:ring-blue-500'}`}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                >
                  Send Message
                </button>
              </form>

              {successMessage && (
                <p className={`mt-4 text-center ${darkMode ? 'text-green-400' : 'text-green-600'}`}>{successMessage}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white p-4 text-center fixed bottom-0 left-0 w-full">
        <p>&copy; 2024 Website Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ContactForm;
