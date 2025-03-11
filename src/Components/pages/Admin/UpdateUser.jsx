import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Homepage.css";

const UpdateUser = () => {
  const navigate = useNavigate();

  // States for Employee Data, Error Message, Success Message
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // To store the currently selected employee for editing
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 

  // Fetch all employees initially
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch all employees from the backend API
  const fetchEmployees = async () => {
    try {
      const response = await fetch("https://localhost:7117/api/index/get-employees-list");
      if (response.ok) {
        const data = await response.json();
        console.log(data);  // Ensure that department_id and hire_date are in the data
        setEmployees(data);
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      setError(`Error fetching employees data: ${error.message}`);
    }
  };

  // Handle input changes for the employee data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedEmployee({
      ...selectedEmployee,
      [name]: value,
    });
  };

  // Handle the form submission (update employee data)
  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedEmployeeData = {
      first_name: selectedEmployee.first_name,
      last_name: selectedEmployee.last_name,
      email: selectedEmployee.email,
      phone_number: selectedEmployee.phone_number,
      hire_date: selectedEmployee.hire_date,
      job_title: selectedEmployee.job_title,
      department_id: selectedEmployee.department_Id,
      salary: selectedEmployee.salary,
    };

    try {
      const response = await fetch(`https://localhost:7117/api/index/update-employee/${selectedEmployee.employee_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEmployeeData),
      });

      if (response.ok) {
        setSuccessMessage("Employee details updated successfully!");
        setTimeout(() => {
          setSuccessMessage("");
          fetchEmployees(); // Refresh employee data
        }, 2000);
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      setError(`Error updating employee data: ${error.message}`);
    }
  };

  // Handle selecting an employee for editing
  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
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

        {/* Employee Table Section */}
        <section className="content">
          <h1>Update Employee</h1>

          {error && <div className="error">{error}</div>}

          {/* Success Message */}
          {successMessage && <div className="success-message">{successMessage}</div>}

          {/* Display Employees in Table */}
          <table className="employee-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Hire Date</th>
                <th>Job Title</th>
                <th>Department ID</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr key={employee.employee_id}>
                    <td>{employee.employee_id}</td>
                    <td>{employee.first_name}</td>
                    <td>{employee.last_name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phone_number}</td>
                    <td>{employee.hire_date}</td>
                    <td>{employee.job_title}</td>
                    <td>{employee.department_Id}</td> {/* Ensure department_id is displayed here */}
                    <td>{employee.salary}</td>
                    <td>
                      <button onClick={() => handleEdit(employee)}>Update</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10">No employees found.</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* If an employee is selected, show the update form */}
          {selectedEmployee && (
            <form onSubmit={handleUpdate} className="user-form">
              <h2>Edit Employee Details</h2>
              <label>First Name</label>
              <input
                type="text"
                name="first_name"
                value={selectedEmployee ? selectedEmployee.first_name : ''}
                onChange={handleChange}
              />
              <label>Last Name</label>
              <input
                type="text"
                name="last_name"
                value={selectedEmployee ? selectedEmployee.last_name : ''}
                onChange={handleChange}
              />
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={selectedEmployee ? selectedEmployee.email : ''}
                onChange={handleChange}
              />
              <label>Phone Number</label>
              <input
                type="text"
                name="phone_number"
                value={selectedEmployee ? selectedEmployee.phone_number : ''}
                onChange={handleChange}
              />
              <label>Hire Date</label>
              <input
                type="date"
                name="hire_date"
                value={selectedEmployee ? selectedEmployee.hire_date : ''}
                onChange={handleChange}
              />
              <label>Job Title</label>
              <input
                type="text"
                name="job_title"
                value={selectedEmployee ? selectedEmployee.job_title : ''}
                onChange={handleChange}
              />
              <label>Department ID</label>
              <input
                type="text"
                name="department_id"
                value={selectedEmployee ? selectedEmployee.department_Id : ''}
                onChange={handleChange}
              />
              <label>Salary</label>
              <input
                type="number"
                name="salary"
                value={selectedEmployee ? selectedEmployee.salary : ''}
                onChange={handleChange}
              />
              <button type="submit" className="submit-btn">Update Employee</button>
            </form>
          )}
        </section>
      </main>
    </div>
  );
};

export default UpdateUser;
