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
    const direction = [
      [-1, 0], // 左
      [-1, 1], // 左下
      [0, 1], // 下
      [1, 1], // 右下
      [1, 0], // 右
      [1, -1], // 右上
      [0, -1], // 上
      [-1, -1], // 左上
    ];

    for (let i = 0; i < direction.length; i++) {
      dx = row + direction[i][0];
      dy = column + direction[i][0];

      if (dx >= 0 && dy >= 0 && dx <= 7 && dy <= 7) {
      }
    }
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
