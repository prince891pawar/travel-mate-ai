import { Routes, Route } from "react-router-dom";
import React from "react"; 
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import Trips from "../pages/trips";

const AppRoutes = () => {
    return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />

           <Route element={<ProtectedRoute />}>
          <Route path="/Trips" element={<Trips />} />
        </Route>
        </Routes>    
    )
}

export default AppRoutes