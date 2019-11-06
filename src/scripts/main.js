/*
    Main application logic that uses the functions and objects
    defined in the other JavaScript files.
*/
import Dom from "./dom.js"
import Data from "./data.js"
import Events from "./events.js"

Dom.renderPage();
Events.attachFormEvents()

Data.getJournalEntries().then(Dom.renderJournal).then(Events.attachJournalEvents)