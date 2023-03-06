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
  var pageContext = document.createDocumentFragment();
  function createAnchor(className, text, newPage) {
    var a = document.createElement("a");
    a.className = className;
    a.innerText = text;
    a.addEventListener("click", function (e) {
      e.preventDefault();
      if (newPage < 1 || newPage > pageNumber || newPage === page) {
        return;
      }
      createPager({ pageNumber, mostNumber, page: newPage, container });
    });
    pageContext.appendChild(a);
  }
  var min = page - Math.floor(mostNumber / 2);
  var max = min + mostNumber - 1;
  if (min < 1) {
    min = 1;
  }
  if (max > pageNumber) {
    max = pageNumber;
  }
  createAnchor(page == 1 ? "disabled" : "", "首页", 1);
  createAnchor(page == 1 ? "disabled" : "", "上一页", page - 1);
  for (var i = min; i <= max; i++) {
    createAnchor(page == i ? "active" : "", i, i);
  }
  createAnchor(page == pageNumber ? "disabled" : "", "尾页", pageNumber);
  createAnchor(page == pageNumber ? "disabled" : "", "下一页", page + 1);
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
