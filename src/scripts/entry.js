const Entry = {
    renderHtml({ id, concept, date, description, mood }) {
        return `
            <section id="entry--${id}" class="entry">
            <h2>${concept}</h2>
                <h3>${date}</h3>
                <p>${description}</p>
                <p><strong>Mood:</strong> ${mood}</p>
                <button id="delete--${id}">Delete</button>
            </section>
            `   
    },
    createEntryObject(date, concept, description, mood) {
        return ({ date, concept, description, mood })
    }
    // TODO: delete entry from database
    // TODO: update entry in database
}

export default Entry;