import Entry from "./entry.js"
import Form from "./formManager.js"
import Events from "./events.js"

const Dom = {
	renderPage() {
		let formContainer = document.querySelector("#formContainer");
        let entryForm = Form.createEntryForm()
        formContainer.innerHTML = entryForm;

        let filterContainer = document.querySelector("#filterContainer")
        let filterMood = Form.createMoodFilterForm()
        filterContainer.innerHTML += filterMood
        let searchForm = Form.createSearchFilterForm()
        filterContainer.innerHTML += searchForm
	},
	renderJournal(entries) {
        let entryLog = document.querySelector(".entryLog");
        entryLog.innerHTML = ""

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
