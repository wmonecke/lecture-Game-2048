// 1. Create Game Object
var myGame;

$(document).ready(function(){
  myGame = new Game2048();

  renderTiles();

  $(document).keydown(function(ev){


    switch (ev.keyCode) {
      case 37:
      case 65:
        myGame.move('left');
        break;
      case 38:
      case 87:
        myGame.move('up');
        break;
      case 39:
      case 68:
        myGame.move('right');
        break;
      case 40:
      case 83:
        myGame.move('down');
        break;
    }
    renderTiles();
    updateScore();
    checkIfDone();
  });
});

// 2. take the initial tiles and put them on the screen
function renderTiles() {
  $('#tile-container').empty();

  myGame.board.forEach(function (row, rowIndex) {
    row.forEach(function (cell, colIndex) {
      if (cell === null) {
        return;
      }
      console.log('Tile value: ' + cell);
      console.log('Row: ' + rowIndex);
      console.log('Column: ' + colIndex);

      var tileHTML = '<div class="tile tile-position-'+rowIndex+'-'+colIndex+' val-'+cell+'">'+cell+'</div>';

      $('#tile-container').append(tileHTML);

    });
  });
}
// 3. Handle Keyboard events
// 4. Move board in Object based on keypresses (up, down, left, right)
// 5. Update the screen based on new board state

// 6. win or lose check.
function updateScore(){
  $('#js-score').html(myGame.score);
}

function checkIfDone(){
  if (myGame.hasWon) {

    $('#game_board').remove();
     $('body').html('U WON');
  } else if (myGame.hasLost) {

    $('#game_board').remove();
     $('body').html('U LOST NUUB');
  }
}
