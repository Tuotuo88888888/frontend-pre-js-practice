function createAnimation(options) {
  var from = options.from;
  var to = options.to;
  var totalMS = options.totalMS || 1000;
  var duration = options.duration || 10;
  var times = Math.floor(totalMS / duration);
  var dis = (to - from) / times;
  var curTimes = 0;
  var timerId = setInterval(function () {
    from += dis;
    curTimes++;
    if (curTimes >= times) {
      from = to;
      clearInterval(timerId);
      options.onend && options.onend();
    }
    options.onmove && options.onmove(from);
  }, duration);
  return {
    stop: function (fn) {
      fn && fn();
      !fn && options.onend && options.onend();
      clearInterval(timerId);
    },
  };
}
