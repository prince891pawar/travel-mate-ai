import React, { useState } from 'react'

const hotelRecommendations = [
	{
		id: 1,
		name: 'Hotel XYZ',
		location: 'Paris, France',
		rating: 4.5,
		reviews: 320,
		price: 18500,
		image:
			'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=85',
		amenities: [
			{ icon: '⌁', label: 'Free WiFi' },
			{ icon: '☕', label: 'Breakfast' },
			{ icon: '⚙', label: 'Air Conditioning' },
			{ icon: '◷', label: '24/7 Service' },
		],
		description: 'A calm, centrally located stay with warm rooms and easy access to Paris highlights.',
	},
	{
		id: 2,
		name: 'Le Marais House',
		location: 'Paris, France',
		rating: 4.7,
		reviews: 184,
		price: 22000,
		image:
			'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1000&q=85',
		amenities: [
			{ icon: '⌁', label: 'Free WiFi' },
			{ icon: '☕', label: 'Breakfast' },
			{ icon: '♨', label: 'Spa' },
			{ icon: '◷', label: '24/7 Service' },
		],
		description: 'A boutique address in the Marais, suited to travelers who want neighborhood character.',
	},
]

const HotelRecommendations = () => {
	const [favoriteHotels, setFavoriteHotels] = useState([])
	const [selectedHotel, setSelectedHotel] = useState(null)

	const toggleFavorite = (hotelId) => {
		setFavoriteHotels((currentFavorites) =>
			currentFavorites.includes(hotelId)
				? currentFavorites.filter((id) => id !== hotelId)
				: [...currentFavorites, hotelId],
		)
	}

	return (
		<section aria-labelledby="accommodation-heading" className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
						<span className="text-xl text-indigo-600" aria-hidden="true">▣</span>
						Accommodation
					</p>
					<h2 id="accommodation-heading" className="mt-2 text-2xl font-semibold text-slate-950">Stay somewhere memorable</h2>
				</div>
				<p className="text-sm text-slate-500">Curated for your Paris itinerary</p>
			</div>

			<div className="mt-6 grid gap-5 lg:grid-cols-2">
				{hotelRecommendations.map((hotel) => {
					const isFavorite = favoriteHotels.includes(hotel.id)

					return (
						<article key={hotel.id} className="overflow-hidden rounded-[24px] border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60">
							<div className="relative p-3 pb-0">
								<img src={hotel.image} alt={`${hotel.name} room`} className="h-52 w-full rounded-[16px] object-cover" />
								<button
									type="button"
									aria-label={isFavorite ? `Remove ${hotel.name} from favorites` : `Save ${hotel.name} to favorites`}
									aria-pressed={isFavorite}
									onClick={() => toggleFavorite(hotel.id)}
									className={`absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white text-2xl shadow-sm transition hover:scale-105 ${isFavorite ? 'border-rose-200 text-rose-500' : 'border-slate-200 text-slate-700'}`}
								>
									{isFavorite ? '♥' : '♡'}
								</button>
							</div>

							<div className="p-4 pt-3 sm:p-5 sm:pt-3">
								<h3 className="text-xl font-semibold text-slate-950">{hotel.name}</h3>
								<div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500">
									<span className="font-semibold text-amber-500">★</span>
									<span className="font-semibold text-slate-700">{hotel.rating}</span>
									<span>({hotel.reviews} reviews)</span>
								</div>
								<p className="mt-3 flex items-center gap-2 text-sm text-slate-600"><span className="text-rose-500" aria-hidden="true">⌖</span>{hotel.location}</p>

								<div className="mt-4 grid grid-cols-2 gap-y-4 border-t border-slate-100 pt-4 sm:grid-cols-4 sm:gap-2">
									{hotel.amenities.map((amenity) => (
										<div key={amenity.label} className="flex flex-col items-center gap-1 text-center text-xs text-slate-500">
											<span className="text-lg text-slate-500" aria-hidden="true">{amenity.icon}</span>
											<span>{amenity.label}</span>
										</div>
									))}
								</div>

								<button
									type="button"
									onClick={() => setSelectedHotel(hotel)}
									className="mt-5 w-full rounded-xl border-2 border-indigo-300 px-4 py-2.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
								>
									View Details
								</button>
							</div>
						</article>
					)
				})}
			</div>

			{selectedHotel && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelectedHotel(null)}>
					<div role="dialog" aria-modal="true" aria-labelledby="hotel-dialog-title" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
						<div className="flex items-start justify-between gap-4">
							<div>
								<p className="text-sm font-medium text-indigo-600">Accommodation details</p>
								<h3 id="hotel-dialog-title" className="mt-1 text-2xl font-semibold text-slate-950">{selectedHotel.name}</h3>
							</div>
							<button type="button" aria-label="Close accommodation details" onClick={() => setSelectedHotel(null)} className="text-2xl leading-none text-slate-500 hover:text-slate-950">×</button>
						</div>
						<p className="mt-4 text-sm leading-6 text-slate-600">{selectedHotel.description}</p>
						<p className="mt-4 text-lg font-semibold text-slate-950">From ₹{selectedHotel.price.toLocaleString()} <span className="text-sm font-normal text-slate-500">per night</span></p>
						<button type="button" onClick={() => setSelectedHotel(null)} className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700">Keep exploring</button>
					</div>
				</div>
			)}
		</section>
	)
}

export default HotelRecommendations
