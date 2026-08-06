import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import TripHeader from '../components/TripHeader'
import InputField from '../components/InputField'
import DatePicker from '../components/DatePicker'
import OptionCard from '../components/OptionCard'
import SectionTitle from '../components/SectionTitle'
import TextArea from '../components/TextArea'
import GenerateButton from '../components/GenerateButton'

const budgetOptions = [
  { label: 'Budget', value: 'budget', icon: '💵' },
  { label: 'Standard', value: 'standard', icon: '⭐' },
  { label: 'Luxury', value: 'luxury', icon: '👑' },
]

const travelerOptions = [
  { label: 'Solo', value: 'solo', icon: '🧍' },
  { label: 'Couple', value: 'couple', icon: '💑' },
  { label: 'Friends', value: 'friends', icon: '🧑‍🤝‍🧑' },
  { label: 'Family', value: 'family', icon: '👨‍👩‍👧‍👦' },
]

const travelStyleOptions = [
  { label: 'Adventure', value: 'adventure', icon: '🏔️' },
  { label: 'Relaxation', value: 'relaxation', icon: '🏝️' },
  { label: 'Nature', value: 'nature', icon: '🌿' },
  { label: 'Cultural', value: 'cultural', icon: '🏛️' },
  { label: 'Food', value: 'food', icon: '🍽️' },
  { label: 'Nightlife', value: 'nightlife', icon: '🍸' },
]

const hotelOptions = [
  { label: '3 Star', value: '3-star', icon: '⭐' },
  { label: '4 Star', value: '4-star', icon: '⭐' },
  { label: '5 Star', value: '5-star', icon: '⭐' },
]

const CreateTrip = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    destination: '',
    startingFrom: '',
    startDate: '',
    endDate: '',
    budget: '',
    travelers: '',
    travelStyle: '',
    hotelPreference: '',
    notes: '',
  })
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
    setSubmitError('')
  }

  const validate = () => {
    const nextErrors = {}

    if (!formData.destination.trim()) {
      nextErrors.destination = 'Destination is required.'
    }

    if (!formData.startingFrom.trim()) {
      nextErrors.startingFrom = 'Starting location is required.'
    }

    if (!formData.startDate) {
      nextErrors.startDate = 'Start date is required.'
    }

    if (!formData.endDate) {
      nextErrors.endDate = 'End date is required.'
    }

    if (formData.startDate && formData.endDate && formData.endDate < formData.startDate) {
      nextErrors.endDate = 'End date cannot be before start date.'
    }

    setErrors(nextErrors)

    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = () => {
    if (isSubmitting) return

    if (!validate()) {
      setSubmitError('Please fix the highlighted fields before generating your trip.')
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    setTimeout(() => {
      console.log('Trip form submission:', formData)
      setIsSubmitting(false)
    }, 300)
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_36%),_linear-gradient(180deg,_#ffffff_0%,_#f8fbff_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <BackButton onClick={() => navigate(-1)} />
        <TripHeader />

        <section className="rounded-[32px] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
          <div className="grid gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField
                label="Destination"
                name="destination"
                value={formData.destination}
                placeholder="Enter destination"
                icon={<span className="text-lg">📍</span>}
                onChange={handleChange}
                error={errors.destination}
              />
              <InputField
                label="Starting From"
                name="startingFrom"
                value={formData.startingFrom}
                placeholder="Enter starting location"
                icon={<span className="text-lg">🧭</span>}
                onChange={handleChange}
                error={errors.startingFrom}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <DatePicker
                label="Start Date"
                name="startDate"
                value={formData.startDate}
                placeholder="Select start date"
                icon={<span className="text-lg">📅</span>}
                onChange={handleChange}
                error={errors.startDate}
              />
              <DatePicker
                label="End Date"
                name="endDate"
                value={formData.endDate}
                placeholder="Select end date"
                icon={<span className="text-lg">📅</span>}
                onChange={handleChange}
                error={errors.endDate}
              />
            </div>

            <div className="space-y-4">
              <SectionTitle icon={<span>💰</span>} title="Budget" />
              <div className="grid gap-3 sm:grid-cols-3">
                {budgetOptions.map((option) => (
                  <OptionCard
                    key={option.value}
                    label={option.label}
                    icon={option.icon}
                    value={option.value}
                    selectedValue={formData.budget}
                    onSelect={(value) => handleChange('budget', value)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <SectionTitle icon={<span>👥</span>} title="Travelers" />
              <div className="grid gap-3 sm:grid-cols-4">
                {travelerOptions.map((option) => (
                  <OptionCard
                    key={option.value}
                    label={option.label}
                    icon={option.icon}
                    value={option.value}
                    selectedValue={formData.travelers}
                    onSelect={(value) => handleChange('travelers', value)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <SectionTitle icon={<span>🎯</span>} title="Travel Style" />
              <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-6">
                {travelStyleOptions.map((option) => (
                  <OptionCard
                    key={option.value}
                    label={option.label}
                    icon={option.icon}
                    value={option.value}
                    selectedValue={formData.travelStyle}
                    onSelect={(value) => handleChange('travelStyle', value)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <SectionTitle icon={<span>🏨</span>} title="Hotel Preference" />
              <div className="grid gap-3 sm:grid-cols-3">
                {hotelOptions.map((option, index) => (
                  <OptionCard
                    key={`${option.value}-${index}`}
                    label={option.label}
                    icon={option.icon}
                    value={option.value}
                    selectedValue={formData.hotelPreference}
                    onSelect={(value) => handleChange('hotelPreference', value)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <TextArea
                label="Extra Notes"
                name="notes"
                value={formData.notes}
                placeholder="Any special requests or preferences? (e.g., allergies, specific places to visit, etc.)"
                onChange={handleChange}
              />
            </div>

            {submitError && <p className="rounded-3xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700">{submitError}</p>}

            <div className="pt-1">
              <GenerateButton onClick={handleSubmit} loading={isSubmitting} />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default CreateTrip

