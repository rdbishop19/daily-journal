const Journal = {
    createNew(entry) {
        return `
            <section class="entry">
            <h2>${entry.concept}</h2>
                <h3>${entry.date}</h3>
                <p>${entry.entry}</p>
                <p>Mood: ${entry.mood}</p>
            </section>
            `   
    }
}