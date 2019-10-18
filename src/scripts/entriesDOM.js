const DOM = {
    renderJournal(entries) {
        let entryList = "";
        entries.forEach(entry => {
            entryList += Journal.createNew(entry);
        })
        document.querySelector(".entryLog").innerHTML = entryList;
    }
}