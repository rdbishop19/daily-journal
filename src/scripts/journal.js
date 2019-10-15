
const makeJournalEntryComponent = (journalEntry) => {
    // Create your own HTML structure for a journal entry
    return `
        <section class="entry">
        <h2>${journalEntry.concept}</h2>
            <h3>${journalEntry.date}</h3>
            <p>${journalEntry.entry}</p>
            <p>Mood: ${journalEntry.mood}</p>
        </section>
        `
}

let entryList = "";
const renderJournalEntries = (entries) => {
    entries.forEach((entry) => {
        entryList += makeJournalEntryComponent(entry);
    })
    document.querySelector(".entryLog").innerHTML = entryList;
}

// Invoke the render function
// renderJournalEntries(journalEntries)

fetch("http://localhost:3000/entries") // Fetch from the API
.then(entries => entries.json())  // Parse as JSON
.then(parsedEntries => {
    renderJournalEntries(parsedEntries)
        // What should happen when we finally have the array?
    })
