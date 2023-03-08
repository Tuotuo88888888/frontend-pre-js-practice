var doms = {
  chartletList: document.querySelector(".chartlet-list"),
  gamebtn: document.querySelector(".gamebtn"),
  gameContent: document.querySelector(".game-content"),
};
var chartletImgCount = 16;
var specialChartlet;
function main() {
  initThought();
}
function initThought() {
  initGameBtn();
  initChartlet();
}
function initChartlet() {
  specialChartlet = Math.floor(Math.random() * chartletImgCount);
  doms.chartletList.innerHTML = "";
  var chartletListContext = document.createDocumentFragment();
  for (let i = 0; i <= 99; i++) {
    var random = Math.floor(Math.random() * chartletImgCount);
    if (i % 9 === 0) {
      random = specialChartlet;
    }
    var itemDiv = document.createElement("div");
    var itemNo = document.createElement("span");
    var itemImg = document.createElement("img");
    itemNo.innerText = i;
    itemImg.src = `./../images/values/${random}.png`;
    itemDiv.append(itemNo, itemImg);
    chartletListContext.appendChild(itemDiv);
  }
  doms.chartletList.appendChild(chartletListContext);
}
function initGameBtn() {
  doms.gameContent.src = "./../images/round.png";
}
main();
