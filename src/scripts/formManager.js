import Data from "./data";

export default {
	createEntryForm() {
		return `
        <form action="" id="journal-form">
            <input type="hidden" id="entryId" value="" />
            <fieldset class="form-group">
                <label for="journalDate">Date of Entry</label><span><button value="Today" id="today-button">Today</button></span>
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
                    
                </select>        
            </fieldset>
            <input type="submit" id="save-entry" class="save btn btn-primary" value="Save Journal Entry">
            <input type="reset" id="clear-button" class="btn btn-default" value="Start Over">
        </form>`;
	},
	createMoodFilterForm(moods) {
		let moodForm = `<fieldset id="mood-filter">
                <legend>Filter Journal Entries by Mood</legend>`;
		moods.forEach((mood) => {
			// console.log(mood.id, mood.label)
			moodForm += `<label for="mood-${mood.id}"><input id="mood-${mood.id}" type="radio" name="mood--filter" value=${mood.id}>
                    ${mood.label}</label>`;
		});
		moodForm += "</fieldset>";
		return moodForm;
	},
	createSearchFilterForm() {
		return `
            <fieldset id="search-filter">
                <legend>Search Journal Entries</legend>
                <input id="search-text">
            </fieldset>
        `;
	}
};
