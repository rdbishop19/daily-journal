/*
    Main application logic that uses the functions and objects
    defined in the other JavaScript files.
*/
API.getJournalEntries().then(entries => { 
    DOM.renderJournal(entries);
})
