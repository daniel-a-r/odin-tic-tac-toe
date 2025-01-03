function createPlayer(name, marker) {
  const setMarker = (newMarker) => {
    marker = newMarker;
  };

  const getMarker = () => marker;

  const getName = () => name;

  const setName = (newName) => {
    name = newName;
  };

  return { setMarker, getMarker, getName, setName };
}

const game = (function () {
  const player1 = createPlayer('Player 1', 'X');
  const player2 = createPlayer('Player 2', 'O');
  const playersArray = [player1, player2];
  let currentPlayerIdx = 0;
  let winner = null;
  let updateCount = 0;

  const board = [[null, null, null],
                 [null, null, null],
                 [null, null, null]];

  const setWinner = (winnerIndx) => {
    winner = winnerIndx;
  }

  const currentPlayerTurn = (position) => {
    const boardUpdated = updateBoard(getCurrentPlayer().getMarker(), position);
    if (boardUpdated) {
      if (checkBoard(getCurrentPlayer().getMarker())) {
        setWinner(currentPlayerIdx);
        console.log(`${getCurrentPlayer().getName()} won!`);
      } else if (updateCount === 9) {
        console.log('tie');
      } else {
        updateCurrentPlayer();
      }
    }
  }

  const updateBoard = (marker, position) => {
    if (getPositionValidity(position) && winner === null) {
      board[position[0]][position[1]] = marker;
      incUpdateCount();
      console.log('Board updated');
      printBoard();
      return true;
    }
    return false;
  };

  const getPositionValidity = (position) => {
    const invalidMsg = 'Invalid position';

    if (position[0] < 0 || position[0] > 2) {
      console.log(`${invalidMsg}: row out of bounds`);
      return false;
    }
    if (position[1] < 0 || position[1] > 2) {
      console.log(`${invalidMsg}: column out of bounds`);
      return false;
    }
    if (board[position[0]][position[1]] !== null) {
      console.log(`${invalidMsg}: position already filled`);
      return false;
    }

    return true;
  };

  const incUpdateCount = () => updateCount++;

  const checkBoard = (marker) => {
    if (checkRow(marker) || checkColumn(marker) || checkDiagonal(marker)) return true;
    return false;
  }

  // [0][0] -> [0][1] -> [0][2]
  const checkRow = (marker) => {
    for (let i = 0; i < board.length; i++) {
      let matchCount = 0;
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] === marker) {
          matchCount++;
        }
      }
      if (matchCount === 3) return true;
    }
    return false;
  }

  // [0][0] -> [1][0] -> [2][0]
  const checkColumn = (marker) => {
    for (let i = 0; i < board.length; i++) {
      let matchCount = 0;
      for (let j = 0; j < board.length; j++) {
        if (board[j][i] === marker) {
          matchCount++;
        }
      }
      if (matchCount === 3) return true;
    }
    return false;
  }

  // [0][0] -> [1][1] -> [2][2]
  // [2][0] -> [1][1] -> [0][2]
  const checkDiagonal = (marker) => {
    let matchCount = 0;
    for (let i = 0; i < board.length; i++) {
      if (board[i][i] === marker) {
        matchCount++;
      }
    }
    if (matchCount === 3) return true;
    matchCount = 0;
    for (let i = 0; i < board.length; i++) {
      const row = board.length - 1 - i;
      if (board[row][i] === marker) {
        matchCount++;
      }
    }
    if (matchCount === 3) return true;
    return false;
  }
  
  const getBoard = () => board;

  const printBoard = () => {
    for (let i = 0; i < board.length; i++) {
      console.log(board[i]);
    }
  };

  const resetGame = () => {
    setWinner(null);
    resetBoard();
  }

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j] = null;
      }
    }
  };

  const updateCurrentPlayer = () => {
    currentPlayerIdx = (currentPlayerIdx) ? 0 : 1;
  };

  const getCurrentPlayer = () => {
    return playersArray[currentPlayerIdx];
  }

  const printCurrentPlayer = () => {
    const currentPlayer = getCurrentPlayer();
    console.log('current player:', { name: currentPlayer.getName(), marker: currentPlayer.getMarker() });
  }

  return { player1, 
           player2,
           getCurrentPlayer,
           currentPlayerTurn, 
           printCurrentPlayer,
           getBoard, 
           printBoard, 
           resetGame };
})();

const displayController = (function () {
  const cells = document.querySelectorAll('.cell');

  cells.forEach((cell) => {
    cell.addEventListener('click', (e) => {
      const row = cell.dataset.row;
      const col = cell.dataset.col;
      game.printCurrentPlayer();
    });
  });
})();

// game.printCurrentPlayer();
// game.printBoard();
// game.currentPlayerTurn([0,1]);
// game.printCurrentPlayer();
// game.currentPlayerTurn([0,0]);
// game.printCurrentPlayer();
// game.currentPlayerTurn([1,2]);
// game.printCurrentPlayer();
// game.currentPlayerTurn([1,0]);
// game.printCurrentPlayer();
// game.currentPlayerTurn([0,2]);
// game.printCurrentPlayer();
// game.currentPlayerTurn([2,0]);
// game.printCurrentPlayer();
// game.currentPlayerTurn([1,1]);