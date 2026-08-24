# ✈️ Travel Mate AI

An AI-powered trip planning web application that helps users create personalized travel plans, explore destinations, plan day-wise itineraries, estimate budgets, discover hotels, and get useful travel tips — all in one place.

## 🌍 Overview

**Travel Mate AI** is a full-stack travel planning application designed to make trip planning simple and personalized.

Instead of manually searching for destinations, hotels, routes, budgets, and daily activities, users can create a trip and get all the important travel information organized in one place.

## ✨ Features

* 🤖 AI-powered trip planning
* 🔐 User authentication
* 🗺️ Personalized trip creation
* 📅 Day-wise itinerary
* 💰 Budget breakdown
* 🏨 Hotel recommendations
* 🧭 Travel tips
* 📍 Route and destination information
* 📱 Responsive UI
* 💾 Trip history
* 🔒 Protected routes
* 🌐 Full-stack architecture

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* Tailwind CSS
* React Router
* Redux Toolkit
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt
* REST APIs

### Tools & APIs

* Git & GitHub
* Postman
* MongoDB Atlas
* AI API
* Maps/Location APIs

## 📂 Project Structure

```text
travel-mate/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── context/
│   │   ├── redux/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🚀 Main User Flow

```text
User
 │
 ▼
Landing Page
 │
 ▼
Login / Signup
 │
 ▼
Create Trip
 │
 ▼
AI Trip Planning
 │
 ├── Destination
 ├── Duration
 ├── Budget
 ├── Travelers
 │
 ▼
Trip Details
 │
 ├── Itinerary
 ├── Budget Breakdown
 ├── Hotel Recommendations
 └── Travel Tips
 │
 ▼
Save Trip
 │
 ▼
Trip History
```

## 🔐 Authentication

Travel Mate AI uses JWT-based authentication.

### Authentication Flow

```text
Signup
   ↓
Backend validates user
   ↓
Password hashed using bcrypt
   ↓
User stored in MongoDB
   ↓
Login
   ↓
JWT Token Generated
   ↓
Token stored on Client
   ↓
Protected Routes
```

Protected pages are accessible only to authenticated users.

## 🤖 AI Trip Planning

The AI trip planner generates a personalized travel plan based on user preferences such as:

* Destination
* Number of days
* Number of travelers
* Budget
* Travel preferences

The generated result can include:

* Daily activities
* Places to visit
* Estimated expenses
* Hotels
* Travel suggestions
* Important travel tips

## 📅 Day-wise Itinerary

Each trip contains a day-wise itinerary.

Example:

```text
Day 1
 ├── Morning Activity
 ├── Afternoon Activity
 ├── Evening Activity
 └── Estimated Cost

Day 2
 ├── Morning Activity
 ├── Afternoon Activity
 ├── Evening Activity
 └── Estimated Cost
```

This makes the generated trip easy to understand and follow.

## 💰 Budget Breakdown

The application organizes estimated trip expenses into different categories:

* 🏨 Hotel
* 🍔 Food
* 🚕 Transportation
* 🎟️ Activities
* 💳 Other Expenses

Users can therefore get an approximate idea of how much their trip may cost.

## 🏨 Hotel Recommendations

Travel Mate AI provides hotel recommendations based on the selected destination and trip requirements.

Hotel information can include:

* Hotel name
* Location
* Price range
* Rating
* Description
* Booking information

## 🧭 Travel Tips

The application provides useful destination-specific tips such as:

* Best time to visit
* Transportation
* Money & payments
* What to pack
* Local travel advice

## 📱 Responsive Design

The application is designed to work across different screen sizes:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📲 Tablet

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/travel-mate.git
```

### 2. Go to Project

```bash
cd travel-mate
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 4. Install Backend Dependencies

Open another terminal:

```bash
cd backend
npm install
```

## 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

AI_API_KEY=your_ai_api_key
```

Never upload your `.env` file to GitHub.

Make sure `.env` is included in `.gitignore`.

## ▶️ Run the Application

### Start Backend

```bash
cd backend
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

### Start Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

Frontend will run on the Vite development server.

## 🔌 API Structure

Example backend API structure:

```text
/api/auth
    POST /signup
    POST /login

/api/trips
    POST /
    GET /
    GET /:id
    PUT /:id
    DELETE /:id

/api/ai
    POST /generate-trip
```

## 🗄️ Database

MongoDB is used as the primary database.

Possible collections:

```text
users
trips
```

### User

```text
User
 ├── name
 ├── email
 ├── password
 └── createdAt
```

### Trip

```text
Trip
 ├── userId
 ├── destination
 ├── duration
 ├── travelers
 ├── budget
 ├── itinerary
 ├── hotels
 ├── travelTips
 └── createdAt
```

## 🔒 Security

The application implements basic security practices including:

* JWT authentication
* Password hashing with bcrypt
* Protected API routes
* Protected frontend routes
* Environment variables for secrets
* MongoDB authentication

## 📸 Screenshots

Add your project screenshots here.

Example:

```markdown
![Home Page](./screenshots/home.png)

![Trip Planner](./screenshots/trip-planner.png)

![Itinerary](./screenshots/itinerary.png)

![Budget](./screenshots/budget.png)
```

## 🔮 Future Improvements

Planned improvements include:

* 🌤️ Live weather integration
* 🗺️ Interactive maps
* 📍 Real-time route optimization
* 💳 Online booking integration
* 🔔 Trip reminders
* 🌐 Multi-language support
* 📱 Progressive Web App support
* 🤖 More advanced AI recommendations
* 📊 User travel analytics

## 🎯 Project Goal

The main goal of Travel Mate AI is to build a single platform where users can plan their entire trip without switching between multiple travel websites and applications.

## 👨‍💻 Author

**Prince Pawar**

Full Stack Developer | MERN Stack

### Skills

* React.js
* JavaScript
* Node.js
* Express.js
* MongoDB
* REST APIs
* Git & GitHub

## ⭐ Support

If you like this project, consider giving the repository a ⭐ on GitHub.

---

**Built with ❤️ using React, Node.js, Express.js and MongoDB.**
