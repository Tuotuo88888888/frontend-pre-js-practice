(function () {
  var timeList = document.querySelectorAll(".time-list");
  var startTime = new Date();
  var endTime = new Date().setDate(startTime.getDate() + 1);
  function init() {
    initPage();
    timedTask();
  }
  function initPage() {
    timeList.forEach(function (item) {
      var ulHTMLStr = '<ul class="time-list-ul">';
      for (var i = 9; i >= 0; i--) {
        ulHTMLStr += `<li class="time-list-ul-li">
                <img src="./../images/${i}.png" />
                </li>`;
      }
      ulHTMLStr += "</ul>";
      item.innerHTML = ulHTMLStr;
    });
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
      Array.prototype.forEach.call(indexStr, function (item, i) {
        var ul = timeList[i].firstElementChild;
        ul.style.transition = "all 0.5s linear";
        ul.style.transform = `translateY(${120 * item}px)`;
      });
    }, 100);
  }
  init();
})();
