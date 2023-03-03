(function () {
  var data = [
    "Wallpaper1.jpg",
    "Wallpaper2.jpg",
    "Wallpaper3.jpg",
    "Wallpaper4.jpg",
    "Wallpaper5.jpg",
  ];

  var carouselContainer = document.querySelector(".carousel-container");
  var carouselList = document.querySelector(
    ".carousel-container .carousel-list"
  );
  var indicator = document.querySelector(".carousel-container .indicator");
  var arrowLeft = document.querySelector(".carousel-container .arrow-left");
  var arrowRight = document.querySelector(".carousel-container .arrow-right");

  var curIndex = 0;
  var totalMS = 400;

  function init() {
    initPage();
    initEvents();
    moveTo(0);
    start();
  }
  function initPage() {
    var carouselListContainer = document.createDocumentFragment();
    var indicatorContainer = document.createDocumentFragment();
    data.forEach(function (item, i) {
      var img = document.createElement("img");
      img.src = "./../img/" + item;
      carouselListContainer.appendChild(img);

      var div = document.createElement("div");
      div.className = "indicator-item";
      div.addEventListener("click", moveTo.bind(div, i));
      indicatorContainer.appendChild(div);
    });
    var img = document.createElement("img");
    img.src = "./../img/" + data[0];
    carouselListContainer.appendChild(img);
    carouselList.innerHTML = "";
    carouselList.appendChild(carouselListContainer);
    indicator.innerHTML = "";
    indicator.appendChild(indicatorContainer);
  }
  function initEvents() {
    arrowLeft.addEventListener("click", prev);
    arrowRight.addEventListener("click", next);
    carouselContainer.addEventListener("mouseenter", stop);
    carouselContainer.addEventListener("mouseleave", start);
  }
  function moveTo(newIndex) {
    indicator.children[curIndex].classList.remove("active");
    indicator.children[newIndex].classList.add("active");
    createAnimation({
      from: Number.parseInt(carouselList.style.marginLeft || 0),
      to: -carouselContainer.offsetWidth * newIndex,
      totalMS,
      onmove(from) {
        carouselList.style.marginLeft = from + "px";
      },
      onend() {
        curIndex = newIndex;
      },
    });
  }
  function next() {
    var newIndex = curIndex + 1;
    if (newIndex === data.length) {
      indicator.children[curIndex].classList.remove("active");
      indicator.children[0].classList.add("active");
      createAnimation({
        from: Number.parseInt(carouselList.style.marginLeft || 0),
        to: -carouselContainer.offsetWidth * newIndex,
        totalMS,
        onmove(from) {
          carouselList.style.marginLeft = from + "px";
        },
        onend() {
          carouselList.style.marginLeft = "0px";
          curIndex = 0;
        },
      });
    } else {
      moveTo(newIndex);
    }
  }
  function prev() {
    var newIndex = curIndex - 1;
    if (newIndex === -1) {
      newIndex = data.length - 1;
      carouselList.style.marginLeft =
        -carouselContainer.offsetWidth * data.length + "px";
      indicator.children[curIndex].classList.remove("active");
      indicator.children[newIndex].classList.add("active");
      createAnimation({
        from: Number.parseInt(carouselList.style.marginLeft || 0),
        to: -carouselContainer.offsetWidth * newIndex,
        totalMS,
        onmove(from) {
          carouselList.style.marginLeft = from + "px";
        },
        onend() {
          curIndex = newIndex;
        },
      });
    } else {
      moveTo(newIndex);
    }
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
