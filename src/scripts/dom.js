import Entry from "./entry.js";
import Data from "./data.js";

const Dom = {
    renderJournal() {
        Data.getJournalEntries()
        .then(entries => {
            let entryList = "";
            entries.forEach(entry => {
                entryList += Entry.renderHtml(entry);
            })
            document.querySelector(".entryLog").innerHTML = entryList;
        })
    },
    createSubmitHandler() {
        const getFormFields = () => {
            let date = document.querySelector("#journalDate").value
            let concept = document.querySelector("#conceptsCovered").value
            let description = document.querySelector("#journalEntry").value
            let mood = document.querySelector("#mood").value
        
            const newJournalEntry = Entry.createEntryObject(
                date, concept, description, mood)
            // post.then(get).then(render)
            Data.saveJournalEntry(newJournalEntry)
                .then(data.getJournalEntries) // don't invoke function = ex. getJournalEntries()
                .then(entries => Dom.renderJournal(entries))
        }
        
        document.querySelector("button").addEventListener("click", getFormFields);
    }
}

export default Dom