const entry = {
    createNew(journalEntry) {
        return `
            <section class="entry">
            <h2>${journalEntry.concept}</h2>
                <h3>${journalEntry.date}</h3>
                <p>${journalEntry.description}</p>
                <p>Mood: ${journalEntry.mood}</p>
            </section>
            `   
    }
}

export default entry;