const ROWS = 6;
const COLUMNS = 7;

const boardElement = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const statusElement = document.querySelector('.status');

const board = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null));
let currentPlayer = 'red';

function renderBoard() {
	cells.forEach((cell, index) => {
		const row = Math.floor(index / COLUMNS);
		const column = index % COLUMNS;
		const player = board[row][column];

		cell.classList.toggle('filled', player !== null);
		cell.classList.toggle('player-red', player === 'red');
		cell.classList.toggle('player-yellow', player === 'yellow');
	});
}

function placePiece(column) {
	for (let row = ROWS - 1; row >= 0; row -= 1) {
		if (board[row][column] === null) {
			board[row][column] = currentPlayer;
			renderBoard();
			currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
			statusElement.textContent = `Turno del jugador ${currentPlayer === 'red' ? 'rojo' : 'amarillo'}`;
			return;
		}
	}

	statusElement.textContent = `Esta columna está llena. Turno del jugador ${currentPlayer === 'red' ? 'rojo' : 'amarillo'}`;
}

boardElement.addEventListener('click', (event) => {
	const cell = event.target.closest('.cell');

	if (cell) {
		placePiece(Number(cell.dataset.column));
	}
});
