(function () {
  var banner = document.querySelector(".banner");
  var menuUlDom = document.querySelector(".menu ul");
  var menuImg = document.querySelector(".banner img");

  function init() {
    initPage();
    initEvents();
    changeMenu(0);
  }
  function initPage() {
    menuUlDom.innerHTML = "";
    var dom = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      var liDom = document.createElement("li");
      var title = document.createElement("span");
      var desc = document.createElement("span");
      title.className = "title";
      title.innerText = item.title;
      desc.className = "desc";
      desc.innerText = item.desc;
      liDom.setAttribute("data-index", i);
      liDom.appendChild(title);
      liDom.appendChild(desc);
      dom.appendChild(liDom);
    }
    menuUlDom.appendChild(dom);
  }
  function initEvents() {
    var liDoms = menuUlDom.children;
    for (let i = 0; i < liDoms.length; i++) {
      const liDom = liDoms[i];
      liDom.addEventListener("mouseenter", function () {
        var liIndex = this.getAttribute("data-index");
        index = liIndex;
        changeMenu(liIndex);
      });
    }
    window.addEventListener("load", start);
    menuUlDom.addEventListener("mouseenter", stop);
    menuUlDom.addEventListener("mouseleave", start);
  }
  function changeMenu(index) {
    var item = data[index];
    banner.style.backgroundColor = item.bg;
    menuImg.src = item.img;
    var activeLi = menuUlDom.querySelector("li.active");
    if (activeLi) {
      activeLi.className = "";
    }
    menuUlDom.querySelector(`li[data-index="${index}"]`).className = "active";
  }
  var index = 0;
  var duration = 1000;
  var timerId = null;
  function start() {
    if (timerId) {
      return;
    }
    timerId = setInterval(function () {
      if (index >= data.length) {
        index = 0;
      }
      changeMenu(index++);
    }, duration);
  }
  function stop() {
    clearInterval(timerId);
    timerId = null;
  }
  init();
})();
