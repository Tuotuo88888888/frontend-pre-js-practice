(function () {
  function $(selector) {
    return document.querySelector(selector);
  }
  var data = [
    "Wallpaper1.jpg",
    "Wallpaper2.jpg",
    "Wallpaper3.jpg",
    "Wallpaper4.jpg",
    "Wallpaper5.jpg",
  ];

  var doms = {
    carouselContainer: $(".carousel-container"),
    carouselList: $(".carousel-list"),
    indicator: $(".indicator"),
    arrowLeft: $(".arrow-left"),
    arrowRight: $(".arrow-right"),
  };

  var curIndex = null;
  var totalMS = 300;
  var containerWidth = doms.carouselContainer.clientWidth;
  var isPlaying = false;

  function init() {
    initPage();
    initEvents();
    moveTo(0);
    start();
  }
  function initPage() {
    var carouselListContainer = document.createDocumentFragment();
    function _createCarouselItem(url) {
      var img = document.createElement("img");
      img.className = "carousel-item";
      img.src = "./../img/" + url;
      carouselListContainer.appendChild(img);
    }
    var indicatorContainer = document.createDocumentFragment();
    data.forEach(function (item, i) {
      _createCarouselItem(item);
      var div = document.createElement("div");
      div.className = "indicator-item";
      div.addEventListener("click", function () {
        moveTo(i);
      });
      indicatorContainer.appendChild(div);
    });
    _createCarouselItem(data[0]);
    doms.carouselList.innerHTML = "";
    doms.carouselList.appendChild(carouselListContainer);
    doms.indicator.innerHTML = "";
    doms.indicator.appendChild(indicatorContainer);
  }
  function initEvents() {
    doms.arrowLeft.addEventListener("click", prev);
    doms.arrowRight.addEventListener("click", next);
    doms.carouselContainer.addEventListener("mouseenter", stop);
    doms.carouselContainer.addEventListener("mouseleave", start);
  }

  function setIndicatorStatus() {
    var curActiveIndicator = $(".indicator-item.active");
    if (curActiveIndicator) {
      curActiveIndicator.classList.remove("active");
    }
    var index = curIndex % doms.indicator.children.length;
    doms.indicator.children[index].classList.add("active");
  }
  function moveTo(newIndex, onend) {
    if (isPlaying || curIndex === newIndex) {
      return;
    }
    isPlaying = true;
    var from = Number.parseFloat(doms.carouselList.style.marginLeft) || 0;
    var to = -containerWidth * newIndex;
    createAnimation({
      from: from,
      to: to,
      totalMS,
      onmove(n) {
        doms.carouselList.style.marginLeft = n + "px";
      },
      onend() {
        onend && onend();
        isPlaying = false;
      },
    });
    curIndex = newIndex;
    setIndicatorStatus();
  }
  function next() {
    var newIndex = curIndex + 1;
    var onend;
    if (newIndex === doms.carouselList.children.length - 1) {
      onend = function () {
        doms.carouselList.style.marginLeft = 0;
        curIndex = 0;
      };
    }
    moveTo(newIndex, onend);
  }
  function prev() {
    var newIndex = curIndex - 1;
    if (newIndex < 0) {
      var maxIndex = doms.carouselList.children.length - 1;
      doms.carouselList.style.marginLeft = -containerWidth * maxIndex + "px";
      newIndex = maxIndex - 1;
    }
    moveTo(newIndex);
  }
  var tempId = null;
  function start() {
    if (tempId) {
      return;
    }
    tempId = setInterval(next, 1000);
  }
  function stop() {
    clearInterval(tempId);
    tempId = null;
  }
  init();
})();
