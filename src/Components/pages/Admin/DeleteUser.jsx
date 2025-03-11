import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Homepage.css";

const DeleteUser = () => {
  const navigate = useNavigate();

  // State for Employee ID, Error Message, and Success Message
  const [employeeId, setEmployeeId] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle the change in Employee ID
  const handleEmployeeIdChange = (e) => {
    setEmployeeId(e.target.value);
  };

  // Handle the deletion logic
  const handleDelete = async () => {
    // Validate the Employee ID is provided
    if (!employeeId) {
      setError("Please enter a valid Employee ID.");
      return;
    }

    try {
      // Send a DELETE request to the backend API to delete the employee
      const response = await fetch(`https://localhost:7117/api/index/delete-employee/${employeeId}`, {
        method: "DELETE",
      });

      // Handle the response from the backend
      if (response.ok) {
        // Employee deleted successfully
        setSuccessMessage("Employee deleted successfully!");

        // Show a pop-up alert with the success message
        alert("Employee details deleted successfully!");

        // Redirect to the same page after 2 seconds
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/Admin/delete-user"); // Reload the same page
        }, 2000);
      } else {
        // If employee not found or error occurs
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      // Handle any errors that occur during the fetch
      setError(`Error: ${error.message}`);
    }
  };

  return (
    <div className="homepage-container">
      {/* Left Sidebar */}
      <aside className="sidebar">
        <h1>Dashboard</h1>
        <ul>
          <li onClick={() => navigate("/Admin/homepage")}>Home</li>
          <li onClick={() => navigate("/Admin/add-user")}>Add User</li>
          <li onClick={() => navigate("/Admin/update-user")}>Update User</li>
          <li onClick={() => navigate("/Admin/delete-user")}>Delete User</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Header */}
        <header className="top-bar">
          <div className="welcome">Welcome Admin</div>
          <div className="top-right">
            <button onClick={() => navigate("/")}>Logout</button>
            <div>
              <img src=" " alt="Profile" className="profile-pic" />
            </div>
          </div>
        </header>

        {/* Delete Employee Section */}
        <section className="content">
          <h1>Delete Employee</h1>

          <input
            type="text"
            placeholder="Enter Employee ID to delete"
            value={employeeId}
            onChange={handleEmployeeIdChange}
          />
          <button onClick={handleDelete}>Delete Employee</button>

          {error && <div className="error">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}
        </section>
      </main>
    </div>
  );
};

export default DeleteUser;
