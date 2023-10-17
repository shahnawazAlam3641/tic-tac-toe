const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGamebtn = document.querySelector(".btn");

let currentPlayer;

const winningPostions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let gameGrid;


function initGame() {
  currentPlayer = "x";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box, index) => {
    box.innerText = "";
    box.style.pointerEvents = "all";
    box.classList = `box box-${index + 1}`;
  });
  newGamebtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer.toUpperCase()}`;
}


function swapTurn() {
  if (currentPlayer === "x") {
    currentPlayer = "o";
  } else {
    currentPlayer = "x";
  }
  gameInfo.innerText = `Current Player - ${currentPlayer.toUpperCase()}`;
}


function handleClick(index) {
 
  if (gameGrid[index] === "") {
    boxes[index].style.pointerEvents = "none";
    boxes[index].innerHTML = currentPlayer.toUpperCase();
    gameGrid[index] = currentPlayer;
    swapTurn();
    checkGameOver();
  }
}


function checkGameOver() {
  let result = "";
  winningPostions.forEach((position) => {
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[0]] === gameGrid[position[2]]
    ) {
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
      if (gameGrid[position[0]] === "x") result = "X";
      else result = "Y";
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  if (result !== "") {
    gameInfo.innerText = `Winner Player - ${result}`;
    newGamebtn.classList.add("active");
    return;
  }
  let boardFilled = true;
  gameGrid.forEach((box) => {
    if (box === "") boardFilled = false;
  });
 
  if (boardFilled) {
    gameInfo.innerText = "Game Tied !";
    newGamebtn.classList.add("active");
    return;
  }
}


boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

initGame();

newGamebtn.addEventListener("click", initGame);
