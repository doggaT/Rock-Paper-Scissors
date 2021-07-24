'use strict';

// game's info
let gameData = [
	{
		info: {
			turn: 0,
		},
	},
	{
		player: {
			pick: [],
			score: 0,
		},
	},
	{
		cpu: {
			pick: [],
			score: 0,
		},
	},
	{
		pickOptions: {
			rock: '✊',
			paper: '✋',
			scissors: '✌',
		},
	},
];

const [{ info }, { player }, { cpu }, { pickOptions }] = gameData;

const modal = document.querySelector('.game-info-modal');
const overlay = document.querySelector('.overlay');

function openModal() {
	modal.classList.remove('hidden');
	overlay.classList.remove('hidden');
}

function closeModal() {
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
}

// returns a random pick value from gameData
const randomCPUPick = () => {
	let pickKeys = Object.keys(pickOptions);
	let pickIndex = Math.floor(Math.random() * pickKeys.length);

	return pickOptions[pickKeys[pickIndex]];
};

// prevents the cpu to pick the same signal twice in a row
function setCPUPick() {
	let prevPick = cpu.pick[cpu.pick.length - 1];
	let currentPick = randomCPUPick();

	while (cpu.pick.length < 0 || prevPick === currentPick) {
		currentPick = randomCPUPick();
	}

	// set the generated value to gameDate
	cpu.pick.push(currentPick);
}

// set the player pick to the gameData
function setPlayerPick(pick) {
	player.pick.push(pick);
}

// triggers the start of the game
// listen to the click event on the 3 hands
document.querySelectorAll('.picks').forEach(pick =>
	pick.addEventListener('click', e => {
		if (info.turn < 3) {
			info.turn++;
			playPRS(e);
		}

		if (info.turn === 3) {
			showWinner();
		}
	})
);

function playPRS(e) {
	setCPUPick();
	// get the player's pick
	setPlayerPick(e.target.innerHTML);

	let currentPlayerPick = player.pick[player.pick.length - 1];
	let currentCPUPick = cpu.pick[cpu.pick.length - 1];

	displayPlayerPick(currentPlayerPick);
	displayCPUPick(currentCPUPick);
	displayTurn(info.turn);
	gameScoreHandle(currentPlayerPick, currentCPUPick);
}

// display players choices
function displayPlayerPick(playerPick) {
	const playerDiv = document.getElementById('player');
	const newPick = document.createElement('h4');
	let newPickContent;

	newPickContent = document.createTextNode(playerPick);

	newPick.appendChild(newPickContent);
	playerDiv.appendChild(newPick);
}

// display cpus choices
function displayCPUPick(cpuPick) {
	const cpuDiv = document.getElementById('cpu');
	const newPick = document.createElement('h4');

	newPick.innerHTML = cpuPick;
	cpuDiv.appendChild(newPick);
}

// display turns
function displayTurn(turn) {
	const turnDiv = document.getElementById('turn');
	const newTurn = document.createElement('p');
	let newTurnContent;

	if (turn === 1) {
		newTurnContent = document.createTextNode(`${turn}st`);
	} else if (turn === 2) {
		newTurnContent = document.createTextNode(`${turn}nd`);
	} else if (turn === 3) {
		newTurnContent = document.createTextNode(`${turn}rd`);
	} else {
		newTurnContent = document.createTextNode(`${turn}th`);
	}

	newTurn.appendChild(newTurnContent);
	turnDiv.appendChild(newTurn);
}

// attributes points
function gameScoreHandle(playerPick, cpuPick) {
	if (playerPick === pickOptions.rock && cpuPick === pickOptions.scissors) {
		player.score++;
	} else if (playerPick === pickOptions.paper && cpuPick === pickOptions.rock) {
		player.score++;
	} else if (playerPick === pickOptions.scissors && cpuPick === pickOptions.paper) {
		player.score++;
	} else if (cpuPick === pickOptions.rock && playerPick === pickOptions.scissors) {
		cpu.score++;
	} else if (cpuPick === pickOptions.paper && playerPick === pickOptions.rock) {
		cpu.score++;
	} else if (cpuPick === pickOptions.scissors && playerPick === pickOptions.paper) {
		cpu.score++;
	}
}

// displays the winner and its score on the modal
function showWinner() {
	const resultsDiv = document.getElementById('results');
	const newWinner = document.createElement('p');
	const newScore = document.createElement('p');
	let newPlayAgainBtn = document.createElement('button');

	newPlayAgainBtn.innerHTML = 'Play Again';
	newPlayAgainBtn.type = 'submit';
	newPlayAgainBtn.addEventListener('click', resetResults);

	if (player.score > cpu.score) {
		newWinner.innerHTML = 'You Win!';
		newScore.innerHTML = `\n ${player.score} vs. ${cpu.score}`;
	} else if (cpu.score > player.score) {
		newWinner.innerHTML = 'CPU Wins!';
		newScore.innerHTML = `\n ${cpu.score} vs. ${player.score}`;
	} else {
		newWinner.innerHTML = "It's a Tie!";
		newScore.innerHTML = `\n ${player.score} vs. ${cpu.score}`;
	}

	resultsDiv.appendChild(newWinner);
	resultsDiv.appendChild(newScore);
	resultsDiv.appendChild(newPlayAgainBtn);

	openModal();
}

// ---------------------------------------------------------------

function clearTurn() {
	info.turn = 0;

	const turnDiv = document.getElementById('turn');

	while (turnDiv.firstChild) {
		turnDiv.removeChild(turnDiv.lastChild);
	}
}

function clearPlayer() {
	player.score = 0;
	player.pick = [];

	const playerDiv = document.getElementById('player');

	while (playerDiv.firstChild) {
		playerDiv.removeChild(playerDiv.lastChild);
	}
}

function clearCPU() {
	cpu.score = 0;
	cpu.pick = [];

	const cpuDiv = document.getElementById('cpu');

	while (cpuDiv.firstChild) {
		cpuDiv.removeChild(cpuDiv.lastChild);
	}
}

function clearResults() {
	const resultsDiv = document.getElementById('results');

	while (resultsDiv.firstChild) {
		resultsDiv.removeChild(resultsDiv.lastChild);
	}
}

// reset gameData and delete all elements created
const resetResults = () => {
	clearTurn();
	clearPlayer();
	clearCPU();
	clearResults();
	closeModal();
};
