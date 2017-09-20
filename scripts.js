// Will need an object to track the game state.
// This will keep track of whose turn it is.
var cells = document.querySelectorAll('div.cell')
var gameState = {
	player: 'X',
	board: {
		rowA: {
			a1: '',
			a2: '',
			a3: '',
		},
		rowB: {
			b1: '',
			b2: '',
			b3: '',
		},
		rowC: {
			c1: '',
			c2: '',
			c3: '',
		},
	},

}

function switchPlayer () {
	if (gameState.player === 'X') {
		gameState.player = 'O'
	} else {
		gameState.player = 'X'
	}
}

function select (cell) {
	document.getElementById(cell).innerHTML = gameState.player
	switchPlayer()
}

console.log(cells);

function buildGame() {
	for (var i = 0; i < cells.length; i ++) {
		cells[i].onclick = select();
	}
}

buildGame()