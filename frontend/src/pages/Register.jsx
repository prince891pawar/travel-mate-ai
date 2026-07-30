import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'

const Register = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      alert('Please fill all fields')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    try {
      setLoading(true)

      const userData = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
      }
      const token = 'dummy-jwt-token'

      login(userData, token)
      navigate('/Trips')
    } catch (error) {
      console.error(error)
      alert('Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
        <div className="relative flex-1 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.2),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.15),_transparent_35%)] bg-white/80 px-6 py-10 sm:px-10 lg:px-14 lg:py-16">
          <div className="absolute inset-0 bg-[url('')] bg-cover bg-center opacity-70"></div>
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
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
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

        <div className="flex-1 bg-slate-100 px-6 py-10 sm:px-10 lg:px-14 lg:py-20">
          <div className="mx-auto max-w-md rounded-[32px] border border-slate-200/80 bg-white p-8 shadow-2xl shadow-slate-900/5">
            <div className="mb-8 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600">Welcome</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900">Create your Travel Mate account</h2>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-slate-700">
                Full Name
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Confirm Password
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/10 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create account'}
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
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
