var doms = {
  container: document.querySelector(".container"),
};
var chessLength = 13;
var joinLength = 5;
var chessArray = [];
function init() {
  initPage();
}
function initPage() {
  var table = document.createElement("table");
  table.className = "chessTable";
  var tbody = document.createElement("tbody");
  table.appendChild(tbody);
  for (var i = 0; i < chessLength; i++) {
    var tr = document.createElement("tr");
    for (var j = 0; j < chessLength; j++) {
      var td = document.createElement("td");
      td.dataset.row = i;
      td.dataset.line = j;
      td.addEventListener("click", playChess);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  doms.container.appendChild(table);
}
function playChess(e) {
  if (e.target.nodeName !== "TD") {
    return;
  }
  var positionX = e.offsetX > this.offsetWidth / 2;
  var positionY = e.offsetY > this.offsetHeight / 2;
  var row = this.dataset.row;
  var line = this.dataset.line;
  var chessPosition = {
    x: positionX ? Number.parseInt(line) + 1 : Number.parseInt(line),
    y: positionY ? Number.parseInt(row) + 1 : Number.parseInt(row),
    c: getCurColor(),
  };
  if (
    chessArray.some(function (i) {
      return i.x === chessPosition.x && i.y === chessPosition.y;
    })
  ) {
    return console.log(1);
  }
  showChess(chessPosition);
  chessArray.push(chessPosition);
  outcomeCheck();
}
function getCurColor() {
  return (chessArray[chessArray.length - 1] || { c: "black" }).c === "white"
    ? "black"
    : "white";
}
function showChess(chessPosition) {
  var row = chessPosition.y;
  var line = chessPosition.x;
  if (row >= chessLength) {
    row = chessLength - 1;
  }
  if (line >= chessLength) {
    line = chessLength - 1;
  }
  var td = document.querySelector(
    `.chessTable td[data-row="${row}"][data-line="${line}"]`
  );
  var div = document.createElement("div");
  div.dataset.row = chessPosition.y;
  div.dataset.line = chessPosition.x;
  div.className = `chess ${chessPosition.c}`;
  div.style.top = row === chessPosition.y ? "" : "100%";
  div.style.left = line === chessPosition.x ? "" : "100%";
  div.innerText = chessArray.length;
  td.appendChild(div);
}
function outcomeCheck() {
  var curChess = chessArray[chessArray.length - 1];
  var setRangeFnArray = {
    leftToRight(y, c) {
      var arr = chessArray
        .filter(function (chess) {
          return chess.y === y && chess.c === c;
        })
        .sort(function (a, b) {
          return a.x - b.x;
        });
      var resultArray = [];
      return arr.some(function (chess) {
        if (
          resultArray.length === 0 ||
          resultArray[resultArray.length - 1].x === chess.x - 1
        ) {
          resultArray.push(chess);
        } else {
          resultArray = [];
        }
        return resultArray.length >= 5;
      });
    },
    topToBottom(x, c) {
      var arr = chessArray
        .filter(function (chess) {
          return chess.x === x && chess.c === c;
        })
        .sort(function (a, b) {
          return a.y - b.y;
        });
      var resultArray = [];
      return arr.some(function (chess) {
        if (
          resultArray.length === 0 ||
          resultArray[resultArray.length - 1].y === chess.y - 1
        ) {
          resultArray.push(chess);
        } else {
          resultArray = [];
        }
        return resultArray.length >= 5;
      });
    },
    leftTopToRightBottom(x, y, c) {},
    leftBottomToRightTop(x, y, c) {},
  };
  console.log(setRangeFnArray.leftToRight(curChess.y, curChess.c));
  //   for (let i = 0; i < setRangeFnArray.length; i++) {
  //     const xFn = setRangeFnArray[i];
  //     for (let j = 0; j < setRangeFnArray.length; j++) {
  //       const yFn = setRangeFnArray[j];
  //       console.log(xFn(curChess.x, joinLength));
  //     }
  //   }
}
init();
