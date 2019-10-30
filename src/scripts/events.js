import Dom from "./dom.js"
import Data from "./data.js"
import Entry from "./entry.js"

const Events = {
    saveButtonHandler() {
        event.preventDefault(); // prevents refreshing the page with 'submit'
        let date = document.querySelector("#journalDate").value
        let concept = document.querySelector("#conceptsCovered").value
        let description = document.querySelector("#journalEntry").value
        let mood = document.querySelector("#mood").value
    
        const regEx = /[^a-z0-9{}:;\s]/ig
        function badChar(element){
            // badCharFound = array if anything not in 'regEx' is found in the string
            let badCharFound = element.match(regEx)
            return badCharFound ? true : false
        }
        // if badChar 
        if ([concept, description, mood].some(badChar)){
            window.alert("Please use only numbers, letters, or { } : ; in form fields.")
        }
        else {
            const newEntry = Entry.createEntryObject(date, concept, description, mood)
            console.log("newEntry", newEntry)
            // post.then(get).then(render)
            Data.saveJournalEntry(newEntry)
                .then(Dom.renderJournal)  
                .then(document.getElementById("journal-form").reset())
        }
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
    clearButtonHandler(){
        if (window.confirm("Click OK to clear the form and start over.")){
            document.getElementById("journal-form").reset();
            // console.log("clear clicked")
        }
    },
    characterCountHandler() {
        let characterCount = document.querySelector("#conceptsCovered").value.length
        let maxCharNotice = document.querySelector("#characters-remaining")
        let conceptsCovered = document.getElementById("conceptsCovered").value;
        let maxCharLength = 80;
        let displayAtNumber = maxCharLength - 15;
        
        // console.log(characterCount);
        if (characterCount <= displayAtNumber){
            maxCharNotice.textContent = "";
            maxCharNotice.style.color = "black";               
        }
        else if (characterCount < maxCharLength){
            maxCharNotice.classList.remove("warning");
            maxCharNotice.textContent = `${maxCharLength - characterCount} remaining`
        }
        else if (characterCount = maxCharLength ){
            setTimeout(()=>{maxCharNotice.textContent = "0 remaining"}, 2000)
            maxCharNotice.textContent = "Too many characters";
            maxCharNotice.classList.add("warning");
            document.querySelector("#conceptsCovered").value = conceptsCovered.slice(0, maxCharLength);
        }
    },
    attachEvents() {
        // 'save' button
        document.querySelector("form").addEventListener("submit", this.saveButtonHandler);

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

        // 'clear' form button
        document.querySelector("#clear-button").addEventListener("click", this.clearButtonHandler);

        // character count event
        document.querySelector("#conceptsCovered").addEventListener("keyup", this.characterCountHandler)
    }
}

export default Events