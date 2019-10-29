import Data from "./data.js"

const Entry = {
    renderHtml({ id, concept, date, description, mood }) {
        return `
            <section id="entry--${id}" class="entry">
            <h2>${concept}</h2>
                <h3>${date}</h3>
                <p>${description}</p>
                <p><strong>Mood:</strong> ${mood}</p>
                <button id="edit--${id}" class="btn edit">Edit</button>
                <button id="delete--${id}" class="btn btn-danger delete">Delete</button>
            </section>
            `   
    },
    createEntryObject(date, concept, description, mood) {
        return ({ date, concept, description, mood })
    },
    // TODO: update entry in database
    editEntryObject(entryId, entry){
        // TODO: create modal
        
        // send 'PATCH' request to server
        Data.updateJournalEntry(entryId, updatedEntry)
    }
}

export default Entry;