import { useCallback, useEffect, useState } from 'react'

const useTrips = (token) => {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [requestNumber, setRequestNumber] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    const fetchTrips = async () => {
      if (!token) {
        setTrips([])
        setLoading(false)
        return
      }

      setLoading(true)
      setError('')

      try {
        const response = await fetch('http://localhost:3000/api/trips', {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        })
        const data = await response.json()
        if (!response.ok) throw new Error(data.message || 'Failed to fetch trips.')
        setTrips(Array.isArray(data.trips) ? data.trips : [])
      } catch (fetchError) {
        if (!controller.signal.aborted) {
          setError(fetchError.message || 'Unable to load your trips.')
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    fetchTrips()
    return () => controller.abort()
  }, [requestNumber, token])

  const reload = useCallback(() => setRequestNumber((current) => current + 1), [])

  return { trips, loading, error, reload }
}

export default useTrips