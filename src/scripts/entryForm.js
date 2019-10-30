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
	}
};

export default Form
