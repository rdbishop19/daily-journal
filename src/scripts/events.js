import Dom from "./dom.js";
import Data from "./data.js";
import Entry from "./entry.js";
import Validation from "./validation.js";

const entryLog = document.querySelector(".entryLog");

const flashJournalEntry = (entry) => {
	window.setTimeout(() => {
		entry.classList.toggle("updated");
	}, 200);
	window.setTimeout(() => {
		entry.classList.toggle("updated");
	}, 500);
	window.setTimeout(() => {
		entry.classList.toggle("updated");
	}, 700);
	window.setTimeout(() => {
		entry.classList.toggle("updated");
	}, 1000);
};

const filterSearchTerm = (searchTerm, entries) => {
	const matchingEntries = entries.filter((entry) => {
		for (let value of Object.values(entry)) {
			// note: .includes() only works with strings
			if (typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase())) {
				return true;
			}
		}
		return false;
	});
	// console.log('matches', matchingEntries)
	return matchingEntries;
};

const saveButtonHandler = () => {
	event.preventDefault(); // prevents refreshing the page with 'submit'
	const hiddenEntryId = document.querySelector("#entryId").value;
	const date = document.querySelector("#journalDate").value;
	const concept = document.querySelector("#conceptsCovered").value;
	const description = document.querySelector("#journalEntry").value;
	const moodId = parseInt(document.querySelector("#mood").value);

	if ([ concept, description ].some(Validation.badChar)) {
		window.alert(
			"Please use only numbers, letters, or { } : ; . ! ? in form fields. \nAlso, no profanity, please. :)"
		);
		return;
	}
	if (hiddenEntryId !== "") {
		Data.updateJournalEntry(hiddenEntryId, { date, concept, description, moodId })
			.then(Data.getJournalEntries)
			.then(Dom.renderJournal)
			.then(() => {
				document.getElementById("journal-form").reset();
				let entryId = document.querySelector("#entryId").value;
				document.querySelector("#entryId").value = "";
				document.querySelector("#clear-button").disabled = false;
				// console.log('entryId', entryId)
				let updatedEntry = document.getElementById(`entry--${entryId}`);
				// console.log('updatedEntry', updatedEntry)
				updatedEntry.scrollIntoView(true);
				flashJournalEntry(updatedEntry);
			});
	} else {
		Data.saveJournalEntry({ date, concept, description, moodId })
			.then(Data.getJournalEntries)
			.then(Dom.renderJournal)
			.then(() => {
				document.getElementById("journal-form").reset();
				window.scrollTo(0, document.body.scrollHeight);

				// target newest journal entry and apply temporary flash of color (advice from Guy C.)
				let entries = document.getElementsByClassName("description");
				// loop through all journal entries
				for (let entry of entries) {
					// is this the newest entry? if so, do fun stuff
					if (entry.textContent === description) {
						// console.log(entry.parentElement.id);
						let journalId = entry.parentElement.id;
						let newEntry = document.getElementById(journalId);
						flashJournalEntry(newEntry);
					}
				}
			});
	}
};

const deleteButtonHandler = () => {
	const clickEvent = event.target.id.split("--");
	// console.log(clickEvent)
	if (clickEvent[0] === "delete") {
		// console.log("Delete button clicked", event.target.id);
		const entryId = clickEvent[1];
		// console.log("deleted entry", entryId);
		if (window.confirm("Delete this entry?")) {
			Data.deleteJournalEntry(entryId).then(Data.getJournalEntries).then(Dom.renderJournal);
		}
	}
};

const editButtonHandler = () => {
	const clickEvent = event.target.id.split("--");
	// console.log(clickEvent)
	if (clickEvent[0] === "edit") {
		// console.log("Edit button clicked", event.target.id);
		const entryId = clickEvent[1];
		// console.log("edit entry", entryId);
		// TODO: figure out modal for edit window on clicked entry
		Entry.editEntryObject(entryId);
		document.getElementById("journalDate").focus();
		window.scrollTo(0, 0);
	}
};

const clearButtonHandler = () => {
	if (window.confirm("Click OK to clear the form and start over.")) {
		document.getElementById("journal-form").reset();
		document.getElementById("journalDate").focus();
		window.scrollTo(0, 0);
	}
};

const todayButtonHandler = () => {
	event.preventDefault();
	let dateField = document.querySelector("#journalDate");
	let date = new Date();

	// https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
	function formatDate(today) {
		var d = new Date(today),
			month = "" + (d.getMonth() + 1),
			day = "" + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;

		return [ year, month, day ].join("-");
	}
	let today = formatDate(date);
	dateField.value = today;
};

const radioButtonHandler = () => {
	const mood = event.target.value;
	const cachedEntries = JSON.parse(localStorage.getItem("entries"));
	if (!cachedEntries.length) {
		// console.log("used api");
		Data.getJournalEntries().then((entries) => {
			const filteredEntries = entries.filter((entry) => parseInt(entry.moodId) === parseInt(mood));
			Dom.renderJournal(filteredEntries);
		});
	} else {
		// console.log("used cache");
		const filteredEntries = cachedEntries.filter((entry) => parseInt(entry.moodId) === parseInt(mood));
		Dom.renderJournal(filteredEntries);
	}
};

const searchEventHandler = () => {
	/* filter entries by search term */
	if (event.keyCode === 13) {
		const searchTerm = event.target.value;
		const cachedEntries = JSON.parse(localStorage.getItem("entries"));
		if (!cachedEntries.length) {
			// console.log('used api');
			Data.getJournalEntries().then((entries) => {
				const matchingEntries = filterSearchTerm(searchTerm, entries);
				Dom.renderJournal(matchingEntries);
			});
		} else {
			// console.log('used cache')
			const matchingEntries = filterSearchTerm(searchTerm, cachedEntries);
			Dom.renderJournal(matchingEntries);
		}
	}
};

export default {
	attachFormEvents() {
		// 'filter by mood' radio buttons
		document.getElementsByName("mood--filter").forEach((button) => {
			button.addEventListener("click", radioButtonHandler);
		});

		// 'search filter'
		document.getElementById("search-filter").addEventListener("keypress", searchEventHandler);

		// 'save' button
		document.querySelector("form").addEventListener("submit", saveButtonHandler);

		// 'clear' form button
		document.querySelector("#clear-button").addEventListener("click", clearButtonHandler);

		// character count event
		document.querySelector("#conceptsCovered").addEventListener("keyup", Validation.characterCountHandler);

		// 'today' form button
		document.querySelector("#today-button").addEventListener("click", todayButtonHandler);
	},
	attachJournalEvents() {
		// 'delete' buttons
		entryLog.addEventListener("click", deleteButtonHandler);

		// 'edit' buttons
		entryLog.addEventListener("click", editButtonHandler);
	}
};
