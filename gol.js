var gen = [];
const gridSize = 50;
const interval = 100;

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
      if(Math.random() > 0.5){
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
  let liveCount = 0;
  for(let i = -1; i < 2; i++){
    for(let j = -1; j < 2; j++){
      if((r + i) < 0 || 
         (c + j) < 0 || 
         (r + i) >= gridSize || 
         (c + j) >= gridSize){
        continue;
      }
      if(gen[r+i][c+j]){
        liveCount++;
      }
    }
  }

  if(isAlive){
    if(liveCount < 2){
      return false;
    }
    else if(liveCount < 4){
      return true;
    }
    else{
      return false;
    }
  }
  else{
    if(liveCount === 3){
      return true;
    }
  }

}
