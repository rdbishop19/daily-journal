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