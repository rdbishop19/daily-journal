// Fetch calls for normal CRUD operations
const cacheJournalEntries = entries => {
	localStorage.setItem("entries", JSON.stringify(entries))
	// const cachedEntries = JSON.parse(localStorage.getItem("entries"))
	return entries
}

const entriesUrl = "http://localhost:3000/entries"

const Data = {
	getJournalEntries() {
		return fetch(entriesUrl)
			.then(r => r.json())
			.then(cacheJournalEntries)
	},
	getJournalEntry(entryId) {
		return fetch(`${entriesUrl}/${entryId}`)
			.then(r => r.json())
	}
	,
	saveJournalEntry(newJournalEntry) {
		return fetch(entriesUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newJournalEntry)
		})
	},
	deleteJournalEntry(entryId){
		return fetch(`${entriesUrl}/${entryId}`, {
			method: "DELETE",
		})
	},
	updateJournalEntry(entryId, entry){
		return fetch(`${entriesUrl}/${entryId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(entry)
		})
	}
};

export default Data
