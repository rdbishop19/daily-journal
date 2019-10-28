import Entry from "./entry.js";
import Data from "./data.js";
import Events from "./events.js"

const Dom = {
    renderEntryForm() {
        // TODO: move hard-coded form in index.html to this component
    },
    createSubmitHandler() {
        const getFormFields = () => {
            let journalDate = document.querySelector("#journalDate")
            let conceptsCovered = document.querySelector("#conceptsCovered")
            let journalEntry = document.querySelector("#journalEntry")
            let mood = document.querySelector("#mood")
        
            const newJournalEntry = entry.createEntryObject(
                journalDate, conceptsCovered, journalEntry, mood)
            // post.then(get).then(render)
            data.saveJournalEntry(newJournalEntry)
                .then(data.getJournalEntries) // don't invoke function = ex. getJournalEntries()
                .then(entries => dom.renderJournal(entries))
        }
        document.querySelector("button").addEventListener("click", getFormFields);
    },
    renderJournal() {
        Data.getJournalEntries()
        .then(entries => {
            let entryList = "";
            entries.forEach(entry => {
                entryList += Entry.renderHtml(entry);
            })
            document.querySelector(".entryLog").innerHTML = entryList;
            Events.attachButtonEvents();
        })
    }
}

export default Dom