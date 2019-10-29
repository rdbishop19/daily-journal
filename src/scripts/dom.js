import Entry from './entry.js';
import Data from './data.js';
import Events from './events.js';

const Dom = {
	renderEntryForm() {
		// move hard-coded form in index.html to this component
		// console.log('Render that there entry form');
		let formContainer = document.querySelector('#formContainer');
		// console.log(formContainer)

        let entryForm = `
        <form action="" id="journal-form">
            <fieldset class="form-group">
                <label for="journalDate">Date of Entry</label>
                <input type="date" name="journalDate" id="journalDate" class="form-field" required>
            </fieldset>
            <fieldset class="form-group">
                <label for="conceptsCovered">Concepts Covered</label><span id=characters-remaining></span>
                <input type="text" name="conceptsCovered" id="conceptsCovered" class="form-field" required>                
            </fieldset>
            <fieldset class="form-group">
                <label for="journalEntry">Journal Entry</label>
                <textarea name="journalEntry" id="journalEntry" cols="30" 
                    rows="10"class="form-field" required></textarea>            
            </fieldset>
            <fieldset class="form-group">
                <label for="mood">Mood for the Day</label>
                <select name="mood" id="mood" class="form-field" required>
                    <option value=""></option>
                    <option value="Caffeinated">Caffeinated</option>
                    <option value="Hacker">Hacker</option>
                    <option value="Meh">Meh</option>
                    <option value="Motivated">Motivated</option>
                    <option value="Zombie">Zombie</option>
                </select>        
            </fieldset>
            <input type="submit" id="save-entry" class="save btn btn-primary" value="Record Journal Entry">
        </form>`

		// Add form to DOM container
		formContainer.innerHTML = entryForm;
	},
	renderJournal() {
		Data.getJournalEntries().then((entries) => {
			let entryList = '';
			entries.forEach((entry) => {
				entryList += Entry.renderHtml(entry);
			});
			document.querySelector('.entryLog').innerHTML = entryList;
			Events.attachEvents();
		});
	}
};

export default Dom;
