const ticketGroups = {
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
	//	const storage = document.getElementById("storage").value;
	const ticketId = document.getElementById("ticketId").value.trim();
	const locationbox = document.getElementById("location");

	const match = ticketId.match(/^\d+$/);
	
	if (match) {
		findTicket(match, locationbox);
		locationbox.style.color = "";
		locationbox.style.display = "block";
		displayTickets();
	} else {
		if (ticketId.toLowerCase() == "dark") {
			locationbox.innerText = `Dark Mode On!
			`;
			locationbox.style.color = "";
			locationbox.style.display = "block";
			toggleDarkMode(locationbox);
		} else {
			locationbox.innerText = `Please enter a valid ticket (e.g. 214, 783)!
			`;
			locationbox.style.color = "red";
			locationbox.style.display = "block";
		}
	}
}

function storeItem() {
	const storage = document.getElementById("storage").value;
	const notes = document.getElementById("itemNotes").value;
	const ticketId = document.getElementById("ticketId").value.trim();
	const locationbox = document.getElementById("location");
	
	const match = ticketId.match(/^\d+$/);
	
	if (match) {
		if (storage != "") {
			addTicket(storage, ticketId, notes, locationbox);
			locationbox.style.color = "";
			locationbox.style.display = "block";
			displayTickets();
		} else {
			locationbox.innerText = `Please select a storage!
			`;
			locationbox.style.color = "red";
			locationbox.style.display = "block";
		}
	} else {
		if (ticketId.toLowerCase() == "dark") {
			locationbox.innerText = `Dark Mode On!
			`;
			locationbox.style.color = "";
			locationbox.style.display = "block";
			toggleDarkMode(locationbox);
		} else {
			locationbox.innerText = `Please enter a valid ticket (e.g. 214, 783)!
			`;
			locationbox.style.color = "red";
			locationbox.style.display = "block";
		}
	}
}

function addTicket(group, number, note = "", locationbox) {
	for (const groupName in ticketGroups) {
        const ticketExists = ticketGroups[groupName].some(ticket => ticket.number === number);
        if (ticketExists) {
            locationbox.innerText = `${number} already added
			`;
            return;
        }
    }
	
    if (ticketGroups[group]) {
        ticketGroups[group].push({ number, note });
        saveToLocalStorage();
		locationbox.innerText = `${number} added to ${group}
		`;
    }
}

function findTicket(number, locationbox) {
	const searchNumber = String(number);
    for (const group in ticketGroups) {
        const ticket = ticketGroups[group].find(t => t.number === searchNumber);
        if (ticket) {
			ticketLocation(searchNumber, group, ticket.note ? ticket.note : '', locationbox);
			return;
        }
    }
    locationbox.innerText = 'Ticket not found';
}

function ticketLocation(number, group, note, locationbox) {
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
    localStorage.setItem("ticketGroups", JSON.stringify(ticketGroups));
}

function loadFromLocalStorage() {
    const storedData = localStorage.getItem("ticketGroups");
    if (storedData) {
        Object.assign(ticketGroups, JSON.parse(storedData));
    }
}

function countTotalTickets() {
    let totalTickets = 0;
    for (const group in ticketGroups) {
        totalTickets += ticketGroups[group].length;
    }
    return totalTickets;
}

function clearCloakroom() {
	const userConfirmed = window.confirm("Are you sure you want to clear the cloakroom? This action cannot be undone.");
	
	if (userConfirmed) {
		for (const group in ticketGroups) {
			ticketGroups[group] = [];
		}

		displayTickets();
		saveToLocalStorage();
	}
}

function removeTicket(number) {
	const ticketNumber = String(number);
	
	const userConfirmed = window.confirm("Are you sure you want to remove this item? This action cannot be undone.");
	
	if (userConfirmed) {
		for (const group in ticketGroups) {
			const ticketIndex = ticketGroups[group].findIndex(t => t.number === ticketNumber);

			if (ticketIndex !== -1) {
				ticketGroups[group].splice(ticketIndex, 1);

				saveToLocalStorage();

				displayTickets();
				
				return;
			}
		}
	}
}

function displayTickets() {
    for (const group in ticketGroups) {
        const ticketListElement = document.getElementById(`${group}-tickets`);
        ticketListElement.innerHTML = "";

        ticketGroups[group].forEach((ticket) => {
            const ticketItem = document.createElement("li");

            ticketItem.textContent = `Ticket #: ${ticket.number}`;

            if (ticket.note) {
                const noteElement = document.createElement("span");
                noteElement.textContent = ` ${ticket.note}`;
                ticketItem.appendChild(noteElement);
            }

            const removeButton = document.createElement("button");
            removeButton.textContent = "X";
            removeButton.classList.add("remove-button");

            removeButton.addEventListener("click", () => removeTicket(ticket.number));

            ticketItem.appendChild(removeButton);

            ticketListElement.appendChild(ticketItem);
        });
    }
}

loadFromLocalStorage();
displayTickets();