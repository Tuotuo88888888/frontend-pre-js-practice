(function () {
  function createAnimation(options) {
    var from = options.from; // 起始值
    var to = options.to; // 结束值
    var totalMS = options.totalMS || 1000; // 变化总时间
    var duration = options.duration || 15; // 动画间隔时间
    var times = Math.floor(totalMS / duration); // 变化的次数
    var dis = (to - from) / times; // 每一次变化改变的值
    var curTimes = 0; // 当前变化的次数
    var timerId = setInterval(function () {
      from += dis;
      curTimes++; // 当前变化增加一次
      if (curTimes >= times) {
        // 变化的次数达到了
        from = to; // 变化完成了
        clearInterval(timerId); // 不再变化了
        options.onend && options.onend();
      }
      // 无数的可能性
      options.onmove && options.onmove(from);
    }, duration);
  }

  var ul = document.querySelector(".container ul");
  var uy = ul.offsetTop;
  var initIndex = 0;

  function changeIndex(index) {
    var oldinitIndex = initIndex;
    initIndex = index;
    var liArray = Array.prototype.slice.call(ul.children);
    var li = liArray[index];
    var initLi = liArray[oldinitIndex];

    var totalDuration = 500;
    var duration = 10;

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
      ul.scrollTop = initLi.offsetTop - uy;
      createAnimation({
        from: initLi.offsetTop - uy,
        to: cloneItem.offsetTop - uy,
        totalMS: totalDuration,
        duration: duration,
        onmove: function (e) {
          ul.scrollTop = e;
        },
        onend: function () {
          Promise.resolve(1).then(function () {
            ul.scrollTop = li.offsetTop - uy;
            cloneItem.remove();
          });
        },
      });
    } else {
      createAnimation({
        from: initLi.offsetTop - uy,
        to: li.offsetTop - uy,
        totalMS: totalDuration,
        duration: duration,
        onmove: function (e) {
          ul.scrollTop = e;
        },
      });
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
