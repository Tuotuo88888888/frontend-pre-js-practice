document.addEventListener("DOMContentLoaded", function () {
  var provincialDOM = document.getElementById("provincial");
  var cityDOM = document.getElementById("city");
  var schoolDOM = document.getElementById("school");

  function init() {
    initEvent();
    initBulidElement();
  }
  function initEvent() {
    provincialDOM.addEventListener("change", provincialChangeHandler);
    cityDOM.addEventListener("change", cityChangeHandler);
    schoolDOM.addEventListener("change", schoolChangeHandler);
  }
  function initBulidElement() {
    bindSelection(provincialDOM, province, function (option, item, key) {
      option.value = key;
      option.innerText = item;
    });
    bindSelection(
      cityDOM,
      city[provincialDOM.value],
      function (option, item, key) {
        option.value = key;
        option.innerText = item;
      }
    );
    bindSelection(
      schoolDOM,
      allschool[cityDOM.value],
      function (option, item, key) {
        option.value = key;
        option.innerText = item;
      }
    );
  }
  function provincialChangeHandler() {
    bindSelection(
      cityDOM,
      city[provincialDOM.value],
      function (option, item, key) {
        option.value = key;
        option.innerText = item;
      }
    );
    bindSelection(
      schoolDOM,
      allschool[cityDOM.value],
      function (option, item, key) {
        option.value = key;
        option.innerText = item;
      }
    );
  }
  function cityChangeHandler() {
    bindSelection(
      schoolDOM,
      allschool[cityDOM.value],
      function (option, item, key) {
        option.value = key;
        option.innerText = item;
      }
    );
  }
  function schoolChangeHandler() {}
  function bindSelection(element, optionObject, optionCallback) {
    element.innerHTML = "";
    var options = document.createDocumentFragment();
    for (var key in optionObject) {
      var option = document.createElement("option");
      optionCallback(option, optionObject[key] || key, key);
      options.append(option);
    }
    element.append(options);
  }
  init();
});
