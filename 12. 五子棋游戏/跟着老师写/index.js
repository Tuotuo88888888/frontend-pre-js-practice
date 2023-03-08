var doms = {
  container: document.querySelector(".container"),
};
var chessLength = 13;
var joinLength = 5;
var initChessColor = "white";
var chessArray = [];
var isGameOver = false;
function main() {
  initChessboard();
  bindEvents();
}
function initChessboard() {
  doms.container.innerHTML = "";
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
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  doms.container.appendChild(table);
}
function bindEvents() {
  doms.container.addEventListener("click", playChess);
}
function playChess(e) {
  if (!isGameOver) {
    if (e.target.nodeName === "TD") {
      var positionX = e.offsetX > e.target.offsetWidth / 2;
      var positionY = e.offsetY > e.target.offsetHeight / 2;
      var row = e.target.dataset.row;
      var line = e.target.dataset.line;
      var chessPosition = {
        x: positionX ? Number.parseInt(line) + 1 : Number.parseInt(line),
        y: positionY ? Number.parseInt(row) + 1 : Number.parseInt(row),
        c: getCurColor(),
      };
      if (exist(chessPosition)) {
        chessMove(chessPosition);
      }
    }
  } else {
    if (window.confirm("您要重新开始一局吗？")) {
      chessArray = [];
      initChessboard();
      isGameOver = false;
    }
  }
}
function exist(chessPosition) {
  return !chessArray.some(function (i) {
    return i.x === chessPosition.x && i.y === chessPosition.y;
  });
}
function getCurColor() {
  if (chessArray.length === 0) {
    return initChessColor;
  } else {
    return chessArray[chessArray.length - 1].c === "white" ? "black" : "white";
  }
}
function chessMove(chessPosition) {
  chessArray.push(chessPosition);
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
  outcomeCheck();
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
          resultArray = [chess];
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
          resultArray = [chess];
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
          resultArray = [chess];
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
          resultArray = [chess];
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
    isGameOver = true;
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
main();
