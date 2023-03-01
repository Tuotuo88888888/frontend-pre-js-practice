(function () {
  function $(selector) {
    return document.querySelector(selector);
  }
  function $$(selector) {
    return document.querySelectorAll(selector);
  }
  var prizeDoms = $(".banner .center").getElementsByClassName("prize");
  var cjBtn = $(".cjbtn");
  var cjcsDom = document.getElementById("cjcs");
  var closeDom = $(".warning .close");
  var modalDom = $(".modal");
  var modalContent = modalDom.querySelector(".body .content");
  var modalOk = document.getElementById("ok");

  var cjcs = 5;
  var index = 0;
  var curPrize = null;
  function init() {
    initPage();
    initEvents();
  }
  function initPage() {
    cjcsDom.innerText = cjcs;
  }
  function initEvents() {
    cjBtn.addEventListener("click", cjBtnClick);
    closeDom.addEventListener("click", closeModalDom);
  }

  function cjBtnClick() {
    if (cjcs <= 0) {
      return;
    }
    cjBtn.removeEventListener("click", cjBtnClick);
    var randomly = Math.floor(Math.random() * prizeDoms.length);
    var stopDate = Date.now() + 2 * 1000;
    var tempId = setInterval(function () {
      if (index >= prizeDoms.length) {
        index = 0;
      }
      if (Date.now() >= stopDate && index == randomly) {
        clearTimeout(tempId);
        cjcs--;
        cjcsDom.innerText = cjcs;

        Promise.resolve(null).then(function () {
          cjBtn.addEventListener("click", cjBtnClick);

          var buttonText = "再来一次";
          modalOk.onclick = function () {
            closeModalDom();
            cjBtnClick();
          };
          if (cjcs <= 0) {
            buttonText = "确定";
            modalOk.onclick = closeModalDom;
          }
          modal("恭喜您获得" + curPrize.innerText, buttonText);
          openModalDom();
        });
      }
      changePrize(index);
      index++;
    }, 50);
  }
  function changePrize(index) {
    curPrize && curPrize.classList.remove("active");
    prizeDoms[index].classList.add("active");
    curPrize = prizeDoms[index];
  }
  function modal(content, buttonText) {
    modalContent.innerText = content;
    modalOk.innerText = buttonText;
  }
  function closeModalDom() {
    modalDom.classList.remove("open");
  }
  function openModalDom() {
    modalDom.classList.add("open");
  }
  init();
})();
