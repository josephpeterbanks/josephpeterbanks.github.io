document.addEventListener("DOMContentLoaded", function() {
	if (localStorage.getItem('theme') === 'dark') {    
		const logo = document.getElementById('logo');
		logo.src = 'LogoDark.png';
        document.body.classList.add('dark-theme');
    }
});

const layout = {
	"stalls": {
		"A": { aisles: [5.5, 20.5, 25.5], outer: false},
		"B": { aisles: [10.5, 26.5, 36.5], outer: false},
		"C": { aisles: [11.5, 28.5, 39.5], outer: false},
		"D": { aisles: [12.5, 30.5, 42.5], outer: false},
		"E": { aisles: [11.5, 28.5, 39.5], outer: false},
		"F": { aisles: [11.5, 29.5, 40.5], outer: false},
		"G": { aisles: [11.5, 30.5, 41.5], outer: false},
		"H": { aisles: [11.5, 31.5, 42.5], outer: false},
		"J": { aisles: [9.5, 28.5, 37.5], outer: false},
		"K": { aisles: [8.5, 28.5, 36.5], outer: false},
		"L": { aisles: [7.5, 28.5, 35.5], outer: false},
		"M": { aisles: [5.5, 27.5, 32.5], outer: false},
		"N": { aisles: [3.5, 26.5, 29.5], outer: false},
		"O": { aisles: [20.5], outer: "left"},
		"P": { aisles: [17.5], outer: "left"},
		"Q": { aisles: [10.5], outer: "left"}
	},
	"dress-circle": {
		"A": { aisles: [14.5, 28.5, 44.5, 58.5, 72.5], outer: "extend"},
		"B": { aisles: [8.5, 22.5, 39.5, 53.5, 61.5], outer: "extend"},
		"C": { aisles: [2.5, 17.5, 35.5, 50.5, 52.5], outer: "extend"},
		"D": { aisles: [1.5, 17.5, 36.5, 52.5, 53.5], outer: "extend"},
		"E": { aisles: [18.5, 38.5, 56.5], outer: true},
		"F": { aisles: [19.5, 40.5, 59.5], outer: true},
		"G": { aisles: [18.5, 40.5, 58.5], outer: true},
		"H": { aisles: [17.5, 40.5, 57.5], outer: true},
		"J": { aisles: [17.5, 41.5, 58.5], outer: true},
		"K": { aisles: [16.5, 41.5, 57.5], outer: true},
		"L": { aisles: [14.5, 38.5, 52.5], outer: true}
	},
	"upper-circle": {
		"A": { aisles: [16.5, 32.5, 48.5], outer: true},
		"B": { aisles: [17.5, 34.5, 51.5], outer: true},
		"C": { aisles: [19.5, 37.5, 56.5], outer: true},
		"D": { aisles: [19.5, 38.5, 57.5], outer: true},
		"E": { aisles: [18.5, 38.5, 56.5], outer: true},
		"F": { aisles: [18.5, 39.5, 57.5], outer: true},
		"G": { aisles: [18.5, 40.5, 58.5], outer: true},
		"H": { aisles: [17.5, 40.5, 57.5], outer: true},
		"J": { aisles: [17.5, 41.5, 58.5], outer: true},
		"K": { aisles: [16.5, 40.5, 56.5], outer: true},
		"L": { aisles: [16.5, 40.5, 56.5], outer: true}
	},
	"balcony": {
		"A": { aisles: [5.5, 11.5, 19.5, 27.5, 35.5, 41.5, 46.5], outer: "extend"},
		"B": { aisles: [4.5, 11.5, 20.5, 29.5, 38.5, 45.5, 49.5], outer: "extend"},
		"C": { aisles: [3.5, 10.5, 19.5, 28.5, 37.5, 44.5, 47.5], outer: "extend"},
		"D": { aisles: [7.5, 17.5, 27.5, 37.5, 44.5], outer: true},
		"E": { aisles: [8.5, 19.5, 30.5, 41.5, 49.5], outer: true},
		"F": { aisles: [9.5, 20.5, 31.5, 42.5, 51.5], outer: true},
		"G": { aisles: [9.5, 21.5, 33.5, 45.5, 54.5], outer: true},
		"H": { aisles: [9.5, 21.5, 33.5, 45.5, 54.5], outer: true},
		"J": { aisles: [7.5, 20.5, 33.5, 46.5, 53.5], outer: true},
		"K": { aisles: [6.5, 19.5, 32.5, 45.5, 51.5], outer: true}
	}
};

