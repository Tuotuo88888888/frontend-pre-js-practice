(function () {
  var menuNavsDom = document.querySelector(".menu-navs");
  var bgImgDom = document.querySelector(".banner .bgImg");

  var bgImgArr = [];
  var menuNavArr = [];
  var curBgImg = null;
  var curMenuNav = null;
  var index = 0;
  var duration = 1000;
  var timerId = null;
  function init() {
    initPage();
    initEvents();
    changeMenu(0);
  }
  function initPage() {
    bgImgDom.innerHTML = "";
    menuNavsDom.innerHTML = "";
    var imgsDom = document.createDocumentFragment();
    var linksDom = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      var imgDom = document.createElement("a");
      imgDom.href = "#";
      imgDom.style.backgroundImage = "url(" + item.img + ")";
      imgDom.style.backgroundColor = item.bg;
      imgsDom.appendChild(imgDom);

      var navDom = document.createElement("a");
      navDom.href = "#";
      navDom.title = item.title + ":" + item.desc;
      var title = document.createElement("span");
      var desc = document.createElement("span");
      title.className = "title";
      title.innerText = item.title;
      desc.className = "desc";
      desc.innerText = item.desc;
      navDom.appendChild(title);
      navDom.appendChild(desc);
      navDom.addEventListener("mouseenter", stop);
      navDom.addEventListener("mouseleave", start);
      linksDom.appendChild(navDom);
      bgImgArr.push(imgDom);
      menuNavArr.push(navDom);
    }
    bgImgDom.appendChild(imgsDom);
    menuNavsDom.appendChild(linksDom);
  }
  function initEvents() {
    var liDoms = menuNavsDom.children;
    for (var i = 0; i < liDoms.length; i++) {
      const liDom = liDoms[i];
      liDom.addEventListener(
        "mouseenter",
        (function (i) {
          return function () {
            index = i;
            changeMenu(i);
          };
        })(i)
      );
    }
    window.addEventListener("load", start);
  }
  function changeMenu(index) {
    if (curBgImg) {
      curBgImg.className = "";
    }
    if (curMenuNav) {
      curMenuNav.className = "";
    }
    bgImgArr[index].className = "active";
    menuNavArr[index].className = "active";
    curBgImg = bgImgArr[index];
    curMenuNav = menuNavArr[index];
  }
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
