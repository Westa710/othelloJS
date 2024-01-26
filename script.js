"use strict";

let othelloData = [
  // 0:空 1:黒 -1:白
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

let othelloColor = true; //true:黒 false:白

function setStone(row, column, unconditionallySet) {
  if (canSetStone(row, column) || unconditionallySet) {
    let stage = document.getElementById("stage");

    let square = stage.rows[row].cells[column];

    square.querySelector("div").classList.add(othelloColor ? "black" : "white");

    othelloData[row][column] = othelloColor ? 1 : -1;

    othelloColor = !othelloColor;
  } else {
    window.alert("そこに石はおけません。");
  }
  console.log(othelloData);
}

function canSetStone(row, column) {
  if (othelloData[row][column] != 0) {
    return false;
  } else {
    return true;
  }
}

window.onload = function () {
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

        setStone(row, column, false);
      };
    }

    stage.appendChild(squareRow);
  }

  setStone(3, 4, true);
  setStone(3, 3, true);
  setStone(4, 3, true);
  setStone(4, 4, true);
};
