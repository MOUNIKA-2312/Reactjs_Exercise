import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Homepage.css" // Ensure this CSS file is properly styled
//import  profilePic from "../Assets/person.png";
const Homepage = () => {
  const navigate = useNavigate();

  // Dummy user details
  const user = {
    name: "John Doe",
    profilePic: "https://via.placeholder.com/40", // Replace with actual profile image
  };

  return (
    <div className="homepage-container">
      {/* Left Sidebar */}
      <aside className="sidebar">
        <h1>Dashboard</h1>
        <ul>
          <li onClick={() => navigate("/Admin/homepage")}>Home</li> {/* Navigate to Home */}
          <li onClick={() => navigate("/Admin/add-user")}>Add User</li> {/* Navigate to Add User */}
          <li onClick={() => navigate("/Admin/update-user")}>Update User</li> {/* Navigate to Update User */}
          <li onClick={() => navigate("/Admin/delete-user")}>Delete User</li> {/* Navigate to Delete User */}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Header */}
        <div className="top-bar">
          <div className="welcome">Welcome, {user.name}!</div>
          <div className="top-right">
            <div>
            <button onClick={() => navigate("/")}>Logout</button>
            </div>
            <div>

              <img src={user.profilePic} alt="Profile" className="profile-pic" />
            </div>
          </div>
        </div>

        {/* Main Section */}
        <section className="content">
          <h1>Welcome Admin</h1>
          <p></p>
        </section>
      </main>
    </div>
  );
};

export default Homepage;
