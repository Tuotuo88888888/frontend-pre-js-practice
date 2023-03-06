function createPager(options) {
  var pageNumber = options.pageNumber || 1;
  var mostNumber = options.mostNumber || 1;
  var page = options.page || 1;
  var container =
    options.container ||
    ((container = document.createElement("div")),
    (container.className = "pager-container"),
    container);

  container.innerHTML = "";
  var min = page - Math.floor(mostNumber / 2);
  var max = min + mostNumber - 1;
  if (min < 1) {
    min = 1;
  }
  if (max > pageNumber) {
    max = pageNumber;
  }
  var pageContext = document.createDocumentFragment();
  var syElement = document.createElement("a");
  syElement.innerText = "首页";
  syElement.className = min == 1 ? "disabled" : "";
  syElement.addEventListener("click", function (e) {
    e.preventDefault();
    createPager({ pageNumber, mostNumber, page: 1, container });
  });
  pageContext.appendChild(syElement);
  var syyElement = document.createElement("a");
  syyElement.innerText = "上一页";
  syyElement.className = page == 1 ? "disabled" : "";
  syyElement.addEventListener("click", function (e) {
    e.preventDefault();
    createPager({ pageNumber, mostNumber, page: page - 1, container });
  });
  pageContext.appendChild(syyElement);
  for (var i = min; i <= max; i++) {
    var pageElement = document.createElement("a");
    pageElement.innerText = i;
    pageElement.className = page == i ? "active" : "";
    (function (i) {
      pageElement.addEventListener("click", function (e) {
        e.preventDefault();
        createPager({ pageNumber, mostNumber, page: i, container });
      });
    })(i);
    pageContext.appendChild(pageElement);
  }
  var wyElement = document.createElement("a");
  wyElement.innerText = "尾页";
  wyElement.className = max == pageNumber ? "disabled" : "";
  wyElement.addEventListener("click", function (e) {
    e.preventDefault();
    createPager({ pageNumber, mostNumber, page: pageNumber, container });
  });
  pageContext.appendChild(wyElement);
  var xyyElement = document.createElement("a");
  xyyElement.innerText = "下一页";
  xyyElement.className = page == pageNumber ? "disabled" : "";
  xyyElement.addEventListener("click", function (e) {
    e.preventDefault();
    createPager({ pageNumber, mostNumber, page: page + 1, container });
  });
  pageContext.appendChild(xyyElement);
  var span = document.createElement("span");
  span.innerText = page + "/" + pageNumber;
  pageContext.appendChild(span);
  container.appendChild(pageContext);
  return container;
}
createPager({
  pageNumber: 50,
  mostNumber: 10,
  page: 13,
  container: document.querySelector(".pager-container"),
});
