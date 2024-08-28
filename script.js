document.getElementById('seatId').addEventListener('keydown', function(event) {
	if (event.key === 'Enter') {
		event.preventDefault();
		findSeat();
	}
});

document.getElementById('seatId').addEventListener('focus', function() {
	this.value = '';
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
	
function toggleDarkMode(route) {
	document.body.classList.toggle('dark-theme');
    
    const logo = document.getElementById('logo');
    
    if (document.body.classList.contains('dark-theme')) {
        logo.src = 'LogoDark.png';
		route.innerText = `Dark Mode On!
		`;
		route.style.color = "";
		route.style.display = "block";
    } else {
        logo.src = 'Logo.png';
		route.innerText = `Dark Mode Off!
		`;
		route.style.color = "";
		route.style.display = "block";
    }
}
	
function getSuffix(num) {
    const lastDigit = num % 10;
    const lastTwoDigits = num % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
        return num + 'th';
    }

    switch (lastDigit) {
        case 1:
            return num + 'st';
        case 2:
            return num + 'nd';
        case 3:
            return num + 'rd';
        default:
            return num + 'th';
    }
}

function findSeat() {
	const level = document.getElementById("level").value;
	const seatId = document.getElementById("seatId").value.trim();
	const route = document.getElementById("route");
	
	const match = seatId.match(/^([A-Za-z])(\d+)$/);
	if (match) {
		const row = match[1];
		const seatNumber = match[2];

		findBestRoute(level, row.toUpperCase(), seatNumber, route);
	} else {
		if (seatId.toLowerCase() == "dark") {
			route.innerText = `Dark Mode On!
			`;
			route.style.color = "";
			route.style.display = "block";
			toggleDarkMode(route);
		} else {
			route.innerText = `Please enter a valid seat (e.g. B21, G36)!
			`;
			route.style.color = "red";
			route.style.display = "block";
		}
	}
}

function findBestRoute(level, row, seatNumber, route) {

	if (layout[level][row]) {
		const rowInfo = layout[level][row];
		const aisles = rowInfo.aisles;
		const outer = rowInfo.outer;
		
		if (seatNumber <= aisles[aisles.length - 1] && seatNumber > 0) {
			let routeDesc = "";
			if (outer == "left") {
				const offset = aisles[0] - seatNumber + 0.5;
				if (offset == 1) {
					routeDesc = `Door 3 Right
					On the Aisle`;
				} else {
					routeDesc = `Door 3 Right
					${getSuffix(offset)} Seat from the Aisle`;
				}
			} else if (outer == true) {
			
				let closestAisle = 0;
				let minDistance = Math.abs(seatNumber - 0.5);
				let offset = seatNumber;

				for (let i = 0; i < aisles.length; i++) {
					const distance = Math.abs(seatNumber - aisles[i]);
					if (distance < minDistance) {
						offset = Math.abs(aisles[i] - seatNumber) + 0.5;
						minDistance = distance;
						closestAisle = i+1;
					}
				}
				
				const direction = seatNumber < aisles[closestAisle-1] ? "Right" : "Left";
				if (closestAisle == 0) {
					if (offset == 1) {
						routeDesc = `Far Right Aisle
						On the Aisle`;
					} else {
						routeDesc = `Far Right Aisle
						${getSuffix(offset)} Seat from the Aisle`;
					}
				} else if (closestAisle == aisles.length) {
					if (offset == 1) {
						routeDesc = `Far Left Aisle
						On the Aisle`;
					} else {
						routeDesc = `Far Left Aisle
						${getSuffix(offset)} Seat from the Aisle`;
					}
				} else {
					if (offset == 1) {
						routeDesc = `Aisle ${closestAisle} ${direction}
						On the Aisle`;
					} else {
						routeDesc = `Aisle ${closestAisle} ${direction}
						${getSuffix(offset)} Seat from the Aisle`;
					}
				}
			} else if (outer == false) {
				let closestAisle = 1;
				let minDistance = Math.abs(seatNumber - aisles[0]);
				let offset = Math.abs(aisles[0] - seatNumber) + 0.5;

				for (let i = 1; i < aisles.length - 1; i++) {
					const distance = Math.abs(seatNumber - aisles[i]);
					if (distance < minDistance) {
						offset = Math.abs(aisles[i] - seatNumber) + 0.5;
						minDistance = distance;
						closestAisle = i+1;
					}
				}
				
				const direction = seatNumber < aisles[closestAisle-1] ? "Right" : "Left";
				
				if (offset == 1) {
					routeDesc = `Aisle ${closestAisle} ${direction}
					On the Aisle`;
				} else {
					routeDesc = `Aisle ${closestAisle} ${direction}
					${getSuffix(offset)} Seat from the Aisle`;
				}
			} else if (outer == "extend") {
				let closestAisle = 1;
				let minDistance = Math.abs(seatNumber - aisles[0]);
				let offset = Math.abs(aisles[0] - seatNumber) + 0.5;

				for (let i = 1; i < aisles.length - 1; i++) {
					const distance = Math.abs(seatNumber - aisles[i]);
					if (distance < minDistance) {
						offset = Math.abs(aisles[i] - seatNumber) + 0.5;
						minDistance = distance;
						closestAisle = i+1;
					}
				}
				
				const direction = seatNumber < aisles[closestAisle-1] ? "Right" : "Left";
				closestAisle = closestAisle - 1;
				
				if (closestAisle == 0) {
					if (offset == 1) {
						routeDesc = `Far Right Aisle
						On the Aisle`;
					} else {
						routeDesc = `Far Right Aisle
						${getSuffix(offset)} Seat from the Aisle`;
					}
				} else if (closestAisle == aisles.length - 2) {
					if (offset == 1) {
						routeDesc = `Far Left Aisle
						On the Aisle`;
					} else {
						routeDesc = `Far Left Aisle
						${getSuffix(offset)} Seat from the Aisle`;
					}
				} else {
					if (offset == 1) {
						routeDesc = `Aisle ${closestAisle} ${direction}
						On the Aisle`;
					} else {
						routeDesc = `Aisle ${closestAisle} ${direction}
						${getSuffix(offset)} Seat from the Aisle`;
					}
				}
			}
			route.innerText = routeDesc;
			route.style.color = "";
			route.style.display = "block";
		} else {
			route.innerText = "Invalid seat number.";
			route.style.color = "red";
			route.style.display = "block";
		}
	} else {
		route.innerText = "Invalid row on level.";
		route.style.color = "red";
		route.style.display = "block";
	}
}