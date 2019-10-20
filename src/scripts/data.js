const data = {
	getJournalEntries() {
		return fetch('http://localhost:3000/entries').then((response) => response.json());
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

export default data
