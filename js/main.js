const toggler = document.getElementById("toggler");

toggler.addEventListener("click", () => {
  document.querySelector(".header-search-nav").classList.toggle("show");
});
