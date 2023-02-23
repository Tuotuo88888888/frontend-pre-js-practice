(function () {
  var ul = document.querySelector(".container ul");
  function createLastItem() {
    ul.appendChild(ul.firstElementChild.cloneNode(true));
  }
  createLastItem();
  var duration = 1000;
  setInterval(moveNext, duration);

  var itemHeight = 30;
  var curIndex = 0;
  function moveNext() {
    var from = curIndex * itemHeight;
    curIndex++;
    var to = curIndex * itemHeight;

    var totalDuration = 500;
    var duration = 10;
    var times = totalDuration / duration;
    var dis = (to - from) / times;

    var tempId = setInterval(function () {
      from += dis;
      ul.scrollTop = from;
      if (from >= to) {
        clearInterval(tempId);
        if (curIndex >= ul.children.length - 1) {
          curIndex = 0;
        }
      }
    }, duration);
  }
})();
