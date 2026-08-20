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

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create-trip" element={<CreateTrip />} />
      <Route path="*" element={<NotFound />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path='/trips-detail' element={<TripsDetail />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes