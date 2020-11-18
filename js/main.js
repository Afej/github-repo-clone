const toggler = document.getElementById("toggler");
const miniProfile = document.querySelector(".sub-profile");
const mainProfile = document.querySelector(".profile-wrapper .profile-names");

// debounce function
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

// check if an element is in viewport
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

// Event listeners
toggler.addEventListener("click", () => {
  document.querySelector(".header-search-nav").classList.toggle("show");
});

window.addEventListener("scroll", () => {
  isInViewport(mainProfile)
    ? (miniProfile.style.display = "none")
    : (miniProfile.style.display = "block");
});

// graphql query
let query = `{
  user(login: "afej") {
    avatarUrl
    name
    following {
      totalCount
    }
    followers {
      totalCount
    }
    repositories(privacy: PUBLIC, first: 20, orderBy: {field: UPDATED_AT, direction: DESC}) {
      edges {
        node {
          name
          watchers {
            totalCount
          }
          url
          description
          stargazerCount
          forkCount
          licenseInfo {
            name
            nickname
            url
          }
          primaryLanguage {
            name
            color
          }
          pushedAt
          parent {
            url
            name
            nameWithOwner
            forkCount
            stargazerCount
          }
          isFork
        }
      }
      totalCount
    }
    bio
    createdAt
    location
    login
    starredRepositories {
      totalCount
    }
  }
}
`;

const url = "https://api.github.com/graphql";

const token = "Nzc1MWYxY2RhNDJjMTEyZDQzN2UwZGU0M2Y5N2JkNzM1YWI1MmY3ZA==";

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `bearer ${atob(token)}`,
  },
  body: JSON.stringify({ query }),
})
  .then((res) => res.json())
  .then((data) => populateUI(data.data.user))
  .catch(console.error);
