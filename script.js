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

function createGame() {
  const player1 = createPlayer('Player 1', 'x');
  const player2 = createPlayer('Player 2', 'o');
  const playersArray = [player1, player2];
  let currentPlayerIdx = 0;

  const board = [[null, null, null],
                 [null, null, null],
                 [null, null, null]];

  const updateBoard = (marker, position) => {
    if (getPositionValidity(position)) {
      board[position[0]][position[1]] = marker;
    }
  };

  const getPositionValidity = (position) => {
    const invalidMsg = 'Invalid position';

    if (position[0] < 0 || position[0] > 2) {
      console.log(`${invalidMsg}: row out of bounds`);
      return false;
    }
    if (position[1] < 0 || position[0] > 2) {
      console.log(`${invalidMsg}: column out of bounds`);
      return false;
    }
    if (board[position[0]][position[1]] !== null) {
      console.log(`${invalidMsg}: position already filled`);
      return false;
    }

    return true;
  };
  
  const getBoard = () => board;

  const printBoard = () => {
    for (let i = 0; i < board.length; i++) {
      console.log(board[i]);
    }
  };

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

  return { player1, 
           player2,
           getCurrentPlayer,
           updateCurrentPlayer,
           updateBoard, 
           getBoard, 
           printBoard, 
           resetBoard };
}

const game = createGame();
console.log(game.player1.getName());
