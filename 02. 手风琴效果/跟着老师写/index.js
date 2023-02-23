(function () {
  var totalMS = 500;
  var menuList = document.querySelectorAll(".menu h2");
  for (var i = 0; i < menuList.length; i++) {
    menuList[i].addEventListener("click", function () {
      var statusOpened = document.querySelector(".submenu[status=opened]");
      if (statusOpened) {
        closeSubmenu(statusOpened);
      }
      toggleSubMenu(this.nextElementSibling);
    });
  }
  function openSubmenu(subMenu) {
    var status = subMenu.getAttribute("status");
    if (status && status !== "closed") {
      return;
    }
    subMenu.setAttribute("status", "playing");
    createAnimation({
      from: 0,
      to: subMenu.scrollHeight,
      totalMS: totalMS,
      onmove(e) {
        subMenu.style.height = e + "px";
      },
      onend() {
        subMenu.setAttribute("status", "opened");
      },
    });
  }
  function closeSubmenu(subMenu) {
    var status = subMenu.getAttribute("status");
    if (status !== "opened") {
      return;
    }
    subMenu.setAttribute("status", "playing");
    createAnimation({
      from: subMenu.scrollHeight,
      to: 0,
      totalMS: totalMS,
      onmove(e) {
        subMenu.style.height = e + "px";
      },
      onend() {
        subMenu.setAttribute("status", "closed");
      },
    });
  }
  function toggleSubMenu(subMenu) {
    var status = subMenu.getAttribute("status");
    if (status === "playing") {
      return;
    } else if (status === "opened") {
      closeSubmenu(subMenu);
    } else {
      openSubmenu(subMenu);
    }
  }
})();
