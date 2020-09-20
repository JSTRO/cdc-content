export default function formatDate(date) {
	const y = new Date(date).getFullYear()
	const m = new Date(date).getMonth()
	const d = new Date(date).getDate()
	return `${m}-${d}-${y}`
}