const rowArray = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "O", "P", "Q"];
const aisleArray = [0, 1, -1, 4, 2, 3];

var answer = null;
var quiztype = null;
var aisle = null;
var row = null;
var level = null;

function getQuestion() {
	quiztype = document.getElementById("quiztype").value;
	level = document.getElementById("level").value;
	aisle = Number(document.getElementById("aisle").value);
	const route = document.getElementById("route");

	if (level == "" || quiztype == "" || aisle === "") {
		addTextToRoute(route, `Please select criteria!
		`, "red");
		return;
	}
	
	// Checks if an invalid aisle is used
	if (level == "stalls") {
		if (checkAisleValidity(aisle, 2)) {
			addTextToRoute(route, `Invalid Aisle!
			`, "red");
			return;
		}
	} else if (level == "dress-circle" || level == "upper-circle") {
		if (checkAisleValidity(aisle, 4)) {
			addTextToRoute(route, `Invalid Aisle!
			`, "red");
			return;
		}
	}
	
	// Create the question
	row = getRandomRow(level, aisle);
	if (quiztype == "sas") {
		postQuestion(aisle, quiztype);
	} else if (quiztype == "aas") {
		if (level == "stalls") {
			aisle = aisleArray[Math.floor(Math.random() * 2)]
			postQuestion(aisle, quiztype);
		} else if (level == "dress-circle" || level == "upper-circle") {
			aisle = aisleArray[Math.floor(Math.random() * 4)]
			postQuestion(aisle, quiztype);
		} else if (level == "balcony") {
			aisle = aisleArray[Math.floor(Math.random() * 6)]
			postQuestion(aisle, quiztype);
		}
	} else if (quiztype == "sad") {
		postQuestion(aisle, quiztype);
	} else if (quiztype == "aad") {
		if (level == "stalls") {
			aisle = aisleArray[Math.floor(Math.random() * 2)]
			postQuestion(aisle, quiztype);
		} else if (level == "dress-circle" || level == "upper-circle") {
			aisle = aisleArray[Math.floor(Math.random() * 4)]
			postQuestion(aisle, quiztype);
		} else if (level == "balcony") {
			aisle = aisleArray[Math.floor(Math.random() * 6)]
			postQuestion(aisle, quiztype);
		}
	}
}

function postQuestion(aisle, quiztype) {
	if (quiztype == "sas" || quiztype == "aas") {
		answer = getAisleSeat(level, aisle, row);
		addTextToRoute(route, `${getAisleText(aisle)} Row ${row}?
		`, "");
	} else if (quiztype == "sad" || quiztype == "aad") {
		seat = getSeatInRange(level, aisle, row);
		aisleSeat = getAisleSeat(level, aisle, row) + 0.5;
		answer = Math.ceil(Math.abs(aisleSeat - seat));
		if (quiztype == "sad") {
			addTextToRoute(route, `${getAisleText(aisle)} ${row}${seat}?
			`, "");
		} else {
			addTextToRoute(route, `${row}${seat}?
			`, "");
		}
	}
}

function submitAnswer() {
	const submission = document.getElementById("answer").value.trim();
	
	if (answer == null) {
		addTextToRoute(route, `Please start a question!
		`, "red");
	} else if (submission == answer) {
		if (quiztype == "sas" || quiztype == "aas") {
			addTextToRoute(route, `Correct!
			${getAisleText(aisle)} ${row}${answer}`, "green");
		} else {
			addTextToRoute(route, `Correct!
			${answer} seats from ${getAisleText(aisle)} ${row}${getAisleSeat(level, aisle, row)}`, "green");
		}
	} else {
		if (quiztype == "sas" || quiztype == "aas") {
			addTextToRoute(route, `Incorrect!
			${getAisleText(aisle)} ${row}${answer}`, "red");
		} else {
			addTextToRoute(route, `Incorrect!
			${answer} seats from ${getAisleText(aisle)} ${row}${getAisleSeat(level, aisle, row)}`, "red");
		}
	}
	answer = null;
}

