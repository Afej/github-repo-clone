const name = document.querySelector(".name");
const nickname = document.querySelector(".nickname");
const bio = document.querySelector(".profile-bio");
const userAvatars = document.querySelectorAll(".avatar-user");
const followers = document.querySelector(".followers");
const following = document.querySelector(".following");
const stars = document.querySelector(".stars");
const xlocation = document.querySelector(".location");
const totalRepos = document.querySelectorAll(".total-repos");
const repoContainer = document.querySelector(".repo-list");

// helper function
const formatNumber = (number) => {
  const formattedNumber = new Intl.NumberFormat().format(number);

  return formattedNumber;
};

const getRelativeTime = (updatedAt) => {
  const now = Date.now();
  const then = Date.parse(updatedAt);

  const [nowWeekday, nowMonth, nowDay, nowYear] = new Date(now)
    .toString()
    .split(" ");

  const [thenWeekday, thenMonth, thenDay, thenYear] = new Date(then)
    .toString()
    .split(" ");

  const elapsed = now - then;

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;

  if (elapsed < msPerMinute) {
    const time = Math.round(elapsed / 1000);
    return time + " seconds ago";
  } else if (elapsed < msPerHour) {
    const time = Math.round(elapsed / msPerMinute);
    return time + " minutes ago";
  } else if (elapsed < msPerDay) {
    const time = Math.round(elapsed / msPerHour);
    return `${time} ${time > 1 ? "hours" : "hour"} ago`;
  } else if (elapsed < msPerMonth) {
    const time = Math.round(elapsed / msPerDay);
    return `${time} ${time > 1 ? "days" : "day"} ago`;
  } else {
    return `on ${thenMonth} ${thenDay}${
      thenYear < nowYear ? ", " + thenYear : ""
    }`;
  }
};

// set required field with data
const setReqData = {
  setName(fullname) {
    name.innerText = fullname.trim();
  },
  setNickname(nickname) {
    nickname.innerText = nickname.trim();
  },
  setBio(bio) {
    bio.innerText = bio.trim();
  },
  setAvatarUrl(avatarUrl) {
    for (let avatar of userAvatars) {
      avatar.src = avatarUrl;
    }
  },
  setFollowerCount(count) {
    followers.innerText = count || 0;
  },
  setFollowingCount(count) {
    following.innerText = count || 0;
  },
  setStarredRepo(starsCount) {
    stars.innerText = starsCount || 0;
  },
  setLocation(location) {
    if (!location) return xlocation.parentElement.classList.add("hide");

    xlocation.innerText = location;
  },
  setRepoCount(count) {
    for (let repo of totalRepos) {
      repo.innerText = count;
    }
  },
  setRepositories(repositories) {
    let repoHTML = "";

    repositories.map((repo) => {
      const {
        node: {
          name,
          description,
          forkCount,
          isFork,
          parent,
          stargazerCount,
          pushedAt,
          url,
          primaryLanguage,
        },
      } = repo;

      const {
        url: parentUrl,
        nameWithOwner: parentNameWithOwner,
        name: parentName,
        forkCount: parentForkCount,
        stargazerCount: parentStargazerCount,
      } = parent ?? {};

      repoHTML += `
      <li class="repo-list-item">
        <div class="repo-info-wrapper">
          <h2>
            <a href="${url}" class="repo-title">${name} </a>
          </h2>
          <p class="repo-desc">
          ${
            isFork
              ? `<span>
                Forked from <a href="${parentUrl}"> ${parentNameWithOwner}</a>
                </span>
                `
              : ""
          }
          ${description ? description : ""}
          </p>
          <div class="repo-stats">
            <span class="language ${primaryLanguage ? "" : "hide"}">
              <span class="language-color" style="background: ${
                primaryLanguage ? primaryLanguage.color : ""
              }">
              </span>
              ${primaryLanguage ? primaryLanguage.name : ""}
            </span>

            <span class="times-forked ${
              isFork ? (parentForkCount ? "" : "hide") : forkCount ? "" : "hide"
            }">
              <svg
                aria-label="fork"
                class=""
                viewBox="0 0 16 16"
                width="16"
                height="16"
                role="img"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
                ></path>
              </svg>
              ${
                isFork ? formatNumber(parentForkCount) : formatNumber(forkCount)
              }
              </span>

              <span class="times-starred ${
                isFork
                  ? parentStargazerCount
                    ? ""
                    : "hide"
                  : stargazerCount
                  ? ""
                  : "hide"
              }">
              <svg
                aria-label="star"
                class=""
                viewBox="0 0 16 16"
                width="16"
                height="16"
                role="img"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                ></path>
              </svg>
              ${
                isFork
                  ? formatNumber(parentStargazerCount)
                  : formatNumber(stargazerCount)
              }
            </span>

            <span class="updated-at">
              Updated <span class="relative-time"> ${getRelativeTime(
                pushedAt
              )}</span>
            </span>
          </div>
        </div>

        <div class="repo-btn-wrapper">
          <button class="btn star-repo">
            <svg
              class=""
              viewBox="0 0 16 16"
              width="16"
              height="16"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
              ></path>
            </svg>
            Star
          </button>
        </div>
      </li>
      `;
      repoContainer.innerHTML = repoHTML;
    });
  },
};

const populateUI = (user) => {
  const {
    avatarUrl,
    bio,
    followers: { totalCount: followersCount },
    following: { totalCount: followingCount },
    name,
    repositories: { totalCount: repoCount, edges: repositories },
    starredRepositories: { totalCount: starredReposCount },
    login,
    location,
  } = user;

  setReqData.setName(name);
  setReqData.setNickname(login);
  setReqData.setBio(bio);
  setReqData.setAvatarUrl(avatarUrl);
  setReqData.setFollowerCount(followersCount);
  setReqData.setFollowingCount(followingCount);
  setReqData.setStarredRepo(starredReposCount);
  setReqData.setLocation(location);
  setReqData.setRepoCount(repoCount);
  setReqData.setRepositories(repositories);
};
