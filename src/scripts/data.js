// Fetch calls for normal CRUD operations

const Data = {
	Url: "http://localhost:3000/entries",

	getJournalEntries() {
		return fetch(this.Url).then(r => r.json())
	},
	saveJournalEntry(newJournalEntry) {
		// Use `fetch` with the POST method to add your entry to your API
		return fetch(this.Url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newJournalEntry)
		})
	},
	deleteJournalEntry(entryId){
		return fetch(`${this.Url}/${entryId}`, {
			method: "DELETE",
		})
	},
	updateJournalEntry(entryId){
		return fetch(`${this.Url}/${entryId}`, {
			method: "PATCH",
		})
	}
};

export default Data
