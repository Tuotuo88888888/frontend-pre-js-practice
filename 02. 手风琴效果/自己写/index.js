(function () {
  var menuList = document.querySelectorAll(".menu>li");
  for (var i = 0; i < menuList.length; i++) {
    menuList[i].addEventListener("click", function () {
      var than = this;
      var arg = arguments;
      than.removeEventListener("click", arg.callee);
      var submenu = this.querySelector(".submenu");
      var rect = submenu.getBoundingClientRect();
      var height = rect.height;
      var scrollHeight = submenu.scrollHeight;
      var from = height;
      var to = scrollHeight - height;
      createAnimation({
        from: from,
        to: to,
        totalMS: 500,
        onmove(e) {
          submenu.style.height = e + "px";
        },
        onend() {
          than.addEventListener("click", arg.callee);
          // than.dispatchEvent(new CustomEvent("click"));
        },
      });
    });
  }
})();
