let entryList = "";
const renderJournalEntries = (entries) => {
    entries.forEach((entry) => {
        entryList += makeJournalEntryComponent(entry);
    })
    document.querySelector(".entryLog").innerHTML = entryList;
}