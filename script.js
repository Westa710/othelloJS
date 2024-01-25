"use strict";

let othelloData = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, -1, 1, 0, 0, 0],
  [0, 0, 0, 1, -1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

const othelloWhite = "○";
const othelloBlack = "●";
let othelloColor = true; //true:黒 false:白

function setStone(row, column) {
  let stage = document.getElementById("stage");

  let square = stage.rows[row].cells[column];

  square.querySelector("div").classList.add(othelloColor ? "black" : "white");

  othelloColor = !othelloColor;
}

function canSetStone() {}

window.onload = function setupStage() {
  //盤面の作成

  const stage = document.getElementById("stage");

  for (let i = 0; i <= 7; i++) {
    let squareRow = document.createElement("tr");

    for (let j = 0; j <= 7; j++) {
      let square = document.createElement("td");
      const stone = document.createElement("div");
      // square.textContent = othelloBlack;
      square.appendChild(stone);
      squareRow.appendChild(square);

      square.onclick = function () {
        let row = this.parentNode.rowIndex;
        let column = this.cellIndex;

        console.log(`[${row}][${column}]`);

        setStone(row, column, othelloColor);
      };
    }

    stage.appendChild(squareRow);
  }

  setStone(3, 4);
  setStone(3, 3);
  setStone(4, 3);
  setStone(4, 4);
};
