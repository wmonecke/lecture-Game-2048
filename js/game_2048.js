// What do I put as a param and what not? Score will always start at 0,
// so we can hardcode 0 into the properties. For example, we could've put
// the name of the player as a param since that changes from game to game.
// The properties for the games are: (ps. if we didnt want them to be hardcoded we would
// have put them as parameters of Game2048)

function Game2048 () {
  this.score = 0;
  this.board = [
    [null, null, null, null], //0
    [null, null, null, null], //1
    [null, null, null, null], //2
    [null, null, null, null]  //3
  ];
  this.hasWon = false;
  this.hasLost = false;
  this.boardHasChanged = false;

  this._generateTile();
  this._generateTile();
}

// Always check the console to see if the object is being initialized
// correctly and there are no typos. We initialized a new instance in the
// console to check if the constructor function works properly.
// We are going to create the methods of the game, which should
// be attached to the prototype since EVERY NEW GAME will have these SAME methods.
// (_generateTile with underscore since we dont want the user to mess with it but only the game
// hence being a private method)

Game2048.prototype._generateTile = function () {
  var tileValue;
  console.log('_generateTile works');
  if (Math.random() < 0.8) { // only (20% of the time we will get 4)
    tileValue = 2;
  } else {
    tileValue = 4;
  }

  var emptyTile = this._getAvailablePosition();

  if (emptyTile !== null) {
    var row = emptyTile.x;
    var col = emptyTile.y;
    this.board[row][col] = tileValue;
  }
};

Game2048.prototype._getAvailablePosition = function () {
  var emptyTiles = [];

  this.board.forEach(function (row, rowIndex) {
    row.forEach(function (cell, colIndex){
      if (cell === null) {
        emptyTiles.push({ x: rowIndex, y: colIndex});
      }
    });
  });

  if (emptyTiles.length === 0) {
    return null;
  }

  var randomIndexOfEmptyTiles = Math.floor(Math.random() * emptyTiles.length);
  return emptyTiles[randomIndexOfEmptyTiles];
};

Game2048.prototype._renderBoard = function () {
  this.board.forEach(function(row){
    console.log(row);
  });

  console.log('Current Score: ' + this.score);
};

// Movement of the Tiles
// First we want to get rid of the empty spaces, which are null. [null, 2, null, 4] -> [2, 4]
// Then we want to check if the numbers left are the same. If they are, then add them together into one numbers
// Afterwards add null to the rest of the empty spaces of the array.length === 4.
// Furthermore, we want to add a new tile AFTER the movement has happend.

//MOVING ****LEFT****

Game2048.prototype.moveLeft = function () {
  var updatedBoard = [];
  var theGame = this;

  this.board.forEach(function (row){

    // 1. Remove empties from row
    var newRow = [];
    row.forEach(function(cell) {
      if (cell !== null) {
        newRow.push(cell);
      }
    });

    // 2. Merge tile in row that are together AND the same numbers
    for (var i = 0; i < newRow.length; i++) {
      if (newRow[i] === newRow[i + 1]) {
          newRow[i] = newRow[i] * 2; // changed here possible bug!!!
          newRow[i + 1] = null;

          theGame._updateScore(newRow[i]);
      }
    }

    // 3. Remove newly created empties. eg [8, 8, 4]->[16, null, 4]
    var moved = [];

    newRow.forEach(function(cell) {
      if (cell !== null) {
        moved.push(cell);
      }
    });

    // 4. push() nulls until row has length === 4 again.
    if (moved.length !== row.length) {
      theGame.boardHasChanged = true;
    }

    while (moved.length < 4){
      moved.push(null);

    }

    updatedBoard.push(moved);
  });

  this.board = updatedBoard;
};

//MOVING ****RIGHT****

Game2048.prototype.moveRight = function () {
  var updatedBoard = [];
  var theGame = this;

  this.board.forEach(function (row){

    // 1. Remove empties from row
    var newRow = [];
    row.forEach(function(cell) {
      if (cell !== null) {
        newRow.push(cell);
      }
    });

    // 2. Merge tile in row that are together AND the same numbers
    for (var i = (newRow.length -1); i >= 0; i--) {
      if (newRow[i] === newRow[i - 1]) {
          newRow[i] = newRow[i] * 2;
          newRow[i - 1] = null;

          theGame._updateScore(newRow[i]);
      }
    }

    // 3. Remove newly created empties. eg [8, 8, 4]->[16, null, 4]
    var moved = [];

    newRow.forEach(function(cell) {
      if (cell !== null) {
        moved.unshift(cell);
      }
    });

    // 4. push() nulls until row has length === 4 again.
    if (moved.length !== row.length) {
      theGame.boardHasChanged = true;
    }

    while (moved.length < 4){
      moved.unshift(null);
    }

    updatedBoard.push(moved);
  });

  this.board = updatedBoard;
};

// TRANSPOSE MATRIX FOR UP AND DOWN MOVEMENT.

Game2048.prototype._transposeMatrix = function () {
  for (var row = 0; row < this.board.length; row++) {
    for (var column = row+1; column < this.board.length; column++) {
      var temp = this.board[row][column];
      this.board[row][column] = this.board[column][row];
      this.board[column][row] = temp;
    }
  }
};
 // MOVING ****UP****
 // We take the current matrix and transpose it, so we can applay the left and right movement
 // to the game and not have to rewrite the logic. Google: transpose matrix to refresh.

Game2048.prototype.moveUp = function () {
  this._transposeMatrix();
  this.moveLeft();
  this._transposeMatrix();

};

Game2048.prototype.moveDown = function () {
  this._transposeMatrix();
  this.moveRight();
  this._transposeMatrix();

};

Game2048.prototype.move = function (direction) {
  if (this.hasWon || this.hasLost) {
    return;
  }
  switch (direction) {
    case 'up':
      this.moveUp();
      break;

    case 'down':
      this.moveDown();
      break;

    case 'left':
      this.moveLeft();
      break;

    case 'up':
      this.moveRight();
      break;
  }

  if (this.boardHasChanged) {
    this._generateTile();
    this.isGameLost();
    this.boardHasChanged = false;
  }
};

Game2048.prototype._updateScore = function (value) {
  this.score = this.score + value;

  if (value === 2048) {

  }
};

Game2048.prototype.isGameLost = function () {

  if (this._getAvailablePosition() !== null) {
    return;
  }

  var theGame = this;

  this.board.forEach(function (row, rowIndex) {
    row.forEach(function (cell, colIndex){

      var current = that.board[rowIndex][cellIndex];
      var top, bottom, left, right;

      if (that.board[rowIndex][cellIndex - 1]) {
        left  = that.board[rowIndex][cellIndex - 1];
      }
      if (that.board[rowIndex][cellIndex + 1]) {
        right = that.board[rowIndex][cellIndex + 1];
      }
      if (that.board[rowIndex - 1]) {
        top    = that.board[rowIndex - 1][cellIndex];
      }
      if (that.board[rowIndex + 1]) {
        bottom = that.board[rowIndex + 1][cellIndex];
      }

      if (current === top || current === bottom || current === left || current === right) {
        isLost = false;
      }
    });
  });
};
