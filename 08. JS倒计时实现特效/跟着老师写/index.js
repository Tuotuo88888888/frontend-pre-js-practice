(function () {
  var timeList = document.querySelectorAll(".time-list");
  var startTime = new Date();
  var endTime = new Date().setDate(startTime.getDate() + 1);
  var curIndexStr = "235959";
  function init() {
    initPage();
    timedTask();
  }
  function initPage() {
    showTime(curIndexStr);
  }
  function timedTask() {
    var tempId = setInterval(() => {
      var totalTime = endTime - Date.now();
      if (totalTime <= 0) {
        totalTime = 0;
        clearInterval(tempId);
      }
      var s = Math.floor((totalTime / 1000) % 60)
        .toString()
        .padStart(2, "0");
      var m = Math.floor((totalTime / 1000 / 60) % 60)
        .toString()
        .padStart(2, "0");
      var h = Math.floor((totalTime / 1000 / 60 / 60) % 24)
        .toString()
        .padStart(2, "0");
      var indexStr = h + m + s;
      showTime(indexStr);
    }, 1000);
  }
  function showTime(indexStr) {
    Array.prototype.forEach.call(indexStr, function (item, i) {
      var oldItem = curIndexStr[i];
      var ul = timeList[i].firstElementChild;
      if (oldItem < item) {
        var oldlis = timeList[i].querySelectorAll("ul li");
        var oldli = ul.children[oldItem];
        var oldNextLi = oldli.nextElementSibling;
        var li = ul.children[item];
        ul.insertBefore(oldli, li.nextElementSibling);
        ul.style.transition = "none";
        ul.style.bottom = `${-120 * (oldItem + 1)}px`;
        ul.clientWidth;
        ul.style.transition = "all 0.5s linear";
        ul.style.bottom = `${-120 * oldItem}px`;
        ul.addEventListener("transitionend", function () {
          ul.insertBefore(oldli, oldNextLi);
          ul.style.transition = "none";
          ul.style.bottom = `${-120 * item}px`;
          ul.removeEventListener("transitionend", arguments.callee);
        });
      } else {
        ul.style.transition = "all 0.5s linear";
        ul.style.bottom = `${-120 * item}px`;
      }
    });
    curIndexStr = indexStr;
  }
  init();
})();
