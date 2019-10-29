import Entry from "./entry.js";
import Data from "./data.js";
import Events from "./events.js"

const Dom = {
    renderEntryForm() {
        // TODO: move hard-coded form in index.html to this component
        console.log('Render that there entry form');
        let formContainer = document.querySelector("#formContainer")
        // console.log(formContainer)
        let entryFormEl = document.createElement("form")

        let dateEl = document.createElement("input")
        dateEl.id = "journalDate"
        let conceptEl = document.createElement("input")
        conceptEl.id = "journalConcept"
        let descriptionEl = document.createElement("input")
        descriptionEl.id = "journalDescription"
        let moodEl = document.createElement("input")
        moodEl.id = "journalMood"
        
        let dateLabelEl = document.createElement("label")
        dateLabelEl.htmlFor = "journalDate"
        dateLabelEl.textContent = "Date of Entry"
        let conceptLabelEl = document.createElement("label")
        conceptLabelEl.htmlFor = "journalConcept"
        conceptLabelEl.textContent = "Concepts Covered"
        let descriptionLabelEl = document.createElement("label")
        descriptionLabelEl.htmlFor = "journalDescription"
        descriptionLabelEl.textContent = "Journal Entry"
        let moodLabelEl = document.createElement("label")
        moodLabelEl.htmlFor = "journalMood"
        moodLabelEl.textContent = "Mood"

        entryFormEl.appendChild(dateLabelEl)
        entryFormEl.appendChild(dateEl)
        entryFormEl.appendChild(conceptLabelEl)
        entryFormEl.appendChild(conceptEl)
        entryFormEl.appendChild(descriptionLabelEl)
        entryFormEl.appendChild(descriptionEl)
        entryFormEl.appendChild(moodLabelEl)
        entryFormEl.appendChild(moodEl)
        // entryFormEl.appendChild()
        // formContainer.appendChild(entryFormEl)
        console.log(entryFormEl)

        let entryForm = `<form action="">
        <fieldset>
            <label for="journalDate">Date of Entry</label>
            <input type="date" name="journalDate" id="journalDate" class="form-field" required>
        </fieldset>
        <fieldset>
            <label for="conceptsCovered">Concepts Covered</label>
            <input type="text" name="conceptsCovered" id="conceptsCovered" class="form-field">                
        </fieldset>
        <fieldset>
            <label for="journalEntry">Journal Entry</label>
            <textarea name="journalEntry" id="journalEntry" cols="30" 
                rows="10"class="form-field"></textarea>            
        </fieldset>
        <fieldset>
            <label for="mood">Mood for the Day</label>
            <select name="mood" id="mood" class="form-field">
                <option value=""></option>
                <option value="Caffeinated">Caffeinated</option>
                <option value="Hacker">Hacker</option>
                <option value="Meh">Meh</option>
                <option value="Motivated">Motivated</option>
                <option value="Zombie">Zombie</option>
            </select>        
        </fieldset>
    </form>
    <button class="save" type='submit'>Record Journal Entry</button>`
        formContainer.innerHTML = entryForm
    },
    renderJournal() {
        Data.getJournalEntries()
        .then(entries => {
            let entryList = "";
            entries.forEach(entry => {
                entryList += Entry.renderHtml(entry);
            })
            document.querySelector(".entryLog").innerHTML = entryList;
            Events.attachButtonEvents();
        })
    }
}

export default Dom