function getRandomRow(level, aisle) {
	const levelInfo = layout[level];
	const rowRange = Object.keys(levelInfo).length;
	let row = null;
	while (row === null) {
		const rowNumber = Math.floor(Math.random() * rowRange);
		const rowInfo = layout[level][rowArray[rowNumber]];
		const outer = rowInfo.outer;
		if (outer != "left" || aisle != 0) {
			row = rowArray[rowNumber];
		}
	}
	return row;
}

function getAisleSeat(level, aisle, row) {
	const rowInfo = layout[level][row];
	const aisles = rowInfo.aisles;
	const outer = rowInfo.outer;
	
	if (outer === "left") {
		return aisles[0] - 0.5;
	} else if (outer === false) {
		if (aisle == -1) {
			return 1;
		} else {
			return aisles[aisle] - 0.5;
		}
	} else if (outer === true) {
		if (aisle == -1) {
			return 0;
		} else if (aisle == 4) {
			const noAisles = aisles.length;
			return aisles[noAisles - 1] - 0.5;
		} else {
			return aisles[aisle] - 0.5;
		}
	} else if (outer === "extend") {
		if (aisle == 4) {
			const noAisles = aisles.length;
			return aisles[noAisles - 2] - 0.5;
		} else {
			return aisles[aisle + 1] - 0.5;
		}
	}
}

function getSeatInRange(level, aisle, row) {
	if (layout[level][row]) {
		const rowInfo = layout[level][row];
		const aisles = rowInfo.aisles;
		const outer = rowInfo.outer;
		if (outer === "left") {
			return Math.floor(Math.random() * (aisles[0] + 0.5));
		} else if (outer === false) {
			if (aisle == 0) {
				return getSeatBetween(1, findMiddleSeat(aisles[0] - 0.5, aisles[1] - 0.5));
			} else {
				return getSeatBetween(findMiddleSeat(aisles[aisle - 1] - 0.5, aisles[aisle] - 0.5), findMiddleSeat(aisles[aisle] - 0.5, aisles[aisle + 1] - 0.5));
			}
		} else if (outer === true) {
			if (aisle == -1) {
				return getSeatBetween(1, findMiddleSeat(1, aisles[0] - 0.5));
			} else if (aisle == 4) {
				const noAisles = aisles.length;
				return getSeatBetween(findMiddleSeat(aisles[noAisles - 1] - 0.5, aisles[noAisles - 2] - 0.5), aisles[noAisles - 1] - 0.5);
			} else if (aisle == 0) {
				return getSeatBetween(findMiddleSeat(1, aisles[0] - 0.5), findMiddleSeat(aisles[0] - 0.5, aisles[1] - 0.5));
			} else {
				return getSeatBetween(findMiddleSeat(aisles[aisle - 1] - 0.5, aisles[aisle] - 0.5), findMiddleSeat(aisles[aisle] - 0.5, aisles[aisle + 1] - 0.5));
			}
		} else if (outer === "extend") {
			if (aisle == -1) {
				return getSeatBetween(1, findMiddleSeat(aisles[0] - 0.5, aisles[1] - 0.5));
			} else if (aisle == 4) {
				const noAisles = aisles.length;
				return getSeatBetween(findMiddleSeat(aisles[noAisles - 2] - 0.5, aisles[noAisles - 3] - 0.5), aisles[noAisles - 1] - 0.5);
			} else  {
				return getSeatBetween(findMiddleSeat(aisles[aisle] - 0.5, aisles[aisle + 1] - 0.5), findMiddleSeat(aisles[aisle + 1] - 0.5, aisles[aisle + 2] - 0.5));
			}
		}
	}
}

function findMiddleSeat(aisleRight, aisleLeft) {
	return aisleRight + Math.ceil((aisleLeft - aisleRight) / 2);
}

function getSeatBetween(low, high) {
	return getRndInteger(low, high + 1);
}

function getAisleText(aisle) {
	switch (aisle) {
		case -1:
			return "Right Side";
		case 0:
			return "Aisle 1";
		case 1:
			return "Aisle 2";
		case 2:
			return "Aisle 3";
		case 3:
			return "Aisle 4";
		case 4:
			return "Left Side";
		default:
			return "test";
	}
}

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min) ) + min;
}

function checkAisleValidity(aisle, aisleStartIndex) {
	for (let i = aisleStartIndex; i < aisleArray.length; i++) {
		if (aisleArray[i] == aisle) {
			return true;
		}
	}
	return false;
}