const Form = {
	createEntryForm() {
		return `
        <form action="" id="journal-form">
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
                    <option value=""></option>
                    <option value="Caffeinated">Caffeinated</option>
                    <option value="Hacker">Hacker</option>
                    <option value="Meh">Meh</option>
                    <option value="Motivated">Motivated</option>
                    <option value="Zombie">Zombie</option>
                </select>        
            </fieldset>
            <input type="submit" id="save-entry" class="save btn btn-primary" value="Record Journal Entry">
            <input type="reset" id="clear-button" class="btn btn-default" value="Start Over">
        </form>`;
    },
    // Using <fieldset>, <legend>, <input type="radio">, and <label> HTML components, 
    // construct a set of radio buttons for selecting one of the moods. 
    // It's important that each of the radio buttons has the same value for the name attribute, 
    // but each should a different value for the value attribute.
    createMoodFilter(){
        return `
            <fieldset id="mood-filter">
                <legend>Filter Journal Entries by Mood</legend>
                <input id="mood-1" type="radio" name="mood" value="Caffeinated">
                <label for="mood-1">Caffeinated</label>
                <input id="mood-2" type="radio" name="mood" value="Hacker">
                <label for="mood-2">Hacker</label>
                <input id="mood-3" type="radio" name="mood" value="Meh">
                <label for="mood-3">Meh</label>
                <input id="mood-4" type="radio" name="mood" value="Motivated">
                <label for="mood-4">Motivated</label>
                <input id="mood-5" type="radio" name="mood" value="Zombie">
                <label for="mood-5">Motivated</label>
            </fieldset>
        `
    }
};

export default Form
