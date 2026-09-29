import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'

const Login = () => {

const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

 const handleSubmit = async (e) => {
  e.preventDefault();

  // Validation
  if (!formData.email || !formData.password) {
    alert("Please fill all fields");
    return;
  }

  try {
    setLoading(true);
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    console.log("Login response:", data);

    // AuthContext me user + JWT save karna
    login(data.user, data.token);

    // Dashboard par bhejna
    navigate("/dashboard");

  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-screen-2xl flex-col lg:flex-row">
        <div className="relative flex-1 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.12),_transparent_35%)] bg-white px-5 py-9 sm:px-10 lg:px-14 lg:py-16">
          <div className="relative z-10 flex h-full flex-col justify-center gap-8">
            <div className="inline-flex items-center gap-3 rounded-full bg-slate-900/90 px-4 py-2 text-white shadow-lg shadow-slate-900/10 ring-1 ring-white/20">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-lg font-bold text-white">
                ✈
              </span>
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-200">Travel Mate AI</p>
              </div>
            </div>

            <div className="max-w-xl">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Plan Smarter.
                <span className="block text-blue-600">Travel Better.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-700">
                Let AI create personalized itineraries, so you can focus on making memories. Secure travel planning with smart recommendations and fast booking workflows.
              </p>
            </div>

            <div className="grid max-w-md gap-4 sm:grid-cols-3">
              {[
                { label: 'AI Itinerary' },
                { label: 'Smart Planning' },
                { label: 'Secure & Easy' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-slate-200/80 bg-white/80 px-4 py-4 shadow-sm shadow-slate-900/5"
                >
                  <p className="text-sm font-medium text-slate-900">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center bg-slate-50 px-4 py-8 sm:px-10 lg:px-12 lg:py-12">
          <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5 sm:p-8">
            <div className="mb-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600">Welcome Back</p>
              <h2 className="mt-4 text-2xl font-semibold text-slate-900 sm:text-3xl">Login to continue your journey</h2>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-slate-700">
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="mt-2 min-h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-100"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Password
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="mt-2 min-h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-100"
                />
              </label>

              <div className="flex items-center justify-between text-sm text-slate-600">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  Remember me
                </label>
                <Link to="/" className="font-medium text-blue-600 hover:text-blue-700">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 active:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                disabled={loading}
               >
                {loading ? 'Logging in...' : 'Login'}   
                  
              </button>
            </form>

            <div className="mt-6 flex items-center gap-3 text-sm text-slate-500">
              <span className="h-px flex-1 bg-slate-200"></span>
              <span>OR</span>
              <span className="h-px flex-1 bg-slate-200"></span>
            </div>

            <button
              type="button"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <span className="text-xl">G</span>
              Continue with Google
            </button>

            <p className="mt-6 text-center text-sm text-slate-600">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
