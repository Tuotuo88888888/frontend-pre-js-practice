(function () {
  var doms = {
    container: document.querySelector(".container"),
  };
  var fluidObserver = new FluidObserver();
  var imgCount = 41;
  function init() {
    initPage();
    initEvents();
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
    doms.container.clientWidth;
  }
  function initEvents() {
    // window.addEventListener("resize", buffet(layout, 1000));
    window.addEventListener("load", function () {
      layout();
      layout();
      fluidObserver.observe();
    });
  }
  function buffet(fn, delay) {
    var tempId = null;
    return function () {
      var that = this;
      var ags = Array.prototype.slice.call(arguments);
      if (tempId) {
        clearTimeout(tempId);
        tempId = null;
      }
      tempId = setTimeout(function () {
        fn.call(that, ags);
      }, delay);
    };
  }
  function layout() {
    var fluidDoms = Array.prototype.slice.call(doms.container.children);
    var containerWidth = doms.container.clientWidth;
    var fluidWidth = (fluidDoms[0] || { offsetWidth: containerWidth })
      .offsetWidth;
    var cloumnCount = Math.floor(containerWidth / fluidWidth);
    var residualWidth = containerWidth % fluidWidth;
    var columnPitch = residualWidth / (cloumnCount + 1);
    var cloumnCurHeightArr = new Array(cloumnCount).fill(0);

    fluidDoms.forEach((element, i) => {
      var cloumnIndex = cloumnCurHeightArr.indexOf(
        Math.min.apply(null, cloumnCurHeightArr)
      );
      element.style.top = cloumnCurHeightArr[cloumnIndex] + "px";
      element.style.left =
        columnPitch + (columnPitch + fluidWidth) * cloumnIndex + "px";
      cloumnCurHeightArr[cloumnIndex] += element.offsetHeight + columnPitch;
    });
    doms.container.style.height =
      Math.max.apply(null, cloumnCurHeightArr) + "px";
  }
  function FluidObserver() {
    var targetNode = doms.container;
    var _callback = buffet(layout, 500);
    var rObserver = new ResizeObserver(_callback);
    var mObserver = new MutationObserver(_callback);
    this.observe = function () {
      rObserver.observe(targetNode);
      mObserver.observe(targetNode, { childList: true });
    };
    this.disconnect = function () {
      rObserver.disconnect();
      mObserver.disconnect();
    };
  }
  init();
})();
