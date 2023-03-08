var doms = {
  chartletList: document.querySelector(".chartlet-list"),
  gamebtn: document.querySelector(".gamebtn"),
  gameCentrePoint: document.querySelector(".game-centre-point"),
  gameContent: document.querySelector(".game-content"),
};
var chartletImgCount = 16;
var specialChartlet;
var isGameOver = false;
function main() {
  initThought();
  bindEvents();
}
function initThought() {
  specialChartlet = Math.floor(Math.random() * chartletImgCount);
  doms.chartletList.innerHTML = "";
  var chartletListContext = document.createDocumentFragment();
  for (let i = 0; i <= 99; i++) {
    var random = Math.floor(Math.random() * chartletImgCount);
    if (i % 9 === 0) {
      random = specialChartlet;
    }
    var itemDiv = document.createElement("div");
    itemDiv.className = "item";
    var itemNo = document.createElement("span");
    var itemImg = document.createElement("img");
    itemNo.innerText = i;
    itemImg.src = `./../images/values/${random}.png`;
    itemDiv.append(itemNo, itemImg);
    chartletListContext.appendChild(itemDiv);
  }
  doms.chartletList.appendChild(chartletListContext);
  doms.gameContent.src = `./../images/values/${specialChartlet}.png`;
  doms.gameContent.style.opacity = 0;
  doms.gameCentrePoint.style.opacity = 1;
}
function bindEvents() {
  doms.gamebtn.addEventListener("click", game);
}
function game() {
  if (!isGameOver) {
    doms.gamebtn.removeEventListener("click", game);
    doms.gamebtn.style.transition = "all 2s ease-out";
    doms.gamebtn.style.transform = "rotate(1800deg)";
    doms.gamebtn.addEventListener("transitionend", function () {
      doms.gamebtn.style.transition = "none";
      doms.gameCentrePoint.style.opacity = 0;
      doms.gameContent.style.opacity = 1;
      this.removeEventListener("transitionend", arguments.callee);
      doms.gamebtn.addEventListener("click", game);
    });
    isGameOver = true;
  } else {
    if (window.confirm("你确定要继续吗？")) {
      doms.gamebtn.style = "";
      initThought();
      isGameOver = false;
    }
  }
}
main();
