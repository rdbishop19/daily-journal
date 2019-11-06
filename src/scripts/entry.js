import Data from "./data.js";

const formatDate = date => {
	//format date to be 'September 11, 1987' style
	const months = ["January", "February", "March",
					"April", "May", "June",
					"July", "August", "September",
					"October", "November", "December"]

	const splitDate = date.split("-")
	const month = months[parseInt(splitDate[1])-1]
	const day = parseInt(splitDate[2])
	const year = splitDate[0]
	const formattedDate = `${month} ${day}, ${year}`
	// console.log('formattedDate', formattedDate, month)
	return formattedDate
}

const updateFormFields = (entry) => {
	document.querySelector("#entryId").value = entry.id;
	document.querySelector("#journalDate").value = entry.date;
	document.querySelector("#conceptsCovered").value = entry.concept;
	document.querySelector("#journalEntry").value = entry.description;
	document.querySelector("#mood").value = entry.moodId;
	document.querySelector("#clear-button").disabled = true;
}

export default {
	createHtml({ id, concept, date, description, mood }) {
		return `
            <section id="entry--${id}" class="entry">
            <h2>${concept}</h2>
                <h3>${formatDate(date)}</h3>
                <p class="description">${description}</p>
                <p><strong>Mood:</strong> ${mood.label}</p>
                <button id="edit--${id}" class="btn edit">Edit</button>
                <button id="delete--${id}" class="btn btn-danger delete">Delete</button>
            </section>
            `;
	},

	editEntryObject(entryId) {
		const cachedEntries = JSON.parse(localStorage.getItem("entries"));
		if (cachedEntries.length) {
			for (const entry of cachedEntries) {
				if (entry.id === parseInt(entryId)) {
                    updateFormFields(entry);
                    break
				}
			}
		} else {
			Data.getJournalEntry(entryId).then(updateFormFields);
		}
	}
};