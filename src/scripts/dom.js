import entry from "./entry.js";
import data from "./data.js";

const dom = {
    renderJournal(entries) {
        let entryList = "";
        console.log("dom entries", entries);
        entries.forEach(item => {
            entryList += entry.createNew(item);
        })
        document.querySelector(".entryLog").innerHTML = entryList;
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
    }
}

export default dom