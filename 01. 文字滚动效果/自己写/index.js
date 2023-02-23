(function () {
  var ul = document.querySelector(".container ul");
  var uy = ul.offsetTop;
  var initIndex = 0;

  function changeIndex(index) {
    var li = Array.prototype.slice.call(ul.children)[index];
    var scrollTop = li.offsetTop - uy;

    if (
      (initIndex === 0 && index === ul.children.length - 1) ||
      (initIndex === ul.children.length - 1 && index === 0)
    ) {
      var cloneItem = li.cloneNode(true);
      var formLi = Array.prototype.slice.call(ul.children)[initIndex];
      if (initIndex === 0 && index === ul.children.length - 1) {
        ul.insertBefore(cloneItem, formLi);
      } else if (initIndex === ul.children.length - 1 && index === 0) {
        ul.appendChild(cloneItem);
      }
      ul.scrollTo({ top: formLi.offsetTop - uy });
      ul.scrollTo({ top: cloneItem.offsetTop - uy, behavior: "smooth" });
      setTimeout(function () {
        cloneItem.remove();
        ul.scrollTo({ top: scrollTop });
      }, 500);
    } else {
      ul.scrollTo({ top: scrollTop, behavior: "smooth" });
    }
    initIndex = index;
  }
  var tempId = null;
  var index = 0;
  var duration = 1000;
  function start() {
    if (tempId) {
      return;
    }
    tempId = setInterval(function () {
      index--;
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
