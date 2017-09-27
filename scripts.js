var cells = document.querySelectorAll('div.cell')
var cellIds = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3']
console.log(cells)
var gameState = {
	player: 'X',
	computer: 'O',
	turn: 'player',
	board: {
		a1: '',
		a2: '',
		a3: '',
		b1: '',
		b2: '',
		b3: '',
		c1: '',
		c2: '',
		c3: '',
	},
}

function nextTurn () {
	if (gameState.turn === 'player') {
		gameState.turn = 'computer'
	} else {
		gameState.turn = 'player'
	}
}

function win () {
	//win condition 1: row a
	if (gameState.board.a1 === gameState.board.a2 && 
		gameState.board.a2 === gameState.board.a3 &&
		gameState.board.a1 != '') {
		return true
	}
	//win condition 2: row b
	if (gameState.board.b1 === gameState.board.b2 && 
		gameState.board.b2 === gameState.board.b3 &&
		gameState.board.b1 != '') {
		return true
	}	
	//win condition 3: row c
	if (gameState.board.c1 === gameState.board.c2 && 
		gameState.board.c2 === gameState.board.c3 &&
		gameState.board.c1 != '') {
		return true
	}
	//win condition 4: col 1
	if (gameState.board.a1 === gameState.board.b1 && 
		gameState.board.b1 === gameState.board.c1 &&
		gameState.board.a1 != '') {
		return true
	}
	//win condition 5: col 2
	if (gameState.board.a2 === gameState.board.b2 && 
		gameState.board.b2 === gameState.board.c2 &&
		gameState.board.a2 != '') {
		return true
	}
	//win condition 6: col 3
	if (gameState.board.a3 === gameState.board.b3 && 
		gameState.board.b3 === gameState.board.c3 &&
		gameState.board.a3 != '') {
		return true
	}
	//win condition 7: diagonal 1
	if (gameState.board.a1 === gameState.board.b2 && 
		gameState.board.b2 === gameState.board.c3 &&
		gameState.board.a1 != '') {
		return true
	}
	//win condition 8: diagonal 2
	if (gameState.board.a3 === gameState.board.b2 && 
		gameState.board.b2 === gameState.board.c1 &&
		gameState.board.a3 != '') {
		return true
	}
}

function select (cell) {
	if (gameState.board[cell.id] === '') {
		cell.innerHTML = gameState[gameState.turn]
		gameState.board[cell.id] = gameState[gameState.turn]
		if (win()) {
			console.log(gameState.turn + ' wins!')
			document.getElementById('refresh-btn').style.display = "block"
		} else {
			nextTurn()
			cpuRandSelect()
		}
	}
}

function cpuRandSelect () {
	var num = Math.floor(Math.random() * (8 - 0 + 1)) + 0
	var selection = cellIds[num]
	while (gameState.board[selection] != '') {
		num = num = Math.floor(Math.random() * (8 - 0 + 1)) + 0
		var selection = cellIds[num]
	}
	document.getElementById(selection).innerHTML = gameState.computer
	gameState.board[selection] = gameState[gameState.turn]
	if (win()) {
		console.log(gameState.turn + ' wins!')
   		document.getElementById('refresh-btn').style.display = "block"
	} else {
		nextTurn()
	}
}

function gameStart() {
	if (document.getElementById('x-radio').checked) {
		gameState.player = "X"
		gameState.computer = "O"
	}
	if (document.getElementById('o-radio').checked) {
		gameState.player = "O"
		gameState.computer = "X"
	}
    var x = document.getElementById('board')
    var y = document.getElementById('start-ui')
    x.style.display = 'block';
    y.style.display = 'none';
}

function refresh () {
	gameState.board.a1 = '';
	gameState.board.a2 = '';
	gameState.board.a3 = '';
	gameState.board.b1 = '';
	gameState.board.b2 = '';
	gameState.board.b3 = '';
	gameState.board.c1 = '';
	gameState.board.c2 = '';
	gameState.board.c3 = '';
	for (var i = 0; i < cells.length; i ++) {
		cells[i].innerHTML = '';
	}
	document.getElementById('board').style.display = "none"
	document.getElementById('start-ui').style.display = "block"
	document.getElementById('refresh-btn').style.display = "none"
}
