/*
    Main application logic that uses the functions and objects
    defined in the other JavaScript files.
*/
import data from "./data.js"
import dom from "./dom.js";

data.getJournalEntries().then(entries => dom.renderJournal(entries));
dom.createSubmitHandler();
dom.addCharacterCountEvent();