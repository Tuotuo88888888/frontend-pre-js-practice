function $(selector) {
  return document.querySelector(selector);
}
var doms = {
  topHint: $(".top-hint"),
  bodyHint: $(".body-hint"),
  imgContainer: $(".img-container"),
  imgBlock: $(".imgBlock"),
  imgGap: $(".imgGap"),
  slidingBlock: $(".sliding-block"),
  slidingBtn: $(".slidingBtn"),
  slidingHint: $(".slidingHint"),
};
var imgMinIndex = 1;
var imgMaxIndex = 5;
var slidingBtnInitLeft = -2;

function main() {
  changeChart();
  bindEvents();
}
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function changeChart() {
  doms.bodyHint.innerText = "请完成图片验证";
  doms.bodyHint.className = "body-hint";
  doms.imgGap.style.opacity = 1;
  doms.imgBlock.style.opacity = 0;
  doms.imgBlock.style.left = "0px";
  doms.slidingBtn.style.left = slidingBtnInitLeft + "px";
  doms.slidingHint.style.opacity = 1;
  doms.imgBlock.style.transition = "none";
  doms.slidingBtn.style.transition = "none";

  var imgRandom = getRandom(imgMinIndex, imgMaxIndex);
  var imgUrl = `url(./../img/t${imgRandom}.png)`;
  doms.imgContainer.style.backgroundImage = imgUrl;
  var boxWidth = doms.imgContainer.clientWidth;
  var mobileWidth = boxWidth - doms.imgGap.offsetWidth;
  var boxRandomLeft = getRandom(Math.floor(boxWidth / 2), mobileWidth);
  var boxHeight = doms.imgContainer.clientHeight;
  var mobileHeight = boxHeight - doms.imgGap.offsetHeight;
  var boxRandomTop = getRandom(0, mobileHeight);

  doms.imgGap.style.top = boxRandomTop + "px";
  doms.imgGap.style.left = boxRandomLeft + "px";

  doms.imgBlock.style.top = boxRandomTop + "px";
  doms.imgBlock.style.backgroundImage = imgUrl;
  doms.imgBlock.style.backgroundPosition = `${-boxRandomLeft}px ${-boxRandomTop}px`;
  doms.imgBlock.style.top = boxRandomTop + "px";
  doms.slidingBtn.addEventListener("mousedown", slidingChange);
}
function slidingChange(e) {
  doms.imgBlock.style.transition = "none";
  doms.slidingBtn.style.transition = "none";
  doms.bodyHint.innerText = "拖动图片完成验证";
  doms.bodyHint.className = "body-hint";
  doms.imgBlock.style.opacity = 1;
  doms.slidingHint.style.opacity = 0;
  var initX = e.clientX;
  var imgOSLeft = doms.imgBlock.offsetLeft;
  var btnOSLeft = doms.slidingBtn.offsetLeft;
  var spaceX = imgOSLeft - btnOSLeft;

  var boxWidth = doms.imgContainer.clientWidth;
  var imgMobileWidth = boxWidth - doms.imgBlock.offsetWidth;
  function move(e) {
    var left = e.clientX - initX + imgOSLeft;
    if (left < 0) {
      left = 0;
    }
    if (left > imgMobileWidth) {
      left = imgMobileWidth;
    }
    doms.imgBlock.style.left = left + "px";
    doms.slidingBtn.style.left = left - spaceX + "px";
  }
  function up(e) {
    window.removeEventListener("mousemove", move);
    window.removeEventListener("mouseup", arguments.callee);
    if (
      Number.parseInt(doms.imgBlock.style.left) <
        Number.parseInt(doms.imgGap.style.left) + 5 &&
      Number.parseInt(doms.imgBlock.style.left) >
        Number.parseInt(doms.imgGap.style.left) - 5
    ) {
      doms.bodyHint.innerText = "验证成功";
      doms.bodyHint.className = "body-hint sur";
      doms.imgGap.style.opacity = 0;
      doms.imgBlock.style.opacity = 0;
    } else {
      doms.slidingHint.style.opacity = 1;
      doms.bodyHint.innerText = "验证失败";
      doms.bodyHint.className = "body-hint err";

      doms.imgBlock.style.transition = "all 0.5s ease 0s";
      doms.slidingBtn.style.transition = "all 0.5s ease 0s";
      doms.imgBlock.style.left = imgOSLeft + "px";
      doms.slidingBtn.style.left = btnOSLeft + "px";
    }
  }
  window.addEventListener("mousemove", move);
  window.addEventListener("mouseup", up);
}
function bindEvents() {
  doms.topHint.addEventListener("click", changeChart);
}
main();
