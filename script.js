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
let squareCount = 0;
let isInGame = true;

function setStone(row, column, unconditionallySet) {
  let description = document.getElementById("description");

  if (unconditionallySet || canSetStone(row, column)) {
    putStone(row, column);
    squareCount++;
    console.log(`squareCount = ${squareCount}`);
    if (squareCount === 64) {
      description.textContent = "ゲーム終了";
      totalUpStone();
    } else {
      othelloColor = !othelloColor;
      description.textContent = othelloColor ? "黒の番です。" : "白の番です。";
    }
  } else {
    description.textContent = "そこに石はおけません。";
  }
  console.log(othelloData);
}

function putStone(row, column) {
  let stage = document.getElementById("stage");

  let square = stage.rows[row].cells[column];

  if (square.querySelector("div").classList.contains(!othelloColor ? "black" : "white")) {
    square.querySelector("div").classList.remove(!othelloColor ? "black" : "white");
  }
  square.querySelector("div").classList.add(othelloColor ? "black" : "white");

  othelloData[row][column] = othelloColor ? 1 : -1;
}

function canSetStone(row, column) {
  if (othelloData[row][column] != 0) {
    return false;
  }

  const reversibleArr = searchReversibleStone(row, column);

  console.log(reversibleArr);

  // 返された配列が空ならfalseを返す
  if (reversibleArr.length === 0) {
    return false;
  }

  for (let i = 0; i <= reversibleArr.length - 1; i++) {
    putStone(reversibleArr[i][0], reversibleArr[i][1]);
  }

  return true;
}

function searchReversibleStone(sRow, sColumn) {
  //この関数に引数として(座標)を与えることでsearchを集約する
  //返り値：[sRow][sColumn]に置いたとき、ひっくり返る石の座標(二次元配列)

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

  let reversibleSquare = [];

  //置く石の色が黒の場合のみ実装してみる

  for (let i = 0; i <= 7; i++) {
    let dx = sRow + direction[i][0];
    let dy = sColumn + direction[i][1];

    if (dx >= 0 && dy >= 0 && dx <= 7 && dy <= 7 && othelloData[dx][dy] === (othelloColor ? -1 : 1)) {
      let tmpReverseStone = [];
      let reverseStone = [];
      tmpReverseStone.push([dx, dy]);
      // console.log(`[${dx}][${dy}]をpush`);

      while (true) {
        dx += direction[i][0];
        dy += direction[i][1];

        if (dx < 0 || dy < 0 || dx > 7 || dy > 7 || othelloData[dx][dy] === 0) {
          tmpReverseStone = [];
          break;
        }

        if (othelloData[dx][dy] === (othelloColor ? -1 : 1)) {
          tmpReverseStone.push([dx, dy]);
        }

        if (othelloData[dx][dy] === (othelloColor ? 1 : -1)) {
          reverseStone = reverseStone.concat(tmpReverseStone);
          tmpReverseStone = [];
          break;
        }
      }
      reversibleSquare = reversibleSquare.concat(reverseStone);
    }
  }

  return reversibleSquare;
}

function totalUpStone() {
  // let stones = document.querySelectorAll(".stone");
  // console.log(stones);
  // stones.forEach(function (element) {
  //   element.removeEventListener("click", setEvent);
  //   console.log("イベントの削除");
  // });

  isInGame = false;

  let blackStone = 0;
  let whiteStone = 0;

  for (let i = 0; i <= 7; i++) {
    for (let j = 0; j <= 7; j++) {
      switch (othelloData[i][j]) {
        case 1:
          blackStone++;
          break;
        case -1:
          whiteStone++;
          break;
      }
    }
    let total = document.getElementById("score");

    let winOrLose;
    if (blackStone > whiteStone) {
      winOrLose = "黒の勝ち";
    } else if (blackStone < whiteStone) {
      winOrLose = "白の勝ち";
    } else {
      winOrLose = "引き分け";
    }

    total.textContent = `黒：${blackStone}　白：${whiteStone}で${winOrLose}。`;
  }
}

window.onload = function () {
  //盤面の作成
  resetStage();
};

function resetStage() {
  const stage = document.getElementById("stage");

  while (stage.firstChild) {
    stage.removeChild(stage.firstChild);
  }

  for (let i = 0; i <= 7; i++) {
    for (let j = 0; j <= 7; j++) {
      othelloData[i][j] = 0;
    }
  }

  squareCount = 0;
  othelloColor = true;
  isInGame = true;

  document.getElementById("score").textContent = "";

  for (let k = 0; k <= 7; k++) {
    let squareRow = document.createElement("tr");

    for (let l = 0; l <= 7; l++) {
      let square = document.createElement("td");
      const stone = document.createElement("div");
      stone.classList.add("stone");
      // square.textContent = othelloBlack;
      square.appendChild(stone);
      squareRow.appendChild(square);

      square.addEventListener("click", setEvent);
    }

    stage.appendChild(squareRow);
  }

  console.log(othelloData);

  setStone(3, 4, true);
  setStone(3, 3, true);
  setStone(4, 3, true);
  setStone(4, 4, true);

  let resetBtn = document.getElementById("reset-btn");
  resetBtn.addEventListener("click", resetStage);
}

function setEvent() {
  if (isInGame) {
    let row = this.parentNode.rowIndex;
    let column = this.cellIndex;

    console.log(`[${row}][${column}]`);

    setStone(row, column, false);
  }
}
