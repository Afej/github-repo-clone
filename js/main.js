const toggler = document.getElementById("toggler");
const miniProfile = document.querySelector(".sub-profile");
const mainProfile = document.querySelector(".profile-wrapper .profile-names");

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= -15 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

toggler.addEventListener("click", () => {
  document.querySelector(".header-search-nav").classList.toggle("show");
});

window.addEventListener("scroll", () => {
  isInViewport(mainProfile)
    ? (miniProfile.style.display = "none")
    : (miniProfile.style.display = "block");
});
