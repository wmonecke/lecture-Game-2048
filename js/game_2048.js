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
};
