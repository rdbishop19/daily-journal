import Data from './data.js';

const Entry = {
	createHtml({ id, concept, date, description, mood }) {
		return `
            <section id="entry--${id}" class="entry">
            <h2>${concept}</h2>
                <h3>${date}</h3>
                <p class="description">${description}</p>
                <p><strong>Mood:</strong> ${mood}</p>
                <button id="edit--${id}" class="btn edit">Edit</button>
                <button id="delete--${id}" class="btn btn-danger delete">Delete</button>
            </section>
            `;
	},
	updateFormFields(entry) {
		document.querySelector('#entryId').value = entry.id;
		document.querySelector('#journalDate').value = entry.date;
		document.querySelector('#conceptsCovered').value = entry.concept;
		document.querySelector('#journalEntry').value = entry.description;
		document.querySelector('#mood').value = entry.mood;
		document.querySelector('#clear-button').disabled = true;
	},
	editEntryObject(entryId) {
		const cachedEntries = JSON.parse(localStorage.getItem('entries'));
		if (cachedEntries.length) {
			for (const entry of cachedEntries) {
				if (entry.id === parseInt(entryId)) {
                    this.updateFormFields(entry);
                    break
				}
			}
		} else {
			Data.getJournalEntry(entryId).then(this.updateFormFields);
		}
	}
};

export default Entry;
