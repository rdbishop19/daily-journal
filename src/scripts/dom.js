import Entry from './entry.js'
import Form from './entryForm.js'
import Events from './events.js'

const Dom = {
	renderEntryForm() {
		let formContainer = document.querySelector('#formContainer');
        let entryForm = Form.createEntryForm()
		formContainer.innerHTML = entryForm;
	},
	renderJournal(entries) {
        let entryLog = document.querySelector('.entryLog');
        for (const entry of entries) {
			const newEntry = Entry.createHtml(entry);
            entryLog.innerHTML += newEntry;
        }
        Events.attachJournalEvents()
	}
};

export default Dom;
