export default {
    badChar(element){
        const mainRegEx = /[^a-z0-9{}\.\(\)\?\-!:;\s]/gi;
        const swearWords = /( (shit|damn|hell|fuck|bitch|) )/gi;
        // badCharFound (array) --> if anything not in 'mainRegEx' is found in the string
        const badCharFound = element.match(mainRegEx);
        const curseWordFound = element.match(swearWords);

        return badCharFound || curseWordFound ? true : false;
    },
    characterCountHandler() {
        let characterCount = document.querySelector("#conceptsCovered").value.length;
        let maxCharNotice = document.querySelector("#characters-remaining");
        let conceptsCovered = document.getElementById("conceptsCovered").value;
        let maxCharLength = 80;
        let displayAtNumber = maxCharLength - 15;

        if (characterCount <= displayAtNumber) {
            maxCharNotice.textContent = "";
            maxCharNotice.style.color = "black";
        } else if (characterCount < maxCharLength) {
            maxCharNotice.classList.remove("warning");
            maxCharNotice.textContent = `${maxCharLength - characterCount} remaining`;
        } else if ((characterCount = maxCharLength)) {
            setTimeout(() => {
                maxCharNotice.textContent = "0 remaining";
            }, 2000);
            maxCharNotice.textContent = "Too many characters";
            maxCharNotice.classList.add("warning");
            document.querySelector("#conceptsCovered").value = conceptsCovered.slice(0, maxCharLength);
        }
    }
}