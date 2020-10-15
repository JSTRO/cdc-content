export default function formatDate(date) {
	const y = new Date(date).getFullYear()
	const m = new Date(date).getMonth()
	const d = new Date(date).getDate()
	return `${months[m]} ${d}, ${y}`
}

const months = [
	"January","February","March","April","May","June","July",
	"August","September","October","November","December"
]