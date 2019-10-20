const entry = {
    renderHtml(journalEntry) {
        return `
            <section class="entry">
            <h2>${journalEntry.concept}</h2>
                <h3>${journalEntry.date}</h3>
                <p>${journalEntry.description}</p>
                <p>Mood: ${journalEntry.mood}</p>
            </section>
            `   
    },
    createEntryObject(date, concepts, description, mood) {
        return {
            date: date.value,
            concept: concepts.value,
            description: description.value,
            mood: mood.value
        }
    }
    // TODO: delete entry from database
    // TODO: update entry in database
}

export default entry;