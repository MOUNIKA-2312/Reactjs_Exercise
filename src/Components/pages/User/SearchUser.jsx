import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Homepage.css"; // Ensure this CSS file is properly styled

const SearchPage = () => {
  const navigate = useNavigate();

  // Dummy user details
  const user = {
    name: "Mounika",
    profilePic: "https://via.placeholder.com/40", // Replace with actual profile image
  };

  // State to manage employee ID input and employee details
  const [Employee_id, setEmployeeId] = useState("");
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [error, setError] = useState("");

  const handleEmployeeSearch = async () => {
    if (!Employee_id) {
      setError("Please enter a valid employee ID.");
      return;
    }

    try {
      // Correctly include the employeeId in the URL for the API call
      const response = await fetch(`https://localhost:7117/api/index/get-employee-by-id/${Employee_id}`);

      if (response.ok) {
        const data = await response.json();

        // Log the response to make sure it's the expected structure
        console.log("Employee data:", data);

        // Assuming the backend returns the employee data directly, we store it in the state
        setEmployeeDetails(data); // Set the employee details in the state
        setError(""); // Clear any previous errors
      } else {
        setError("Employee not found.");
        setEmployeeDetails(null); // Clear previous employee details if not found
      }
    } catch (error) {
      setError("Error fetching employee details.");
      setEmployeeDetails(null); // Clear previous employee details on error
    }
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
          <h1>Search Employee</h1>
          <div>
            <input
              type="number"
              placeholder="Enter Employee ID"
              value={Employee_id}
              onChange={(e) => setEmployeeId(e.target.value)} // Update ID state
            />
            <button onClick={handleEmployeeSearch}>Search</button>
          </div>

          {/* Display employee details */}
          {error && <p className="error">{error}</p>}
          {employeeDetails && (
            <div className="employee-details">
              <h2>Employee Details</h2>
              <p><strong>ID:</strong> {employeeDetails.employee_id}</p>
              <p><strong>First Name:</strong> {employeeDetails.first_name}</p>
              <p><strong>Last Name:</strong> {employeeDetails.last_name}</p>
              <p><strong>Email:</strong> {employeeDetails.email}</p>
              <p><strong>Phone Number:</strong> {employeeDetails.phone_number}</p>
              <p><strong>Hire Date:</strong> {new Date(employeeDetails.hire_date).toLocaleDateString()}</p>
              <p><strong>Job Title:</strong> {employeeDetails.job_title}</p>
              <p><strong>Department ID:</strong> {employeeDetails.department_Id}</p>
              <p><strong>Salary:</strong> ${employeeDetails.salary}</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default SearchPage;
