# ✈️ Travel Mate AI

> An AI-powered travel planning web application that helps users create personalized trips, manage itineraries, estimate budgets, and explore destinations — all in one place.

## 🌍 About The Project

**Travel Mate AI** is a modern travel planning application designed to make trip planning simple and organized.

Instead of manually searching for destinations, hotels, activities, transportation, and expenses, users can create a trip and manage their complete travel plan from a single interface.

The project is being developed with a **React-based frontend**, with backend and AI features planned for the next phase.

---

## ✨ Features

### 🧳 Trip Planning

* Create a new trip
* Select destination
* Set travel dates
* Add number of travelers
* Choose travel preferences

### 🗺️ Itinerary

* Organize trip day-by-day
* Add activities
* Display travel schedule
* Show activities in an easy-to-understand format

### 🏨 Hotel Recommendations

* Display recommended hotels
* Hotel information cards
* Rating and price information
* Location-based recommendations

### 💰 Budget Breakdown

* Calculate estimated trip expenses
* Accommodation cost
* Transportation cost
* Food expenses
* Activities and other expenses
* Display total estimated budget

### 📍 Destinations

* Explore popular destinations
* Destination information
* Travel-related recommendations

### 🔐 Authentication

Planned authentication system includes:

* User registration
* Login
* JWT authentication
* Protected routes
* User-specific trips

### 🤖 AI Travel Planning

Planned AI functionality:

* Personalized trip generation
* AI-generated itineraries
* Destination recommendations
* Activity suggestions
* Budget-aware travel planning

---

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* Tailwind CSS
* React Router
* Vite

### Backend — Planned

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Nodemailer

### AI — Planned

* Generative AI API
* AI-based itinerary generation
* Personalized travel recommendations

### Tools

* Git
* GitHub
* VS Code
* Postman

---

## 📂 Project Structure

```text
travel-mate-ai/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── TripCard.jsx
│   │   ├── DayCard.jsx
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── CreateTrip.jsx
│   │   ├── Trips.jsx
│   │   ├── TripDetails.jsx
│   │   ├── Itinerary.jsx
│   │   ├── HotelRecommendations.jsx
│   │   ├── BudgetBreakdown.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
└── README.md
```

> Folder structure may change as the project continues to grow.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/travel-mate-ai.git
```

### 2. Go to Project Directory

```bash
cd travel-mate-ai
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

---

## 🔑 Environment Variables

When backend/API integration is added, create a `.env` file in the project root.

Example:

```env
VITE_API_URL=your_backend_url
VITE_AI_API_KEY=your_api_key
```

**Never upload real API keys or secrets to GitHub.**

---

## 🖥️ Application Flow

```text
Home
  ↓
Create Trip
  ↓
Trip Details
  ↓
Itinerary
  ↓
Hotel Recommendations
  ↓
Budget Breakdown
  ↓
Complete Trip Plan
```

---

## 🎯 Project Goals

The main goal of Travel Mate AI is to build an intelligent travel assistant that can:

* Reduce travel planning time
* Generate personalized itineraries
* Recommend suitable hotels and activities
* Estimate travel expenses
* Keep all trip information organized
* Provide AI-powered travel suggestions

---

## 🔮 Future Improvements

* [ ] Backend API integration
* [ ] MongoDB database integration
* [ ] User authentication
* [ ] JWT-based protected routes
* [ ] AI itinerary generation
* [ ] Real-time hotel recommendations
* [ ] Flight recommendations
* [ ] Weather information
* [ ] Google Maps integration
* [ ] Save and edit trips
* [ ] Share trips with friends
* [ ] Mobile responsive improvements
* [ ] Dark mode
* [ ] Trip export as PDF

---

## 📸 Screenshots

Add screenshots of the application here:

```text
/screenshots/
├── home.png
├── create-trip.png
├── trips.png
├── itinerary.png
├── hotels.png
└── budget.png
```

Example:

### Home Page

![Home Page](screenshots/home.png)

### Itinerary

![Itinerary](screenshots/itinerary.png)

### Budget Breakdown

![Budget Breakdown](screenshots/budget.png)

---

## 🧠 What I Learned

While building Travel Mate AI, I am working with:

* React component architecture
* React Router
* State management
* Context API
* Protected routes
* Responsive UI development
* Tailwind CSS
* API integration
* Backend architecture
* MongoDB
* Authentication
* AI integration
* Full-stack application development

---

## 🚧 Project Status

**Current Status:** 🚧 In Development

The frontend UI and core trip-planning screens are being developed first. Backend, database, authentication, and AI functionality will be integrated in the next development phase.

---

## 🤝 Contributing

Contributions, suggestions, and feedback are welcome.

If you want to contribute:

```bash
git fork
```

Create your feature branch:

```bash
git checkout -b feature/your-feature
```

Commit your changes:

```bash
git commit -m "Add your feature"
```

Push the branch:

```bash
git push origin feature/your-feature
```

Then create a Pull Request.

---

## 👨‍💻 Author

**Prince Pawar**

BCA Student | Full Stack Developer

Interested in:

* Full Stack Development
* MERN Stack
* Artificial Intelligence
* Software Engineering

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

### ✈️ Travel Mate AI

**Plan smarter. Travel better. Explore more.**
