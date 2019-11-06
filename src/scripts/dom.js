import Entry from "./entry.js"
import Form from "./formManager.js"
import Data from "./data.js";
import Events from "./events.js";

const formContainer = document.querySelector("#formContainer");
const filterContainer = document.querySelector("#filterContainer")
const entryLog = document.querySelector(".entryLog");

export default {
    renderPage() {
        let entryForm = Form.createEntryForm()
        formContainer.innerHTML = entryForm;
        let moodFilter = document.getElementById("mood")

        Data.getMoodList().then((moods) => {
            let moodForm = Form.createMoodFilterForm(moods)
            filterContainer.innerHTML += moodForm

            moodFilter.innerHTML += "<option value=\"\"></option>"
            moods.forEach(mood => {
                moodFilter.innerHTML += `<option value=${mood.id}>${mood.label}</option>`
            })
            Events.attachFormEvents()
        })
        let searchForm = Form.createSearchFilterForm()
        filterContainer.innerHTML += searchForm
	},
	renderJournal(entries) {
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
    }
};