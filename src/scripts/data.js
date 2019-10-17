// ~ ~ previous code ~ ~
// fetch('http://localhost:3000/entries') // Fetch from the API
// 	.then((entries) => entries.json()) // Parse as JSON
// 	.then((parsedEntries) => {
// 		renderJournalEntries(parsedEntries);
// 		// What should happen when we finally have the array?
// 	});

const API = {
	getJournalEntries() {
		return fetch('http://localhost:3000/entries').then((response) => response.json());
	}
};
