import Dom from "./dom.js"

const Data = {
	getJournalEntries() {
		return fetch('http://localhost:3000/entries').then(r => r.json())
	},
	saveJournalEntry(newJournalEntry) {
		// Use `fetch` with the POST method to add your entry to your API
		return fetch("http://localhost:3000/entries", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newJournalEntry)
		})
	}
};

export default Data
