import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './HeroPage.css'

const HeroPage = () => {
  const [destination, setDestination] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [travelers, setTravelers] = useState(2)

  const handleGenerateTrip = () => {
    console.log({ destination, checkIn, checkOut, travelers })
    // Add trip generation logic here
  }

  return (
    <div className="hero-container">
      {/* Background Image */}
      <div className="hero-background"></div>

      <div className="hero-content">
        {/* Header */}
        <div className="hero-header">
          <span className="ai-badge">✨ AI-Powered Travel Planner</span>
        </div>

        {/* Main Title */}
        <div className="hero-title">
          <h1>
            Your <span className="gradient-text">AI Travel</span>
            <br />
            Companion
          </h1>
        </div>

        {/* Description */}
        <p className="hero-description">
          Plan the perfect trip in seconds with personalized itineraries, smart recommendations and unbeatable deals.
        </p>

        {/* Features */}
        <div className="features">
          <div className="feature-item">
            <span className="feature-icon">🗺️</span>
            <span>AI Itinerary</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🏨</span>
            <span>Best Hotels</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🍴</span>
            <span>Local Food</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">💎</span>
            <span>Hidden Gems</span>
          </div>
        </div>

        {/* Search Form */}
        <div className="search-form">
          <div className="form-group">
            <label>Where to?</label>
            <input
              type="text"
              placeholder="Search destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Check in</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Check out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Travelers</label>
            <select
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              className="form-input"
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5+</option>
            </select>
          </div>

          <button
            onClick={handleGenerateTrip}
            className="generate-btn"
          >
            ✨ Generate Trip
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeroPage