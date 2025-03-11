import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Homepage.css"; // Ensure this CSS file is properly styled

const Homepage = () => {
  const navigate = useNavigate();

  // Dummy user details
  const user = {
    name: "Mounika",
    profilePic: "https://via.placeholder.com/40", // Replace with actual profile image
  };

  return (
    <div className="homepage-container">
      {/* Left Sidebar */}
      <aside className="sidebar">
        <h1>Dashboard</h1>
        <ul>
          {/* Updated navigation */}
          <li onClick={() => navigate("/login/User/homepage")}>Home</li> {/* Navigate to Home */}
          <li onClick={() => navigate("/login/User/search")}>Search</li> {/* Navigate to Search */}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Header */}
        <header className="top-bar">
          <div className="welcome">Welcome, {user.name}!</div>
          <div className="top-right">
            <button onClick={() => navigate("/login")}>Logout</button>
            <div>
              <img src={user.profilePic} alt="Profile" className="profile-pic" />
            </div>
          </div>
        </header>

        {/* Main Section */}
        <section className="content">
          <h1>Welcome User</h1>
          <p></p>
        </section>
      </main>
    </div>
  );
};

export default Homepage;
