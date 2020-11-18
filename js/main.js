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
    bio
    repositories(privacy: PUBLIC, first: 20, orderBy: {field: CREATED_AT, direction: DESC}) {
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
    status {
      emojiHTML
      emoji
      message
    }
    bio
    createdAt
    twitterUsername
    location
    login
    starredRepositories {
      totalCount
    }
  }
}
`;

const url = "https://api.github.com/graphql";

//  7751f1cda42c112d437e0de43f97bd735ab52f7d

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `bearer 7751f1cda42c112d437e0de43f97bd735ab52f7d`,
  },
  body: JSON.stringify({ query }),
};

fetch(url, options)
  .then((res) => res.json())
  .then((data) => console.log(data))
  // .then(populateUI)
  .catch(console.error);
