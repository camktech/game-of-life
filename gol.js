var gen = [];
const gridSize = 80;
const interval = 50;

$(document).ready(() => {
  $('#stage').append(boardMarkup());
  setInterval(tick, interval);
});


function boardMarkup(){
  let board = $('<div>');
  board.addClass('board');
  for(let i = 0; i < gridSize; i++){
    let row = $("<div>");
    row.addClass('l-row');
    row.attr('data-pos', i);
    gen[i] = []
    for (let j = 0; j < gridSize; j++){

      let cell = $('<div>');
      cell.addClass('l-cell');
      cell.attr('data-pos', `${i}-${j}`);
      if(Math.random() > 0.815){
        cell.addClass('alive');
        gen[i].push(true);
      }
      else{
        gen[i].push(false);
      }
      row.append(cell);
    }
    board.append(row);
  }
  return board
}

function update(){
  $('.l-cell').each((i, c) => {
    let pos = $(c).data('pos').split('-').map((coor) => {return parseInt(coor)});
    if(gen[pos[0]][pos[1]]){
      $(c).addClass('alive');
    }
    else{
      $(c).removeClass('alive');
    }
  });
}

function tick(){
 let nextGen = [];

  for(let i = 0; i < gen.length; i++){
    nextGen[i] = []

    for(let j = 0; j < gen[i].length; j++){
      if(survives(gen[i][j], i, j)){
        nextGen[i].push(true);
      }
      else{
        nextGen[i].push(false);
      }
    }
  }
    
    gen = nextGen;
    update();  
}

function survives(isAlive, r, c){
  let liveNeighborCount = 0;
  for(let i = -1; i < 2; i++){
    for(let j = -1; j < 2; j++){
      let x = c + j;
      let y = r + i;

      if(i === 0 && j === 0){
        continue;
      }

      if(y < 0 || y >= gridSize){
        y = gridSize - Math.abs(y); 
      }

      if(x < 0 || x >= gridSize){
        x = gridSize - Math.abs(x); 
      }

      if(gen[y][x]){
        liveNeighborCount++;
      }
    }
  }

  if(isAlive){
    if(liveNeighborCount < 2){
      return false;
    }
    else if(liveNeighborCount < 4){
      return true;
    }
    else{
      return false;
    }
  }
  else{
    if(liveNeighborCount === 3){
      return true;
    }
  }

}
