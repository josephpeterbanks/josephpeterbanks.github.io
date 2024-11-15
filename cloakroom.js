const tagGroups = {
    bag1: [],
    bag2: [],
    bag3: [],
    bag4: [],
    coat1: [],
    coat2: [],
    coat3: [],
    coat4: [],
    floor: []
};

function findItem() {
	const tagId = document.getElementById("tagId").value;
	const locationbox = document.getElementById("location");

	const match = tagId.match(/^\d+$/);
	
	if (match) {
		findTag(match, locationbox);
		locationbox.style.color = "";
		locationbox.style.display = "block";
		displayTags();
	} else {
		if (tagId.toLowerCase() == "dark") {
			locationbox.innerText = `Dark Mode On!
			`;
			locationbox.style.color = "";
			locationbox.style.display = "block";
			toggleDarkMode(locationbox);
		} else {
			locationbox.innerText = `Please enter a valid tag (e.g. 214, 783)!
			`;
			locationbox.style.color = "red";
			locationbox.style.display = "block";
		}
	}
}

function storeItem() {
	const storage = document.getElementById("storage").value;
	const notes = document.getElementById("itemNotes").value;
	const tagId = document.getElementById("tagId").value;
	const locationbox = document.getElementById("location");
	
	const match = tagId.match(/^\d+$/);
	
	if (match) {
		if (storage != "") {
			addTag(storage, tagId, notes, locationbox);
			locationbox.style.color = "";
			locationbox.style.display = "block";
			displayTags();
		} else {
			locationbox.innerText = `Please select a storage!
			`;
			locationbox.style.color = "red";
			locationbox.style.display = "block";
		}
	} else {
		if (tagId.toLowerCase() == "dark") {
			locationbox.innerText = `Dark Mode On!
			`;
			locationbox.style.color = "";
			locationbox.style.display = "block";
			toggleDarkMode(locationbox);
		} else {
			locationbox.innerText = `Please enter a valid tag (e.g. 214, 783)!
			`;
			locationbox.style.color = "red";
			locationbox.style.display = "block";
		}
	}
}

function addTag(group, number, note = "", locationbox) {
	for (const groupName in tagGroups) {
        const tagExists = tagGroups[groupName].some(tag => tag.number === number);
        if (tagExists) {
            locationbox.innerText = `${number} already added
			`;
            return;
        }
    }
	
    if (tagGroups[group]) {
        tagGroups[group].push({ number, note });
        saveToLocalStorage();
		locationbox.innerText = formatAddTag(number, group);
    }
}

function formatAddTag(number, group) {
	switch (group) {
        case "bag1":
            return `${number} added to Bags 1
			`;
        case "bag2":
            return `${number} added to Bags 2
			`;
        case "bag3":
            return `${number} added to Bags 3
			`;
		case "bag4":
            return `${number} added to Bags 4
			`;
		case "coat1":
            return `${number} added to Coats 1
			`;
		case "coat2":
            return `${number} added to Coats 2
			`;
		case "coat3":
            return `${number} added to Coats 3
			`;
		case "coat4":
            return `${number} added to Coats 4
			`;
		case "floor":
            return `${number} added to Floor
			`;
    }
}

function findTag(number, locationbox) {
	const searchNumber = String(number);
    for (const group in tagGroups) {
        const tag = tagGroups[group].find(t => t.number === searchNumber);
        if (tag) {
			tagLocation(searchNumber, group, tag.note ? tag.note : '', locationbox);
			return;
        }
    }
    locationbox.innerText = 'Tag not found';
}

function tagLocation(number, group, note, locationbox) {
	display = '';
	switch (group) {
        case "bag1":
            display = `${number} located in Bags 1
			${note}`;
			break;
        case "bag2":
            display = `${number} located in Bags 2
			${note}`;
			break;
        case "bag3":
            display = `${number} located in Bags 3
			${note}`;
			break;
		case "bag4":
            display = `${number} located in Bags 4
			${note}`;
			break;
		case "coat1":
            display = `${number} located in Coats 1
			${note}`;
			break;
		case "coat2":
            display = `${number} located in Coats 2
			${note}`;
			break;
		case "coat3":
            display = `${number} located in Coats 3
			${note}`;
			break;
		case "coat4":
            display = `${number} located in Coats 4
			${note}`;
			break;
		case "floor":
            display = `${number} located on the Floor
			${note}`;
			break;
    }
	locationbox.innerText = display;
}

function saveToLocalStorage() {
    localStorage.setItem("tagGroups", JSON.stringify(tagGroups));
}

function loadFromLocalStorage() {
    const storedData = localStorage.getItem("tagGroups");
    if (storedData) {
        Object.assign(tagGroups, JSON.parse(storedData));
    }
}

function countTotalTags() {
    let totalTags = 0;
    for (const group in tagGroups) {
        totalTags += tagGroups[group].length;
    }
    return totalTags;
}

function clearCloakroom() {
	const userConfirmed = window.confirm("Are you sure you want to clear the cloakroom? This action cannot be undone.");
	
	if (userConfirmed) {
		for (const group in tagGroups) {
			tagGroups[group] = [];
		}

		displayTags();
		saveToLocalStorage();
	}
}

function removeTag(number) {
	const tagNumber = String(number);
	
	const userConfirmed = window.confirm("Are you sure you want to remove this item? This action cannot be undone.");
	
	if (userConfirmed) {
		for (const group in tagGroups) {
			const tagIndex = tagGroups[group].findIndex(t => t.number === tagNumber);

			if (tagIndex !== -1) {
				tagGroups[group].splice(tagIndex, 1);

				saveToLocalStorage();

				displayTags();
				
				return;
			}
		}
	}
}

function removeItem() {
	const tagId = document.getElementById("tagId").value;
	const locationbox = document.getElementById("location");
	
	const match = tagId.match(/^\d+$/);
	
	if (match) {
		removeTag(match);
		locationbox.innerHTML = `Removed ${match}
		`;
		locationbox.style.color = "";
		locationbox.style.display = "block";
	} else {
		locationbox.innerHTML = `Please enter a valid tag (e.g. 214, 783)!
		`;
		locationbox.style.color = "red";
		locationbox.style.display = "block";
	}
}

function displayTags() {
    for (const group in tagGroups) {
        const tagListElement = document.getElementById(`${group}-tags`);
        tagListElement.innerHTML = "";

        tagGroups[group].forEach((tag) => {
            const tagItem = document.createElement("li");

            tagItem.textContent = `Tag #: ${tag.number}`;

            if (tag.note) {
                const noteElement = document.createElement("span");
                noteElement.textContent = ` ${tag.note}`;
                tagItem.appendChild(noteElement);
            }

            const removeButton = document.createElement("button");
            removeButton.textContent = "X";
            removeButton.classList.add("remove-button");

            removeButton.addEventListener("click", () => removeTag(tag.number));

            tagItem.appendChild(removeButton);

            tagListElement.appendChild(tagItem);
        });
    }
}

loadFromLocalStorage();
displayTags();