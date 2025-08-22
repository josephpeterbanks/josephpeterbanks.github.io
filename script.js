function newToggleDarkMode() {
	document.body.classList.toggle('dark-theme');
    
    const logo = document.getElementById('logo');
    
    if (document.body.classList.contains('dark-theme')) {
		localStorage.setItem('theme', 'dark');
        logo.src = 'LogoDark.png';
    } else {
		localStorage.setItem('theme', 'light');
        logo.src = 'Logo.png';
    }
}

function addTextToRoute(route, t, col) {
	route.innerText = t;
	route.style.color = col;
	route.style.display = "block";
}

document.addEventListener("DOMContentLoaded", function() {
	const versionContainer = document.querySelector('.version-container');
	
	const seatInput = document.getElementById('seatId');
	const ticketInput = document.getElementById('ticketId');
	const answer = document.getElementById('answer');
	
	if (seatInput) {
		seatInput.addEventListener('focus', function() {
			this.value = '';
		});
		seatInput.addEventListener('keydown', function(event) {
			if (event.key === 'Enter') {
				event.preventDefault();
				findSeat();
			}
		});
	}
	
	if (ticketInput) {
		ticketInput.addEventListener('focus', function() {
			this.value = '';
		});
		ticketInput.addEventListener('keydown', function(event) {
			if (event.key === 'Enter') {
				event.preventDefault();
				findTicket();
			}
		});
	}
	
	if (answer) {
		answer.addEventListener('focus', function() {
			this.value = '';
		});
		answer.addEventListener('keydown', function(event) {
			if (event.key === 'Enter') {
				event.preventDefault();
				submitAnswer();
				this.value = '';
			}
		});
	}
    
    if (versionContainer) {
        versionContainer.addEventListener('click', function() {
            const versionInfo = document.querySelector('.version-info');
            versionInfo.classList.add('show');
			
			setTimeout(function() {
				versionInfo.classList.remove('show');
			}, 1500);
        });
    } else {
        console.error('Version container not found');
    }
	
    const darkLogo = new Image();
    darkLogo.src = 'LogoDark.png';
	
	const Claude = new Image();
	Claude.src = 'Claude.png';
	
	const darkClaude = new Image();
	darkClaude.src = 'ClaudeDark.png';
	
	fetch('version.txt')
		.then(response => response.text())
		.then(version => {
			document.getElementById('version').innerText = version.trim();
		});
});

window.addEventListener("load", function() {
	const menuHeight = document.querySelector('.menu').offsetHeight;
	setTimeout(function() {
		window.scrollTo(0, menuHeight);
	}, 0);
});