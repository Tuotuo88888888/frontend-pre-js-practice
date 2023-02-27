document.addEventListener("DOMContentLoaded", function () {
  var provincial = document.getElementById("provincial");
  var city = document.getElementById("city");
  var school = document.getElementById("school");

  function init() {
    initEvent();
    initBulidElement();
  }
  function initEvent() {
    provincial.addEventListener("change", provincialChangeHandler);
    city.addEventListener("change", cityChangeHandler);
    school.addEventListener("change", schoolChangeHandler);
  }
  function initBulidElement() {
    bindSelection(provincial, AllSchool, function (option, item) {
      option.innerText = option.value = item[0];
    });
    bindSelection(
      city,
      AllSchool[0].slice(1, AllSchool[0].length),
      function (option, item) {
        option.innerText = option.value = item[0];
      }
    );
    bindSelection(school, AllSchool[0][1][1], function (option, item) {
      option.innerText = option.value = item;
    });
  }
  function provincialChangeHandler() {
    var cityArr = AllSchool[provincial.selectedIndex];
    bindSelection(
      city,
      cityArr.slice(1, cityArr.length),
      function (option, item) {
        option.innerText = option.value = item[0];
      }
    );
    bindSelection(school, cityArr[1][1], function (option, item) {
      option.innerText = option.value = item;
    });
  }
  function cityChangeHandler() {
    bindSelection(
      school,
      AllSchool[provincial.selectedIndex][city.selectedIndex + 1][1],
      function (option, item) {
        option.innerText = option.value = item;
      }
    );
  }
  function schoolChangeHandler() {}
  function bindSelection(element, optionArray, optionCallback) {
    element.innerHTML = "";
    var options = document.createDocumentFragment();
    for (var i = 0; i < optionArray.length; i++) {
      var option = document.createElement("option");
      optionCallback(option, optionArray[i]);
      options.append(option);
    }
    element.append(options);
  }
  init();
});
