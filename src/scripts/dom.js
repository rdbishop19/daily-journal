import entry from "./entry.js";
import data from "./data.js";

const dom = {
    renderJournal(entries) {
        let entryList = "";
        entries.forEach(item => {
            entryList += entry.renderHtml(item);
        })
        document.querySelector(".entryLog").innerHTML = entryList;
    },
    createSubmitHandler() {
        const getFormFields = () => {
            let journalDate = document.querySelector("#journalDate")
            let conceptsCovered = document.querySelector("#conceptsCovered")
            let journalEntry = document.querySelector("#journalEntry")
            let mood = document.querySelector("#mood")
        
            const newJournalEntry = entry.createEntryObject(
                journalDate, conceptsCovered, journalEntry, mood)
            // post.then(get).then(render)
            data.saveJournalEntry(newJournalEntry)
                .then(data.getJournalEntries) // don't invoke function = ex. getJournalEntries()
                .then(entries => dom.renderJournal(entries))
        }
        document.querySelector("button").addEventListener("click", getFormFields);
    },
    addCharacterCountEvent() {
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
        document.querySelector("#conceptsCovered").addEventListener("keyup", characterEventHandler)
    }
}

export default dom