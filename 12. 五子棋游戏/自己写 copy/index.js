var doms = {
  container: document.querySelector(".container"),
};
var chessLength = 13;
var joinLength = 5;
var chessArray = [];
var isGameOver = true;
function init() {
  initPage();
}
function initPage() {
  var table = document.createElement("table");
  table.className = "chessTable hidTextColor";
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
  if (e.target.nodeName !== "TD" || isGameOver === false) {
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
    return;
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
    leftToRight(curChess) {
      var y = curChess.y;
      var c = curChess.c;
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
        return chessActive(resultArray);
      });
    },
    topToBottom(curChess) {
      var x = curChess.x;
      var c = curChess.c;
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
        return chessActive(resultArray);
      });
    },
    leftTopToRightBottom(curChess) {
      var x = curChess.x;
      var y = curChess.y;
      var c = curChess.c;
      var min = Math.min(x, y);
      var initX = x - min;
      var initY = y - min;
      var arr = [];
      for (var i = 0; i < chessLength; i++) {
        var curX = initX + i;
        var curY = initY + i;
        if (curX >= chessLength || curY >= chessLength) {
          break;
        }
        var curChess = chessArray.find(function (chess) {
          return chess.x === curX && chess.y === curY && chess.c === c;
        });
        if (curChess) {
          arr.push(curChess);
        }
      }
      var resultArray = [];
      return arr.some(function (chess) {
        if (
          resultArray.length === 0 ||
          (resultArray[resultArray.length - 1].y === chess.y - 1 &&
            resultArray[resultArray.length - 1].x === chess.x - 1)
        ) {
          resultArray.push(chess);
        } else {
          resultArray = [];
        }
        return chessActive(resultArray);
      });
    },
    leftBottomToRightTop(curChess) {
      var x = curChess.x;
      var y = curChess.y;
      var c = curChess.c;
      var min = Math.min(x, chessLength - y);
      var initX = x - min;
      var initY = y + min;
      var arr = [];
      for (var i = 0; i < chessLength; i++) {
        var curX = initX + i;
        var curY = initY - i;
        if (curX >= chessLength || curY < 0) {
          break;
        }
        var curChess = chessArray.find(function (chess) {
          return chess.x === curX && chess.y === curY && chess.c === c;
        });
        if (curChess) {
          arr.push(curChess);
        }
      }
      var resultArray = [];
      return arr.some(function (chess) {
        if (
          resultArray.length === 0 ||
          (resultArray[resultArray.length - 1].y === chess.y + 1 &&
            resultArray[resultArray.length - 1].x === chess.x - 1)
        ) {
          resultArray.push(chess);
        } else {
          resultArray = [];
        }
        return chessActive(resultArray);
      });
    },
  };
  var curResult = Object.keys(setRangeFnArray).some(function (key) {
    return setRangeFnArray[key](curChess);
  });
  if (curResult) {
    document.querySelector(".chessTable").classList.remove("hidTextColor");
    isGameOver = false;
  }
}
function chessActive(chessArray) {
  if (chessArray.length >= joinLength) {
    for (var i = 0; i < chessArray.length; i++) {
      var chess = chessArray[i];
      var chessDom = document.querySelector(
        `.chessTable td div[data-row="${chess.y}"][data-line="${chess.x}"]`
      );
      chessDom.classList.add("active");
    }
    return true;
  } else {
    return false;
  }
}
init();
