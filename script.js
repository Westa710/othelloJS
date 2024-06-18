"use strict";

let othelloData = [
  // 0:空 1:黒 -1:白
  // 盤面。サイズはラジオボタンの入力によって変化
];

let othelloColor = true; //true:黒 false:白
let squareCount = 0;
let isInGame = true;
let stageSize;

const othelloBlack = 1;
const othelloWhite = -1;

let textBorW;

function setStone(row, column, unconditionallySet) {
  let description = document.getElementById("description");

  if (unconditionallySet || canSetStone(row, column)) {
    putStone(row, column);
    squareCount++;
    if (squareCount === stageSize ** 2 || canNotContinue()) {
      let additionalWords = "";
      if (squareCount !== stageSize ** 2) {
        additionalWords = "(両者とも置ける場所がありません)";
      }
      description.textContent = `ゲーム終了${additionalWords}。`;
      totalUpStone();
    } else {
      othelloColor = !othelloColor;
      textBorW = othelloColor ? "黒の番です。" : "白の番です。";
      description.textContent = textBorW;
    }
  } else {
    description.textContent = `そこに石はおけません。${textBorW}`;
  }
}

function putStone(row, column) {
  let stage = document.getElementById("stage");

  let square = stage.rows[row].cells[column];

  if (
    square
      .querySelector("div")
      .classList.contains(!othelloColor ? "black" : "white")
  ) {
    square
      .querySelector("div")
      .classList.remove(!othelloColor ? "black" : "white");
  }
  square.querySelector("div").classList.add(othelloColor ? "black" : "white");

  othelloData[row][column] = othelloColor ? 1 : -1;
}

