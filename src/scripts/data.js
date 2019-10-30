// Fetch calls for normal CRUD operations

const Data = {
	Url: "http://localhost:3000/entries",

	getJournalEntries() {
		return fetch("http://localhost:3000/entries")
			.then(r => r.json())
	},
	getJournalEntry(entryId) {
		return fetch(`http://localhost:3000/entries/${entryId}`)
			.then(r => r.json())
	}
	,
	saveJournalEntry(newJournalEntry) {
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
	updateJournalEntry(entryId, entry){
		return fetch(`http://localhost:3000/entries/${entryId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(entry)
		})
	}
};

export default Data
