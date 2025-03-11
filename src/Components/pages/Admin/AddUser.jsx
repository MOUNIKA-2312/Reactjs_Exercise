import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../styles/Homepage.css";
import "../styles/AddUser.css";

const AddUser = () => {
  const navigate = useNavigate();

  // State to store form values
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    hireDate: "",
    jobTitle: "",
    departmentId: "",
    salary: "",
  });

  // State for error messages
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form
  const validateForm = () => {
    let formErrors = {};
    let formIsValid = true;

    // Validate first name
    if (!formData.firstName) {
      formErrors.firstName = "First Name is required";
      formIsValid = false;
    }

    // Validate last name
    if (!formData.lastName) {
      formErrors.lastName = "Last Name is required";
      formIsValid = false;
    }

    // Validate email
    if (!formData.email) {
      formErrors.email = "Email is required";
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Email is invalid";
      formIsValid = false;
    }

    // Validate phone number
    if (!formData.phoneNumber) {
      formErrors.phoneNumber = "Phone Number is required";
      formIsValid = false;
    }

    // Validate hire date
    if (!formData.hireDate) {
      formErrors.hireDate = "Hire Date is required";
      formIsValid = false;
    }

    // Validate job title
    if (!formData.jobTitle) {
      formErrors.jobTitle = "Job Title is required";
      formIsValid = false;
    }

    // Validate department ID
    if (!formData.departmentId) {
      formErrors.departmentId = "Department ID is required";
      formIsValid = false;
    }

    // Validate salary
    if (!formData.salary) {
      formErrors.salary = "Salary is required";
      formIsValid = false;
    } else if (isNaN(formData.salary) || formData.salary <= 0) {
      formErrors.salary = "Salary must be a positive number";
      formIsValid = false;
    }

    setErrors(formErrors);
    return formIsValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Prepare the data object to send to the backend (matching backend format)
        const employeeData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone_number: formData.phoneNumber,
          hire_date: formData.hireDate,
          job_title: formData.jobTitle,
          department_Id: formData.departmentId,
          salary: parseFloat(formData.salary), // Ensure salary is a number
        };

        // Send POST request to backend API
        const response = await fetch("https://localhost:7117/api/index/create-new-employee", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeeData),
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          console.error("Error response:", errorMessage);
          throw new Error("Failed to add employee: " + errorMessage);
        }

        // Show alert with success message
        alert("Employee added successfully!");

        // Clear form fields after success
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          hireDate: "",
          jobTitle: "",
          departmentId: "",
          salary: "",
        });

        // Redirect to the same page (Add Employee page) after success
        navigate("/Admin/add-user"); // Redirect to the same page

      } catch (error) {
        // Handle errors
        console.error("Error:", error); // Debugging log
        alert(`Error: ${error.message}`);
      }
    } else {
      console.log("Form validation failed.");
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
            <img src=" " alt="Profile" className="profile-pic" />
          </div>
        </header>

        {/* Add User Form */}
        <section className="content">
          <h1>Add Employee</h1>
          <form onSubmit={handleSubmit} className="user-form">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              {errors.firstName && <p className="error">{errors.firstName}</p>}
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              {errors.lastName && <p className="error">{errors.lastName}</p>}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
              {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
            </div>

            <div className="form-group">
              <label>Hire Date</label>
              <input
                type="date"
                name="hireDate"
                value={formData.hireDate}
                onChange={handleChange}
                required
              />
              {errors.hireDate && <p className="error">{errors.hireDate}</p>}
            </div>

            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                required
              />
              {errors.jobTitle && <p className="error">{errors.jobTitle}</p>}
            </div>

            <div className="form-group">
              <label>Department ID</label>
              <input
                type="text"
                name="departmentId"
                value={formData.departmentId}
                onChange={handleChange}
                required
              />
              {errors.departmentId && <p className="error">{errors.departmentId}</p>}
            </div>

            <div className="form-group">
              <label>Salary</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
              />
              {errors.salary && <p className="error">{errors.salary}</p>}
            </div>

            <button type="submit" className="submit-btn">Add Employee</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default AddUser;
