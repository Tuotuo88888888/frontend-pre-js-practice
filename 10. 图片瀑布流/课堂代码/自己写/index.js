var doms = {
  container: document.querySelector(".container"),
};
var imgCount = 41;
function init() {
  initPage();
}
function initPage() {
  var containerFluidContext = document.createDocumentFragment();
  for (let i = 0; i < imgCount; i++) {
    var containerFluid = document.createElement("img");
    containerFluid.src = "./../img/" + i + ".jpg";
    containerFluid.className = "container-fluid";
    containerFluidContext.appendChild(containerFluid);
  }
  doms.container.appendChild(containerFluidContext);
}
init();
