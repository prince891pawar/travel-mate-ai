import React, { useState } from 'react'

const travelTips = [
	{
		title: 'Best Time to Visit',
		summary: 'Visit between November and February for pleasant weather.',
		details: 'These months are ideal for comfortable sightseeing. Pack a light layer for cooler mornings and evenings.',
		icon: '🗓️',
		color: 'blue',
	},
	{
		title: 'Money & Payments',
		summary: 'Keep some cash for small local shops and transport.',
		details: 'Keep a small amount of euros with you, while using a card for larger purchases and established businesses.',
		icon: '💼',
		color: 'green',
	},
	{
		title: 'Transportation',
		summary: 'Renting a scooter can be convenient for exploring nearby places.',
		details: 'Compare public transport passes with scooter hire before setting out, and check local parking and safety rules.',
		icon: '🛵',
		color: 'orange',
	},
	{
		title: 'What to Pack',
		summary: 'Carry sunscreen, comfortable shoes, and light clothes.',
		details: 'A compact day bag, reusable water bottle, portable charger, and a light rain layer will also come in handy.',
		icon: '🎒',
		color: 'purple',
	},
	{
		title: 'Safety',
		summary: 'Keep important documents secure while travelling.',
		details: 'Store digital copies of your documents separately, stay aware in busy areas, and keep emergency contacts accessible.',
		icon: '🛡️',
		color: 'red',
	},
]

const colorStyles = {
	blue: { icon: 'bg-blue-50', number: 'bg-blue-50 text-blue-600' },
	green: { icon: 'bg-emerald-50', number: 'bg-emerald-50 text-emerald-600' },
	orange: { icon: 'bg-orange-50', number: 'bg-orange-50 text-orange-500' },
	purple: { icon: 'bg-purple-50', number: 'bg-purple-50 text-purple-600' },
	red: { icon: 'bg-red-50', number: 'bg-red-50 text-red-500' },
}

const TravelTips = () => {
	const [expandedTip, setExpandedTip] = useState(null)

	const toggleTip = (tipIndex) => {
		setExpandedTip((currentTip) => (currentTip === tipIndex ? null : tipIndex))
	}

	return (
		<section aria-labelledby="travel-tips-heading" className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
			<div className="flex items-start gap-4">
				<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-2xl" aria-hidden="true">💡</div>
				<div>
					<h2 id="travel-tips-heading" className="text-2xl font-semibold tracking-tight text-slate-950">Travel Tips</h2>
					<p className="mt-1 text-sm text-slate-600">Useful tips to make your trip safe, comfortable and memorable.</p>
				</div>
			</div>

			<div className="mt-6 space-y-3">
				{travelTips.map((tip, index) => {
					const isExpanded = expandedTip === index
					const styles = colorStyles[tip.color]

					return (
						<div key={tip.title} className="overflow-hidden rounded-xl border border-slate-200 shadow-sm transition hover:border-slate-300 hover:shadow-md">
							<button
								type="button"
								aria-expanded={isExpanded}
								onClick={() => toggleTip(index)}
								className="flex w-full items-center gap-4 p-3 text-left sm:p-4"
							>
								<span className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-3xl ${styles.icon}`} aria-hidden="true">{tip.icon}</span>
								<span className="min-w-0 flex-1">
									<span className="block text-base font-semibold text-slate-950 sm:text-lg">{tip.title}</span>
									<span className="mt-1 block max-w-xl text-sm leading-5 text-slate-600">{tip.summary}</span>
								</span>
								<span className={`flex h-8 min-w-10 shrink-0 items-center justify-center rounded-full px-2 text-sm font-semibold ${styles.number}`}>{String(index + 1).padStart(2, '0')}</span>
								<span className={`hidden text-slate-400 transition sm:block ${isExpanded ? 'rotate-180' : ''}`} aria-hidden="true">⌄</span>
							</button>
							{isExpanded && (
								<div className="border-t border-slate-100 px-4 pb-4 pt-3 pl-[5.5rem] text-sm leading-6 text-slate-600 sm:pl-24">
									{tip.details}
								</div>
							)}
						</div>
					)
				})}
			</div>
		</section>
	)
}

export default TravelTips
