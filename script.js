const ROWS = 6;
const COLUMNS = 7;

const boardElement = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const statusElement = document.querySelector('.status');
const restartButton = document.querySelector('.restart-button');

const board = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null));
let currentPlayer = 'red';
let gameOver = false;

function renderBoard(lastMove = null) {
	cells.forEach((cell, index) => {
		const row = Math.floor(index / COLUMNS);
		const column = index % COLUMNS;
		const player = board[row][column];

		cell.classList.toggle('filled', player !== null);
		cell.classList.toggle('player-red', player === 'red');
		cell.classList.toggle('player-yellow', player === 'yellow');
		cell.classList.toggle('just-placed', index === lastMove);
	});
}

function hasWinningLine(row, column, player) {
	const directions = [
		[0, 1],
		[1, 0],
		[1, 1],
		[1, -1],
	];

	return directions.some(([rowStep, columnStep]) => {
		let count = 1;

		for (const direction of [-1, 1]) {
			let nextRow = row + rowStep * direction;
			let nextColumn = column + columnStep * direction;

			while (
				nextRow >= 0 &&
				nextRow < ROWS &&
				nextColumn >= 0 &&
				nextColumn < COLUMNS &&
				board[nextRow][nextColumn] === player
			) {
				count += 1;
				nextRow += rowStep * direction;
				nextColumn += columnStep * direction;
			}
		}

		return count >= 4;
	});
}

function placePiece(column) {
	if (gameOver) {
		return;
	}

	for (let row = ROWS - 1; row >= 0; row -= 1) {
		if (board[row][column] === null) {
			const player = currentPlayer;
			board[row][column] = player;
			renderBoard(row * COLUMNS + column);

			if (hasWinningLine(row, column, player)) {
				gameOver = true;
				statusElement.textContent = `¡Gana el jugador ${player === 'red' ? 'rojo' : 'amarillo'}!`;
				return;
			}

			if (board.every((boardRow) => boardRow.every((cell) => cell !== null))) {
				gameOver = true;
				statusElement.textContent = '¡Empate! El tablero está lleno.';
				return;
			}

			currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
			statusElement.textContent = `Turno del jugador ${currentPlayer === 'red' ? 'rojo' : 'amarillo'}`;
			return;
		}
	}

	statusElement.textContent = `Esta columna está llena. Turno del jugador ${currentPlayer === 'red' ? 'rojo' : 'amarillo'}`;
}

function restartGame() {
	board.forEach((row) => row.fill(null));
	currentPlayer = 'red';
	gameOver = false;
	renderBoard();
	statusElement.textContent = 'Turno del jugador rojo. ¡Empieza la partida!';
}

boardElement.addEventListener('click', (event) => {
	const cell = event.target.closest('.cell');

	if (cell) {
		placePiece(Number(cell.dataset.column));
	}
});

restartButton.addEventListener('click', restartGame);
