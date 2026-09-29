import { Routes, Route } from 'react-router-dom'
import React from 'react'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'
import ProtectedRoute from './ProtectedRoute'
import Trips from '../pages/Trips'
import Dashboard from '../pages/Dashboard'
import CreateTrip from '../pages/CreateTrip'
import TripsDetail from '../pages/TripsDetails'
import DashboardLayout from '../layouts/DashboardLayout'
import Wishlist from '../pages/Wishlist'
import History from '../pages/History'
import Profile from '../pages/Profile'
import Settings from '../pages/Settings'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/trip/:id" element={<TripsDetail />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes