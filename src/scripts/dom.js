import journal from "./entry.js";

const dom = {
    renderJournal(entries) {
        let entryList = "";
        entries.forEach(entry => {
            entryList += journal.createNew(entry);
        })
        document.querySelector(".entryLog").innerHTML = entryList;
    }
}

export default dom