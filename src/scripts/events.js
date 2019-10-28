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
    },
    characterCountEvent() {
        const characterEventHandler = () => {
            let characterCount = document.querySelector("#conceptsCovered").value.length
            let maxCharNotice = document.querySelector("#characters-remaining")
            let conceptsCovered = document.getElementById("conceptsCovered").value;
            let maxCharLength = 80;
            let displayAtNumber = maxCharLength - 15;
            
            console.log(characterCount);
            if (characterCount <= displayAtNumber){
                maxCharNotice.textContent = "";
                maxCharNotice.style.color = "black";               
            }
            if (characterCount < maxCharLength){
                maxCharNotice.classList.remove("warning");
                maxCharNotice.textContent = `${maxCharLength - characterCount} remaining`
            }
            else if (characterCount = maxCharLength ){
                // maxCharNotice.textContent = "*Too many characters"
                maxCharNotice.textContent = "0 remaining";
                maxCharNotice.classList.add("warning");
                document.querySelector("#conceptsCovered").value = conceptsCovered.slice(0, maxCharLength);
            }
        }
    },
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
        // character count event
        document.querySelector("#conceptsCovered").addEventListener("keyup", characterEventHandler)
    }
}

export default Events