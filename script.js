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
  if (unconditionallySet || canSetStone(row, column)) {
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
  //searchReversibleSquareから返された二次元配列の中に、othelloData[row][column]が
  //含まれていたらtrueを返す

  if (othelloData[row][column] != 0) {
    return false;
  }

  const reversibleArr = searchTurningStone(row, column);

  console.log(reversibleArr);

  // reversibleArr.includes();

  // 返された配列を検索し、その中に[row][column]が含まれているか調べる

  return true;
}

function searchTurningStone(sRow, sColumn) {
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

        if (dx < 0 || dy < 0 || dx > 7 || dy > 7 || othelloData[dy][dx] === 0) {
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

// function searchOneDirection(squareArr, row, column, dx, dy) {
//   if (othelloData[row + dx][column + dy] === othelloColor ? -1 : 1) {
//     searchOneDirection(squareArr, row + dx, column + dy, dx, dy);
//     squareArr.push([row + dx, column + dy]);
//   }

//   return squareArr;
// }

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
  setStone(5, 3, true);
  setStone(5, 4, true);
};
