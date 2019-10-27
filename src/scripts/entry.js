const entry = {
    renderHtml({ id, concept, date, description, mood }) {
        return `
            <section id="entry--${id}" class="entry">
            <h2>${concept}</h2>
                <h3>${date}</h3>
                <p>${description}</p>
                <p><strong>Mood:</strong> ${mood}</p>
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