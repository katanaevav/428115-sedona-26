var search_button = document.querySelector(".search-button");
var search_popup = document.querySelector(".modal-search");
var isShowing = false;

var start_date = document.querySelector("[name=start-date]");
var end_date = document.querySelector("[name=end-date]");
var adults = document.querySelector("[name=adults]");
var children = document.querySelector("[name=children]");

var search_form = document.querySelector(".search-form");

search_popup.classList.add("search-form-hide");

var isStorageSupport = true;
var storageAdults = "";
var storageChildren = "";

try {
  storageAdults = localStorage.getItem("adults");
  storageChildren = localStorage.getItem("children");
} 

catch (err) {
  isStorageSupport = false;
}

search_button.addEventListener("click", function() {
  if (isShowing) {
    search_popup.classList.add("search-form-hide");
    if (search_popup.classList.contains("search-form-show")) {
      search_popup.classList.remove("search-form-show");
    }
    isShowing = false;
  }
  else {
    if (search_popup.classList.contains("search-form-hide")) {
      search_popup.classList.remove("search-form-hide");
    }
    search_popup.classList.add("search-form-show");
    isShowing = true;

    if (storageAdults) {
      adults.value = storageAdults;
    }

    if (storageChildren) {
      children.value = storageChildren;
    }

    start_date.focus();
  }
});

search_form.addEventListener("submit", function(evt) {  
  if (!start_date.value || !end_date.value || !adults.value || !children.value) {
    evt.preventDefault();
    if (search_popup.classList.contains("search-form-show")) {
      search_popup.classList.remove("search-form-show");
    }
    search_popup.classList.add("modal-error");
    console.log("Форма поиска гостиницы не заполнена");
    setTimeout(function() {search_popup.classList.remove("modal-error")}, 800);
  }
  else {
    if (isStorageSupport) {
      localStorage.setItem("adults", adults.value);
      localStorage.setItem("children", children.value);
    }
  }
});