import Entry from "./entry.js";
import Data from "./data.js";
import Events from "./events.js"

const Dom = {
    renderEntryForm() {
        // TODO: move hard-coded form in index.html to this component
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