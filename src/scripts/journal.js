/*
    Define the keys and value for a JavaScript object that
    represents a journal entry about what you learned today
*/
const journalEntries = [
    {
        date: "09/30/2019",
        concept: "Basic HTML/CSS",
        entry: "We learned about basic HTML/CSS setup for a typical application. This was mostly review from what I learned in JumpStart and pre-work.",
        mood: "Motivated"
    },
    {
        date: "10/01/2019",
        concept: "CSS Selectors",
        entry: "We learned about styling a webpage using css and keeping the html source code linked to the css styles with ids and classes.",
        mood: "Excited"
    },
    {
        date: "10/02/2019",
        concept: "DOM Manipulation",
        entry: "We learned about making changes to a webpage using Javascript DOM methods.",
        mood: "Tired"
    }
]

/*
    Purpose: To create, and return, a string template that
    represents a single journal entry object as HTML

    Arguments: journalEntry (object)
*/
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

/*
    Purpose: To render all journal entries to the DOM
    Arguments: entries (array of objects)
*/
let entryList;
const renderJournalEntries = (entries) => {
    entries.forEach((entry) => {
        entryList += makeJournalEntryComponent(entry);
    })
    document.querySelector(".entryLog").innerHTML = entryList;
}

// Invoke the render function
renderJournalEntries(journalEntries)