function canSetStone(row, column) {
  if (othelloData[row][column] != 0) {
    return false;
  }

  const reversibleArr = searchReversibleStone(row, column, othelloColor);

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

function searchReversibleStone(sRow, sColumn, sColor) {
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

  for (let i = 0; i <= 7; i++) {
    let dx = sRow + direction[i][0];
    let dy = sColumn + direction[i][1];

    if (
      dx >= 0 &&
      dy >= 0 &&
      dx <= stageSize - 1 &&
      dy <= stageSize - 1 &&
      othelloData[dx][dy] === (sColor ? othelloWhite : othelloBlack)
    ) {
      let tmpReverseStone = [];
      let reverseStone = [];
      tmpReverseStone.push([dx, dy]);
      // console.log(`[${dx}][${dy}]をpush`);

      while (true) {
        dx += direction[i][0];
        dy += direction[i][1];

        if (
          dx < 0 ||
          dy < 0 ||
          dx > stageSize - 1 ||
          dy > stageSize - 1 ||
          othelloData[dx][dy] === 0
        ) {
          tmpReverseStone = [];
          break;
        }

        if (othelloData[dx][dy] === (sColor ? othelloWhite : othelloBlack)) {
          tmpReverseStone.push([dx, dy]);
        }

        if (othelloData[dx][dy] === (sColor ? othelloBlack : othelloWhite)) {
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

// function nothingOneColor() {
//   //盤面がどちらかの色のみで埋まった場合にゲームを終了
//   if (squareCount <= 4) {
//     return false;
//   }

//   for (let i = 0; i <= stageSize - 1; i++) {
//     for (let j = 0; j <= stageSize - 1; j++) {
//       if (othelloData[i][j] === (othelloColor ? othelloWhite : othelloBlack)) {
//         return false;
//       }
//     }
//   }

//   return true;
// }

function canNotContinue() {
  //白も黒もはさめない場合にゲームを終了

  if (squareCount <= 4) {
    return false;
  }

  for (let i = 0; i <= stageSize - 1; i++) {
    for (let j = 0; j <= stageSize - 1; j++) {
      if (othelloData[i][j] === 0) {
        let reversibleSquareMySide = searchReversibleStone(i, j, othelloColor);
        console.log(`Data[${i}][${j}]` + reversibleSquareMySide);

        let reversibleSquareOpponentSide = searchReversibleStone(
          i,
          j,
          !othelloColor
        );
        console.log(`Data[${i}][${j}]` + reversibleSquareOpponentSide);
        if (
          reversibleSquareMySide.length !== 0 ||
          reversibleSquareOpponentSide.length !== 0
        ) {
          return false;
        }
      }
    }
  }

  return true;
}

//total up white and black stone
//display the result
//display the winner
function totalUpStone() {
  let blackStone = 0;
  let whiteStone = 0;

  for (let i = 0; i <= stageSize - 1; i++) {
    for (let j = 0; j <= stageSize - 1; j++) {
      if (othelloData[i][j] === othelloBlack) {
        blackStone++;
      } else if (othelloData[i][j] === othelloWhite) {
        whiteStone++;
      }
    }
  }

  let result = document.getElementById("score");
  result.textContent = `黒:${blackStone} 白:${whiteStone}`;

  let winner = document.getElementById("description");
  if (blackStone > whiteStone) {
    winner.textContent = "黒の勝ちです。";
  } else if (blackStone < whiteStone) {
    winner.textContent = "白の勝ちです。";
  } else {
    winner.textContent = "引き分けです。";
  }
}

window.onload = function () {
  //盤面の作成
  resetStage();
};

function resetStage() {
  let elements = document.getElementsByName("size-select");
  let len = elements.length;
  let checkValue = "";

  for (let i = 0; i < len; i++) {
    if (elements.item(i).checked) {
      checkValue = elements.item(i).value;
    }
  }

  stageSize = parseInt(checkValue, 10);
  console.log("stageSize = " + stageSize);

  othelloData = [];

  for (let i = 0; i <= stageSize - 1; i++) {
    let row = [];
    for (let j = 0; j <= stageSize - 1; j++) {
      row.push(0);
    }
    othelloData.push(row);
  }

  const stage = document.getElementById("stage");
  stage.innerHTML = "";

  while (stage.firstChild) {
    stage.removeChild(stage.firstChild);
  }

  squareCount = 0;
  othelloColor = true;
  isInGame = true;

  document.getElementById("score").textContent = "";

  for (let k = 0; k <= stageSize - 1; k++) {
    let squareRow = document.createElement("tr");

    for (let l = 0; l <= stageSize - 1; l++) {
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

  setStone(stageSize / 2 - 1, stageSize / 2, true);
  setStone(stageSize / 2 - 1, stageSize / 2 - 1, true);
  setStone(stageSize / 2, stageSize / 2 - 1, true);
  setStone(stageSize / 2, stageSize / 2, true);

  let resetBtn = document.getElementById("reset-btn");
  resetBtn.addEventListener("click", resetStage);

  let passBtn = document.getElementById("pass-btn");
  passBtn.addEventListener("click", skipTurn);
}

function setEvent() {
  if (isInGame) {
    let row = this.parentNode.rowIndex;
    let column = this.cellIndex;

    console.log(`[${row}][${column}]`);

    setStone(row, column, false);
  }
}

function skipTurn() {
  let description = document.getElementById("description");

  if (!isInGame) {
    return;
  }

  if (!existPlaceableSquare()) {
    othelloColor = !othelloColor;
    description.textContent = `パスしました。${
      othelloColor ? "黒の番です。" : "白の番です。"
    }`;
  } else {
    description.textContent = `置ける場所があります。${textBorW}`;
  }
}

function existPlaceableSquare() {
  //すべての空きマスを走査して、ひっくり返る石が一つでもあったらtrueとなりスキップ不可能
  //一つでもあったらfalse

  for (let i = 0; i <= stageSize - 1; i++) {
    for (let j = 0; j <= stageSize - 1; j++) {
      if (othelloData[i][j] === 0) {
        let reversibleSquareArr = searchReversibleStone(i, j, othelloColor);
        // console.log(`Data[${i}][${j}]` + reversibleSquareArr);

        if (reversibleSquareArr.length !== 0) {
          return true;
        }
      }
    }
  }
  return false;
}
