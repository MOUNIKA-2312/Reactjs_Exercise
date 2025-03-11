import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignUp from "./Components/pages/Admin/LoginSignUp"; // Import LoginSignUp component
import Homepage from "./Components/pages/Admin/Homepage"; // Import Homepage component
import AddUser from "./Components/pages/Admin/AddUser"; // Create AddUser component
import UpdateUser from "./Components/pages/Admin/UpdateUser"; // Create UpdateUser component
import DeleteUser from "./Components/pages/Admin/DeleteUser"; // Create DeleteUser component
import LoginUser from "./Components/pages/User/LoginUser";
import HomeUser from "./Components/pages/User/HomeUser";
import SearchUser from "./Components/pages/User/SearchUser";
// import "./styles/App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define the route for the LoginSignUp page as the default */}
        <Route path="/" element={<LoginSignUp />} /> {/* Default route is LoginSignUp */}
         <Route path="/login" element={<LoginUser />} />
        {/* Add other routes for the app */}
        <Route path="Admin/homepage" element={<Homepage />} />
        <Route path="Admin/add-user" element={<AddUser />} />
        <Route path="Admin/update-user" element={<UpdateUser />} />
        <Route path="Admin/delete-user" element={<DeleteUser />} />
        <Route path="/login/User/homepage" element={<HomeUser />} />
        <Route path="/login/User/search" element={<SearchUser />} />

       
      </Routes>
    </Router>
  );
};

export default App;
