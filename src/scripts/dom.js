import Entry from './entry.js'
import Form from './entryForm.js'
import Events from './events.js'

const Dom = {
	renderPage() {
		let formContainer = document.querySelector('#formContainer');
        let entryForm = Form.createEntryForm()
		formContainer.innerHTML = entryForm;
        let filterForm = Form.createMoodFilter()
        formContainer.innerHTML += filterForm
	},
	renderJournal(entries) {
        let entryLog = document.querySelector('.entryLog');
        entryLog.innerHTML = ''

        // checks for empty array of entries before proceeding
        if (!entries.length){
            entryLog.innerHTML = "<h3>No entries</h3>"
            return
        }

        for (const entry of entries) {
			const newEntry = Entry.createHtml(entry);
            entryLog.innerHTML += newEntry;
        }
        Events.attachJournalEvents()
    }
};

export default Dom;
