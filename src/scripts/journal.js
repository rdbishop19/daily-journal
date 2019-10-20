/*
    Main application logic that uses the functions and objects
    defined in the other JavaScript files.
*/
import data from "./data.js"
import dom from "./dom.js"

data.getJournalEntries().then(entries => { 
    dom.renderJournal(entries);
})

const createEntryObject = (date, concepts, description, mood) => {
    return {
        date: date.value,
        concept: concepts.value,
        description: description.value,
        mood: mood.value
    }
}

const submitButtonHandler = () => {
    let journalDate = document.querySelector("#journalDate")
    let conceptsCovered = document.querySelector("#conceptsCovered")
    let journalEntry = document.querySelector("#journalEntry")
    let mood = document.querySelector("#mood")

    const newJournalEntry = createEntryObject(journalDate, conceptsCovered, journalEntry, mood)
    console.log(newJournalEntry);
}

document.querySelector("button").addEventListener("click", submitButtonHandler);