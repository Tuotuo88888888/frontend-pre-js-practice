(function () {
  var ul = document.querySelector(".container ul");
  var uy = ul.offsetTop;
  var initIndex = 0;

  function changeIndex(index) {
    var oldinitIndex = initIndex;
    initIndex = index;
    var liArray = Array.prototype.slice.call(ul.children);
    var li = liArray[index];
    var initLi = liArray[oldinitIndex];
    var from = initLi.offsetTop - uy;
    var to = li.offsetTop - uy;

    var totalDuration = 500;
    var duration = 10;
    var times = totalDuration / duration;
    var dis = (to - from) / times;

    if (
      (oldinitIndex === 0 && index === ul.children.length - 1) ||
      (oldinitIndex === ul.children.length - 1 && index === 0)
    ) {
      var cloneItem = li.cloneNode(true);
      if (oldinitIndex === 0 && index === ul.children.length - 1) {
        ul.insertBefore(cloneItem, initLi);
      } else if (oldinitIndex === ul.children.length - 1 && index === 0) {
        ul.appendChild(cloneItem);
      }
      from = initLi.offsetTop - uy;
      ul.scrollTop = from;
      var oldTo = li.offsetTop - uy;
      to = cloneItem.offsetTop - uy;
      dis = (to - from) / times;
      var tempId = setInterval(function () {
        from += dis;
        ul.scrollTop = from;
        if (dis === 0) {
          clearInterval(tempId);
          ul.scrollTop = oldTo;
          cloneItem.remove();
        }
        if (dis < 0 && from <= to) {
          clearInterval(tempId);
          ul.scrollTop = oldTo;
          cloneItem.remove();
        }
        if (dis > 0 && from >= to) {
          clearInterval(tempId);
          ul.scrollTop = oldTo;
          cloneItem.remove();
        }
      }, duration);
    } else {
      var tempId = setInterval(function () {
        from += dis;
        ul.scrollTop = from;
        if (dis === 0) {
          clearInterval(tempId);
        }
        if (dis < 0 && from <= to) {
          clearInterval(tempId);
        }
        if (dis > 0 && from >= to) {
          clearInterval(tempId);
        }
      }, duration);
    }
  }
  var tempId = null;
  var index = 0;
  var duration = 1000;
  function start() {
    if (tempId) {
      return;
    }
    tempId = setInterval(function () {
      index++;
      if (index >= ul.children.length) {
        index = 0;
      }
      if (index < 0) {
        index = ul.children.length - 1;
      }
      changeIndex(index);
    }, duration);
  }
  function stop() {
    clearInterval(tempId);
    tempId = null;
  }
  start();
  ul.addEventListener("mouseleave", start);
  ul.addEventListener("mouseover", stop);
})();
