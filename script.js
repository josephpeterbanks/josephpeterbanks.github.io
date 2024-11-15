document.addEventListener("DOMContentLoaded", function() {
	const versionContainer = document.querySelector('.version-container');
	
	const seatInput = document.getElementById('seatId');
	const ticketInput = document.getElementById('ticketId');
	
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
	
	if (localStorage.getItem('theme') === 'dark') {    
		const logo = document.getElementById('logo');
		logo.src = 'LogoDark.png';
        document.body.classList.add('dark-theme');
    }
	
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




	
function toggleDarkMode(route) {
	document.body.classList.toggle('dark-theme');
    
    const logo = document.getElementById('logo');
    
    if (document.body.classList.contains('dark-theme')) {
		localStorage.setItem('theme', 'dark');
        logo.src = 'LogoDark.png';
		route.innerText = `Dark Mode On!
		`;
		route.style.color = "";
		route.style.display = "block";
    } else {
		localStorage.setItem('theme', 'light');
        logo.src = 'Logo.png';
		route.innerText = `Dark Mode Off!
		`;
		route.style.color = "";
		route.style.display = "block";
    }
}