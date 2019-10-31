import Dom from './dom.js';
import Data from './data.js';
import Entry from './entry.js';

const flashJournalEntry = (entry) => {
	window.setTimeout(()=>{
		entry.classList.toggle("updated")
	}, 200)
	window.setTimeout(()=>{
		entry.classList.toggle("updated")
	}, 500)
	window.setTimeout(()=>{
		entry.classList.toggle("updated")
	}, 700)
	window.setTimeout(()=>{
		entry.classList.toggle("updated")
	}, 1000)
}


const Events = {
	saveButtonHandler() {
        event.preventDefault(); // prevents refreshing the page with 'submit'
        const hiddenEntryId = document.querySelector('#entryId').value
		const date = document.querySelector('#journalDate').value;
		const concept = document.querySelector('#conceptsCovered').value;
		const description = document.querySelector('#journalEntry').value;
		const mood = document.querySelector('#mood').value;

        const mainRegEx = /[^a-z0-9{}\.\(\)\?\-!:;\s]/gi
        const swearWords = /( (shit|damn|hell|fuck|bitch|) )/gi

		function badChar(element) {
			// badCharFound (array) --> if anything not in 'mainRegEx' is found in the string
            const badCharFound = element.match(mainRegEx);
            const curseWordFound = element.match(swearWords)

			return badCharFound || curseWordFound ? true : false;
		}
		if ([ concept, description].some(badChar)) {
            window.alert('Please use only numbers, letters, or { } : ; . ! ? in form fields. \nAlso, no profanity, please. :)');
            return
		}
		
        if (hiddenEntryId !== ""){
            Data.updateJournalEntry(hiddenEntryId, {date, concept, description, mood})
                .then(Data.getJournalEntries)
                .then(Dom.renderJournal)
                .then(() => {
					document.getElementById('journal-form').reset()
					let entryId = document.querySelector('#entryId').value
                    document.querySelector('#entryId').value = ""
					document.querySelector("#clear-button").disabled = false;
					// console.log('entryId', entryId)
					let updatedEntry = document.getElementById(`entry--${entryId}`)
					// console.log('updatedEntry', updatedEntry)
					updatedEntry.scrollIntoView(true)
					flashJournalEntry(updatedEntry)
                })
        }
        else {
			Data.saveJournalEntry({ date, concept, description, mood })
				.then(Data.getJournalEntries)
				.then(Dom.renderJournal)
				.then(() => {
					document.getElementById('journal-form').reset()
					window.scrollTo(0,document.body.scrollHeight)

					// target newest journal entry and apply temporary flash of color (advice from Guy C.)
					let entries = document.getElementsByClassName("description")
					// loop through all journal entries
					for (let entry of entries){
						// is this the newest entry? if so, do fun stuff
						if (entry.textContent === description) {
							// console.log(entry.parentElement.id);
							let journalId = entry.parentElement.id
							let newEntry = document.getElementById(journalId)
							
							flashJournalEntry(newEntry)
						}
					}
				})
        }
	},
	deleteButtonHandler() {
		// console.log("Delete button clicked", event.target.id);
		let entryId = event.target.id.split('--')[1];
		if (window.confirm('Delete this entry?')) {
			console.log('deleted entry', entryId);
            Data.deleteJournalEntry(entryId)
                .then(Data.getJournalEntries)
                .then(Dom.renderJournal);
		}
	},
	editButtonHandler() {
		let entryId = event.target.id.split('--')[1];
		console.log('edit entry', entryId);
        // TODO: figure out modal for edit window on clicked entry
		Entry.editEntryObject(entryId);
		document.getElementById('journalDate').focus();
		window.scrollTo(0,0)

	},
	clearButtonHandler() {
		if (window.confirm('Click OK to clear the form and start over.')) {
			document.getElementById('journal-form').reset();
			document.getElementById('journalDate').focus();
			window.scrollTo(0,0)
		}
	},
	todayButtonHandler() {
		event.preventDefault();
		let dateField = document.querySelector('#journalDate');
		let date = new Date();

		// https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
		function formatDate(today) {
			var d = new Date(today),
				month = '' + (d.getMonth() + 1),
				day = '' + d.getDate(),
				year = d.getFullYear();

			if (month.length < 2) month = '0' + month;
			if (day.length < 2) day = '0' + day;

			return [ year, month, day ].join('-');
		}
		let today = formatDate(date);
		dateField.value = today;
	},
	characterCountHandler() {
		let characterCount = document.querySelector('#conceptsCovered').value.length;
		let maxCharNotice = document.querySelector('#characters-remaining');
		let conceptsCovered = document.getElementById('conceptsCovered').value;
		let maxCharLength = 80;
		let displayAtNumber = maxCharLength - 15;

		if (characterCount <= displayAtNumber) {
			maxCharNotice.textContent = '';
			maxCharNotice.style.color = 'black';
		} else if (characterCount < maxCharLength) {
			maxCharNotice.classList.remove('warning');
			maxCharNotice.textContent = `${maxCharLength - characterCount} remaining`;
		} else if ((characterCount = maxCharLength)) {
			setTimeout(() => {
				maxCharNotice.textContent = '0 remaining';
			}, 2000);
			maxCharNotice.textContent = 'Too many characters';
			maxCharNotice.classList.add('warning');
			document.querySelector('#conceptsCovered').value = conceptsCovered.slice(0, maxCharLength);
		}
    },
    radioButtonHandler(){
        const mood = event.target.value;
        // console.log(mood)
        Data.getJournalEntries().then((entries)=>{
            // console.log(entries)
            let filteredEntries = entries.filter(entry => entry.mood === mood)
            // console.log(filteredEntries)            
            Dom.renderJournal(filteredEntries)
        })
    },
    attachFormEvents() {
        // 'filter by mood' radio buttons
        document.getElementsByName("mood--filter").forEach(button => {
            button.addEventListener("click", this.radioButtonHandler)
        })
        // 'save' button
        document.querySelector('form')
            .addEventListener('submit', this.saveButtonHandler);
        // 'clear' form button
        document.querySelector('#clear-button')
            .addEventListener('click', this.clearButtonHandler);
    
        // character count event
        document.querySelector('#conceptsCovered')
            .addEventListener('keyup', this.characterCountHandler);
    
        // 'today' form button
        document.querySelector('#today-button')
            .addEventListener('click', this.todayButtonHandler);
    },
	attachJournalEvents() {
		// 'delete' buttons
		let deleteButtons = document.querySelectorAll('.delete');
		deleteButtons.forEach((button) => {
			button.addEventListener('click', this.deleteButtonHandler);
		});

		// 'edit' buttons
		let editButtons = document.querySelectorAll('.edit');
		editButtons.forEach((button) => {
			button.addEventListener('click', this.editButtonHandler);
		});
	}
};

export default Events;
