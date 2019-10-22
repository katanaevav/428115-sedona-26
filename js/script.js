var searchButton = document.querySelector(".search-button");
var searchPopup = document.querySelector(".modal-search");
var isShowing = false;
var startDate = document.querySelector("[name=start-date]");
var endDate = document.querySelector("[name=end-date]");
var adults = document.querySelector("[name=adults]");
var children = document.querySelector("[name=children]");
var searchForm = document.querySelector(".search-form");
var isStorageSupport = true;
var storageAdults = "";
var storageChildren = "";
var TIMEOUT = 800;

searchPopup.classList.add("search-form-hide");

try {
  storageAdults = localStorage.getItem("adults");
  storageChildren = localStorage.getItem("children");
} catch (err) {
  isStorageSupport = false;
}

searchButton.addEventListener("click", function() {
  if (isShowing) {
    searchPopup.classList.add("search-form-hide");
    if (searchPopup.classList.contains("search-form-show")) {
      searchPopup.classList.remove("search-form-show");
    }
    isShowing = false;
  }
  else {
    if (searchPopup.classList.contains("search-form-hide")) {
      searchPopup.classList.remove("search-form-hide");
    }
    searchPopup.classList.add("search-form-show");
    isShowing = true;
    if (storageAdults) {
      adults.value = storageAdults;
    }
    if (storageChildren) {
      children.value = storageChildren;
    }
    startDate.focus();
  }
});

searchForm.addEventListener("submit", function(evt) {  
  if (!startDate.value || !endDate.value || !adults.value || !children.value) {
    evt.preventDefault();
    if (searchPopup.classList.contains("search-form-show")) {
      searchPopup.classList.remove("search-form-show");
    }
    searchPopup.classList.add("modal-error");
    console.log("Форма поиска гостиницы не заполнена");
    setTimeout(function() {searchPopup.classList.remove("modal-error")}, TIMEOUT);
  }
  else if (isStorageSupport) {
      localStorage.setItem("adults", adults.value);
      localStorage.setItem("children", children.value);
  }
});