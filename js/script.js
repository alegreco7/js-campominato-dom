function generateUniqueRandomNumber(numOfCell, array_bomb) {
  let num = 0;
  check_number = false;
  while (!check_number) {
      num = Math.floor(Math.random()* numOfCell + 1);
      if (!array_bomb.includes(num)) {
          check_number = true;
      }
  }
  return num;
}
//funzione che crea un array di bombe
function createArrayBomb(numOfBomb, num_cell) {
  let bombs = [];
  for (let i = 0; i < numOfBomb; i++) {
      bombs.push(generateUniqueRandomNumber(num_cell, bombs));
  }
  return bombs;
}
//funzione per creare la cella 
function createCell() {
  const elemento = document.createElement('div');
  elemento.classList.add('cell');
  return elemento;
}
//funzione che crea la griglia
function generateGrid(container) {
  container.innerHTML="";
  container.classList.add('grid');

  //punteggio
  const top_container = document.createElement('div');
  top_container.classList.add('content');

  const text_score = document.createElement('p');
  text_score.innerText = "Score: 0"
  top_container.appendChild(text_score);

  //elemento griglia
  const content = document.createElement('div');
  content.classList.add('content-grid'); 
  content.classList.add('content'); 
  content.classList.add('d-flex'); 
  content.classList.add('flex-wrap'); 


  //livello di difficoltà
  const select = document.getElementById('difficulty');
  let difficulty = select.value;
  let cell_row = 0;
  switch (difficulty) {
      case "1":
          cell_row = 10;
          break;
      case "2":
          cell_row = 9;
          break;
      case "3":
          cell_row = 7;
          break;
      default:
          cell_row = 10;
  }
  //calcoliamo che la griglia deve essere un quadrato di n * n
  let cellLength = cell_row * cell_row;
  //array con le bombe
  const num_bomb = 16;
  const bombe = createArrayBomb(num_bomb, cellLength);
  console.log(bombe.sort());
  let gameOver = false;
  let score = 0;
  let scoreMax = cellLength - num_bomb;
  for (let i = 0; i < cellLength; i++) {
      //creiamo la cella
      let cell = createCell();
      //element
      let numCell = i+1;
      cell.innerText = numCell;
      cell.addEventListener('click', function(){
          if(score < scoreMax){
              if (!gameOver) {
                  if (!bombe.includes(numCell)) {
                      this.classList.add('clicked');
                      console.log('libero');
                      score++;
                      text_score.innerText = `Score: ${score}`;
                  }else{
                      this.classList.add('bomb');
                      gameOver = true;
                      console.log('Hai perso:(');
                  }
              }
          }else if(score == scoreMax){
              console.log('Hai vinto!!');
          }
      });
      content.appendChild(cell);
  }
  //caclolare la dimensione della width della griglia
  content.style.setProperty('width', `calc(100px * ${cell_row} + 10px)`);
  //aggiungiamo la griglia creata al div grid
  container.appendChild(top_container);
  container.appendChild(content);

}
const grid = document.getElementById('grid');
//chiamiamo la funzione per creare la griglia
const paly = document.getElementById('play');
paly.addEventListener('click', function(){
  //quando clicchiamo su play si deve creare la griglia
  
  generateGrid(grid);
});

