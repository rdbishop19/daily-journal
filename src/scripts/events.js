import Dom from "./dom.js"
import Data from "./data.js"
import Entry from "./entry.js"

const Events = {
    saveButtonHandler() {
        let date = document.querySelector("#journalDate").value
        let concept = document.querySelector("#conceptsCovered").value
        let description = document.querySelector("#journalEntry").value
        let mood = document.querySelector("#mood").value
    
        const newEntry = Entry.createEntryObject(date, concept, description, mood)
        // post.then(get).then(render)
        Data.saveJournalEntry(newEntry)
            .then(Dom.renderJournal)        
    },
    deleteButtonHandler(){
        // console.log("Delete button clicked", event.target.id);
        let entryId = event.target.id.split("--")[1]
        if (window.confirm("Delete this entry?")){
            console.log("deleted entry", entryId)
            Data.deleteJournalEntry(entryId)
            .then(Dom.renderJournal)
        }
    },
    editButtonHandler(){
        let entryId = event.target.id.split("--")[1]
        console.log("edit entry", entryId)
        // TODO: figure out modal for edit window on clicked entry
    }
    ,
    attachButtonEvents() {
        // 'save' button
        document.querySelector(".save").addEventListener("click", this.saveButtonHandler);

        // 'delete' buttons
        let deleteButtons = document.querySelectorAll(".delete")
        deleteButtons.forEach(button => {
            button.addEventListener("click", this.deleteButtonHandler);
        })

        // 'edit' buttons
        let editButtons = document.querySelectorAll(".edit")
        editButtons.forEach(button => {
            button.addEventListener("click", this.editButtonHandler)
        })
    }
}

export default Events