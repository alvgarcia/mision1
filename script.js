const ROWS = 6;
const COLUMNS = 7;

const boardElement = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const statusElement = document.querySelector('.status');

const board = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null));

function renderBoard() {
	cells.forEach((cell, index) => {
		const row = Math.floor(index / COLUMNS);
		const column = index % COLUMNS;
		cell.classList.toggle('filled', board[row][column] !== null);
	});
}

function placePiece(column) {
	for (let row = ROWS - 1; row >= 0; row -= 1) {
		if (board[row][column] === null) {
			board[row][column] = 'piece';
			renderBoard();
			statusElement.textContent = `Ficha colocada en la columna ${column + 1}`;
			return;
		}
	}

	statusElement.textContent = 'Esta columna está llena';
}

boardElement.addEventListener('click', (event) => {
	const cell = event.target.closest('.cell');

	if (cell) {
		placePiece(Number(cell.dataset.column));
	}
});
