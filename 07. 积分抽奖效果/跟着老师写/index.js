(function () {
  function $(selector) {
    return document.querySelector(selector);
  }
  function $$(selector) {
    return document.querySelectorAll(selector);
  }
  var prizeDoms = $$(".banner .center .prize");
  var cjBtn = $(".cjbtn");
  var cjcsDom = $("#cjcs");
  var closeDom = $(".warning .close");
  var modalDom = $(".modal");
  var modalContent = $(".modal .body .content");
  var modalOk = $("#ok");

  var cjcs = 5;
  var index = -1;
  var curIndex = null;
  var curPrize = null;
  var tempId = null;
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
    modalOk.addEventListener("click", modalOkClick);
  }

  function cjBtnClick() {
    if (cjcs <= 0) {
      return;
    }
    runGame();
  }
  function modalOkClick() {
    closeModalDom();
    cjBtnClick();
  }
  function runGame() {
    if (tempId) {
      return;
    }
    var randomly = Math.floor(Math.random() * prizeDoms.length);
    var stopDate = Date.now() + 2 * 1000;
    tempId = setInterval(function () {
      curIndex = ++index % prizeDoms.length;
      changePrize(curIndex);
      if (Date.now() >= stopDate && curIndex == randomly) {
        clearTimeout(tempId);
        tempId = null;
        cjcs--;
        cjcsDom.innerText = cjcs;
        changeModalStatus();
      }
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
  function changeModalStatus() {
    var content = "恭喜您获得" + curPrize.innerText;
    var buttonText = "再来一次";
    if (cjcs <= 0) {
      buttonText = "确定";
    }
    if (curIndex === 4) {
      content = "加油！";
    }
    modal(content, buttonText);
    openModalDom();
  }
  function closeModalDom() {
    modalDom.classList.remove("open");
  }
  function openModalDom() {
    modalDom.classList.add("open");
  }
  init();
})();
