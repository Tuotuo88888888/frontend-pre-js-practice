(function () {
  var table = document.querySelector(".table-container");
  var checkboxAll = document.querySelector(".checkboxAll");
  var checkboxArr = table.querySelectorAll(
    "tbody>tr>td:first-child>input[type=checkbox]"
  );
  var tbody = table.querySelector("tbody");
  var theadThArr = table.querySelector("thead>tr:first-child").children;
  var tbodyTrArr = tbody.children;

  function init() {
    initEvent();
  }

  function initEvent() {
    checkboxAll.addEventListener("change", updateChecked);
    for (let i = 0; i < checkboxArr.length; i++) {
      checkboxArr[i].addEventListener("change", updateAllChecked);
    }
    for (let i = 1; i < theadThArr.length; i++) {
      theadThArr[i].addEventListener(
        "click",
        tableSort.bind(theadThArr[i], i, fnArr[i])
      );
    }
  }
  function updateChecked() {
    for (var i = 0; i < checkboxArr.length; i++) {
      checkboxArr[i].checked = checkboxAll.checked;
    }
  }
  function updateAllChecked() {
    var checked = true;
    for (var i = 0; i < checkboxArr.length; i++) {
      if (!checkboxArr[i].checked) {
        checked = false;
        break;
      }
    }
    checkboxAll.checked = checked;
  }

  fnArr = {
    1(a, b) {
      return a.innerText - b.innerText;
    },
    2(a, b) {
      return a.innerText.localeCompare(b.innerText, "stroke", {
        sensitivity: "base",
      });
    },
    3(a, b) {
      return a.innerText - b.innerText;
    },
    4(a, b) {
      return a.innerText.localeCompare(b.innerText, "stroke", {
        sensitivity: "base",
      });
    },
  };
  function tableSort(index, fn) {
    for (let i = 0; i < theadThArr.length; i++) {
      if (theadThArr[i] !== this) {
        theadThArr[i].setAttribute("sort-status", null);
      }
    }
    var sortStatus = theadThArr[index].getAttribute("sort-status");
    var sortCallback = null;
    if (!sortStatus && sortStatus !== "desc") {
      sortCallback = function (b, a) {
        return fn(a.children[index], b.children[index]);
      };
      theadThArr[index].setAttribute("sort-status", "desc");
    } else if (sortStatus !== "asc") {
      sortCallback = function (a, b) {
        return fn(a.children[index], b.children[index]);
      };
      theadThArr[index].setAttribute("sort-status", "asc");
    } else {
      sortCallback = function (b, a) {
        return fn(a.children[index], b.children[index]);
      };
      theadThArr[index].setAttribute("sort-status", "desc");
    }
    var newTbodyTrArr = Array.prototype.slice
      .call(tbodyTrArr)
      .sort(sortCallback);
    for (let i = 0; i < newTbodyTrArr.length; i++) {
      tbody.appendChild(newTbodyTrArr[i]);
    }
  }

  init();
})();
