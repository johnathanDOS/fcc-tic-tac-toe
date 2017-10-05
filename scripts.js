var cells = document.querySelectorAll('div.cell')
var cellIds = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3']
console.log(cells)
var handle
var winSong = new Audio('./sounds/gamewin.mp3');
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

function draw () {
	if (!win()) {
		if (gameState.board.a1 != '' && gameState.board.a2 != '' && gameState.board.a3 != '' && gameState.board.c1 != '' && gameState.board.c2 != '' && gameState.board.c3 != '' && gameState.board.b1 != '' && gameState.board.b2 != '' && gameState.board.b3 != '') {
			return true
		}
	}
}

function select (cell) {
	if (gameState.board[cell.id] === '') {
		cell.innerHTML = gameState[gameState.turn]
		gameState.board[cell.id] = gameState[gameState.turn]
		if (!draw()) {
			if (win()) {
				console.log(gameState.turn + ' wins!')
				document.getElementById('refresh-btn').style.display = "block"
				winSong.play()
				gameState.player = ''
				showBanner()
				discoDisplay()
			} else {
				nextTurn()
				cpuRandSelect()
			}
		}
		else {
			console.log('draw')
			document.getElementById('refresh-btn').style.display = "block"
			showBanner()
		}
	}
}

function cpuRandSelect () {
	if (!draw()) {
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
	   		winSong.play()
	   		showBanner()
	   		discoDisplay()
	   		gameState.player = ''
		} else {
			nextTurn()
		}	
	}
	else {
		console.log("draw")
		document.getElementById('refresh-btn').style.display = "block"
		showBanner()
	}
}

function gameStart() {
	if (document.getElementById('x-radio').checked) {
		gameState.player = "X"
		gameState.computer = "O"
	    var x = document.getElementById('board')
	    var y = document.getElementById('start-ui')
	    y.style.display = 'none';
	    x.style.display = 'block';
	}
	if (document.getElementById('o-radio').checked) {
		gameState.player = "O"
		gameState.computer = "X"
	    var x = document.getElementById('board')
	    var y = document.getElementById('start-ui')
	    y.style.display = 'none';
	    x.style.display = 'block';
	}
}

function restart () {
	gameState.board.a1 = '';
	gameState.board.a2 = '';
	gameState.board.a3 = '';
	gameState.board.b1 = '';
	gameState.board.b2 = '';
	gameState.board.b3 = '';
	gameState.board.c1 = '';
	gameState.board.c2 = '';
	gameState.board.c3 = '';
	gameState.player = 'X';
	gameState.computer = 'O';
	gameState.turn = 'player'
	for (var i = 0; i < cells.length; i ++) {
		cells[i].innerHTML = '';
	}
	document.getElementById('board').style.display = "none"
	document.getElementById('start-ui').style.display = "block"
	document.getElementById('refresh-btn').style.display = "none"
	document.getElementById('win-banner').style.display = 'none'
	winSong.pause()
	whiteBackground()
	winSong.currentTime = 0
	clearInterval(handle)
}

function showBanner () {
	if (draw()) {
		document.getElementById('win-banner').innerHTML = "Nobody wins!"
		document.getElementById('win-banner').style.display = "block"
	} else {
		document.getElementById('win-banner').innerHTML = gameState.turn + " wins!"
		document.getElementById('win-banner').style.display = 'block'
	}
}

function randomColor () {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i ++) {
    color += letters[Math.floor(Math.random()  * 16)];
  }
  return color;
}

function changeColors () {
	document.getElementById('a1').style.background = randomColor()
	document.getElementById('a2').style.background = randomColor()
	document.getElementById('a3').style.background = randomColor()
	document.getElementById('b1').style.background = randomColor()
	document.getElementById('b2').style.background = randomColor()
	document.getElementById('b3').style.background = randomColor()
	document.getElementById('c1').style.background = randomColor()
	document.getElementById('c2').style.background = randomColor()
	document.getElementById('c3').style.background = randomColor()
}

function whiteBackground () {
	document.getElementById('a1').style.background = "white"
	document.getElementById('a2').style.background = "white"
	document.getElementById('a3').style.background = "white"
	document.getElementById('b1').style.background = "white"
	document.getElementById('b2').style.background = "white"
	document.getElementById('b3').style.background = "white"
	document.getElementById('c1').style.background = "white"
	document.getElementById('c2').style.background = "white"
	document.getElementById('c3').style.background = "white"
}

function discoDisplay () {
	handle = setInterval(changeColors, 200)
}
