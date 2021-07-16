'use strict';

// generates a random number between 1 and 3
function randomPlay() {
	return Math.floor(Math.random() * 3) + 1;
}

// play the game randomly
let randomPlayButton = document.getElementById('play-btn');
randomPlayButton.addEventListener('click', e => {
	e.preventDefault();

	resetRandomResults();

	const player1Choice = randomPlay();
	const player2Choice = randomPlay();

	showHands(player1Choice, player2Choice);
	checkWinner(player1Choice, player2Choice);
});

// show players choices
function showHands(p1Hand, p2Hand) {
	let p1Rock = document.getElementById('p1-rock');
	let p1Paper = document.getElementById('p1-paper');
	let p1Scissors = document.getElementById('p1-scissor');
	let p2Rock = document.getElementById('p2-rock');
	let p2Paper = document.getElementById('p2-paper');
	let p2Scissors = document.getElementById('p2-scissor');

	// p1
	if (p1Hand === 1) {
		p1Rock.style.display = 'block';
	} else if (p1Hand === 2) {
		p1Paper.style.display = 'block';
	} else if (p1Hand === 3) {
		p1Scissors.style.display = 'block';
	}

	// p2
	if (p2Hand === 1) {
		p2Rock.style.display = 'block';
	} else if (p2Hand === 2) {
		p2Paper.style.display = 'block';
	} else if (p2Hand === 3) {
		p2Scissors.style.display = 'block';
	}
}

// delete previous emojis for random game
function resetRandomResults() {
	let p1Rock = document.getElementById('p1-rock');
	let p1Paper = document.getElementById('p1-paper');
	let p1Scissors = document.getElementById('p1-scissor');
	let p2Rock = document.getElementById('p2-rock');
	let p2Paper = document.getElementById('p2-paper');
	let p2Scissors = document.getElementById('p2-scissor');

	p1Rock.style.display = 'none';
	p1Paper.style.display = 'none';
	p1Scissors.style.display = 'none';
	p2Rock.style.display = 'none';
	p2Paper.style.display = 'none';
	p2Scissors.style.display = 'none';
}

// rules
const checkWinner = (p1Choice, p2Choice) => {
	const rock = 1;
	const paper = 2;
	const scissors = 3;
	let result = document.getElementById('result-text');
	result.style.display = 'block';

	if (p1Choice === p2Choice) {
		result.innerHTML = 'Draw';
	} else if (p1Choice === rock && p2Choice === scissors) {
		result.innerHTML = 'Player 1 Wins - Rock beats Scissors';
	} else if (p1Choice === paper && p2Choice === rock) {
		result.innerHTML = 'Player 1 Wins - Paper beats Rock';
	} else if (p1Choice === scissors && p2Choice === paper) {
		result.innerHTML = 'Player 1 Wins - Scissors beats Paper';
	} else if (p2Choice === rock && p1Choice === scissors) {
		result.innerHTML = 'Player 2 Wins - Rock beats Scissors';
	} else if (p2Choice === paper && p1Choice === rock) {
		result.innerHTML = 'Player 2 Wins - Paper beats Rock';
	} else if (p2Choice === scissors && p1Choice === paper) {
		result.innerHTML = 'Player 2 Wins - Scissors beats Paper';
	}

	return result;
};
