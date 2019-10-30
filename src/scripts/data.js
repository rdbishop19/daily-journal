// Fetch calls for normal CRUD operations

const Data = {
	Url: "http://localhost:3000/entries",

	getJournalEntries() {
		return fetch("http://localhost:3000/entries")
			.then(r => r.json())
	},
	saveJournalEntry(newJournalEntry) {
		return fetch("http://localhost:3000/entries", {
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
