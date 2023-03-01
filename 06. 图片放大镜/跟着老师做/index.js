(function () {
  var main = document.querySelector(".main");
  var secondary = document.querySelector(".secondary");
  var imgUl = document.querySelector(".img-ul");
  var modal = document.querySelector(".main .modal");

  var bgImgArr = [];
  var imgArr = [];
  var navArr = [];
  var curBgImg = null;
  var curImg = null;
  var curNav = null;
  var imgs = {
    // 小图
    small: ["imgA_1.jpg", "imgB_1.jpg", "imgC_1.jpg"],
    // 中图
    middle: ["imgA_2.jpg", "imgB_2.jpg", "imgC_2.jpg"],
    // 大图
    large: ["imgA_3.jpg", "imgB_3.jpg", "imgC_3.jpg"],
  };
  function init() {
    initPage();
    initEvents();
    changeNav(0);
  }
  function initPage() {
    var navDoms = document.createDocumentFragment();
    var imgDoms = document.createDocumentFragment();
    var bgDoms = document.createDocumentFragment();
    for (let i = 0; i < imgs.small.length; i++) {
      var navDom = document.createElement("li");
      var navImg = document.createElement("img");
      navImg.src = `./../images/${imgs.small[i]}`;
      navDom.appendChild(navImg);
      navDom.addEventListener(
        "click",
        (function (d) {
          return function () {
            changeNav(navArr.indexOf(d));
          };
        })(navDom)
      );
      navDoms.appendChild(navDom);
      navArr.push(navDom);

      var imgDom = document.createElement("img");
      imgDom.src = `./../images/${imgs.middle[i]}`;
      imgDoms.appendChild(imgDom);
      imgArr.push(imgDom);

      var bgDom = document.createElement("div");
      bgDom.className = "img";
      bgDom.style.backgroundImage = `url(./../images/${imgs.large[i]})`;
      bgDoms.appendChild(bgDom);
      bgImgArr.push(bgDom);
    }
    main.appendChild(imgDoms);
    secondary.appendChild(bgDoms);
    imgUl.appendChild(navDoms);
  }
  function initEvents() {
    main.addEventListener("mouseenter", mainMEEvent);
  }
  function changeNav(index) {
    if (curBgImg) {
      curBgImg.classList.remove("active");
    }
    if (curImg) {
      curImg.classList.remove("active");
    }
    if (curNav) {
      curNav.classList.remove("active");
    }
    bgImgArr[index].classList.add("active");
    imgArr[index].classList.add("active");
    navArr[index].classList.add("active");
    curBgImg = bgImgArr[index];
    curImg = imgArr[index];
    curNav = navArr[index];
  }
  function mainMEEvent() {
    modal.classList.add("active");
    secondary.classList.add("active");

    var left = main.offsetLeft;
    var top = main.offsetLeft;
    var width = main.offsetWidth;
    var height = main.offsetHeight;
    var modalWidth = modal.offsetWidth;
    var modalHeight = modal.offsetHeight;
    var modalHalfWidth = modalWidth / 2;
    var modalHalfHeight = modalHeight / 2;

    var secondaryImg = document.querySelector(".secondary .active");
    var multiplyingX = (800 - secondary.offsetWidth) / (width - modalWidth);
    var multiplyingY = (800 - secondary.offsetHeight) / (height - modalHeight);

    function mouseMove(event) {
      var x = event.clientX - left - modalHalfWidth;
      var y = event.clientY - top - modalHalfHeight;
      if (x <= 0) {
        x = 0;
      }
      if (x >= width - modalWidth) {
        x = width - modalWidth;
      }
      if (y <= 0) {
        y = 0;
      }
      if (y >= height - modalHeight) {
        y = height - modalHeight;
      }
      modal.style.left = x + "px";
      modal.style.top = y + "px";
      magnifying(x, y);
    }
    function magnifying(x, y) {
      secondaryImg.style.backgroundPosition = `${-x * multiplyingX}px ${
        -y * multiplyingY
      }px`;
    }
    main.addEventListener("mousemove", mouseMove);
    main.addEventListener("mouseleave", function (event) {
      modal.classList.remove("active");
      secondary.classList.remove("active");
      this.removeEventListener("mousemove", mouseMove);
      this.removeEventListener("mouseleave", arguments.callee);
    });
  }
  init();
})();
