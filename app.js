const searchInput = document.getElementById("search-bar");
const searchBar = document.querySelector("navContainer__search-bar");
const menuBtn = document.querySelector(".navContainer__button--menu");
const notificationBtn = document.querySelector("#notification");
const menuDropdown = document.querySelector(".main-menu");
const notficationDropdown = document.querySelector(".notification-menu");
const menuItems = document.querySelectorAll(".menu-item");
const closePopupBtn = document.querySelector("#close-popup");
const planPopup = document.querySelector("#plan");
const caretBtn = document.querySelector("#caret");
const mainCard = document.querySelector("#main");
const caretBtnImg = document.querySelector("#caret_img");
const allOnboardingTitles = document.querySelectorAll(".onboardingStep__title");
const allOnboardingSteps = document.querySelectorAll(".onboardingStep");
const onboardingSection = document.querySelector(".mainCard__container--body");
const onboardingTick = document.querySelectorAll(".onboardingTick");
const progressBarStatus = document.querySelector(".barStatus");
const progressText = document.getElementById("progress");
const svgCircle = document.querySelectorAll(".svgCircle");
const spinners = document.querySelectorAll(".spinner");

let completedSteps = 0;
const changeColor = () => {
  searchBar.style.border = "2px white solid";
};
const resetColor = () => {
  searchBar.style.border = "1px #616161 solid";
};
const openMainMenu = () => {
  menuDropdown.setAttribute("data-showing", "true");
  menuBtn.style.backgroundColor = "#616161";
  menuBtn.ariaExpanded = "true";
  menuItems.item(0).focus();
};
const closeMainMenu = () => {
  menuDropdown.setAttribute("data-showing", "false");
  menuBtn.ariaExpanded = "false";
  menuBtn.style.backgroundColor = "#322f33";
};
const openNotificationMenu = () => {
  notficationDropdown.setAttribute("data-showing", "true");
  notificationBtn.style.backgroundColor = "#616161";
};
const closeNotificationMenu = () => {
  notficationDropdown.setAttribute("data-showing", "false");
  notificationBtn.style.backgroundColor = "#322f33";
};
menuBtn.addEventListener("click", function () {
  const menuShowing = menuDropdown.dataset.showing;
  if (menuShowing === "false") {
    if (notficationDropdown.dataset.showing === "true") {
      notficationDropdown.setAttribute("data-showing", "false");
      notificationBtn.style.backgroundColor = "#322f33";
      openMainMenu();
    }
    openMainMenu();
  } else {
    closeMainMenu();
  }
});
notificationBtn.addEventListener("click", function () {
  const notficationShowing = notficationDropdown.dataset.showing;
  if (notficationShowing === "false") {
    if (menuDropdown.dataset.showing === "true") {
      closeMainMenu();
      openNotificationMenu();
    }
    openNotificationMenu();
  } else {
    closeNotificationMenu();
  }
});
for (let i = 0; i < menuItems.length; i++) {
  menuItems[i].addEventListener("click", function (e) {
    e.preventDefault();
    window.open("https://admin.shopify.com", "_blank");
  });
}
closePopupBtn.addEventListener("click", () => {
  planPopup.setAttribute("data-popupShowing", "false");
});
const selectPlan = document.querySelectorAll(".mainContainer__popup--button");
selectPlan.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    window.open("https://shopify.com/pricing", "_blank");
  });
});
caretBtn.addEventListener("click", () => {
  const isExpanded = mainCard.dataset.expanded;
  if (isExpanded === "true") {
    caretBtn.ariaExpanded = "false";
    onboardingSection.style.display = "none";
    mainCard.setAttribute("data-expanded", "false");
    caretBtnImg.style.transform = "rotate(180deg)";
  } else {
    caretBtn.ariaExpanded = "true";
    onboardingSection.style.display = "block";
    mainCard.setAttribute("data-expanded", "true");
    caretBtnImg.style.transform = "rotate(360deg)";
  }
});

const closeAllOnboarding = () => {
  allOnboardingSteps.forEach((step) => {
    step.setAttribute("data-max", "false");
    allOnboardingTitles.forEach((title) => {
      title.ariaExpanded = "false";
    });
  });
};
const openSelectedOnboarding = (i) => {
  allOnboardingTitles.item(i).ariaExpanded = "true";
  allOnboardingSteps.item(i).setAttribute("data-max", "true");
};

allOnboardingTitles.forEach((title, i) => {
  title.addEventListener("click", () => {
    closeAllOnboarding();
    openSelectedOnboarding(i);
  });
});
const progress = (action) => {
  if (action == "i") {
    completedSteps++;
    progressBarStatus.style.width = `${20 * completedSteps}px`;
    progressText.innerText = `${completedSteps} / 5 completed`;
  } else {
    completedSteps--;
    progressBarStatus.style.width = `${20 * completedSteps}px`;
    progressText.innerText = `${completedSteps} / 5 completed`;
  }
};

onboardingTick.forEach((tick_btn, i) => {
  tick_btn.addEventListener("click", () => {
    if (allOnboardingSteps.item(i).dataset.selected === "false") {
      spinners.item(i).classList.add("rotate");
      setTimeout(() => {
        tick_btn.style.backgroundImage =
          'url("https://crushingit.tech/hackathon-assets/icon-checkmark-circle.svg")';
        spinners.item(i).classList.remove("rotate");

        progress("i");
      }, 2000);
      allOnboardingSteps.item(i).setAttribute("data-selected", "true");
      svgCircle.item(i).style.display = "none";
      if (i != 4) {
        closeAllOnboarding();
        openSelectedOnboarding(i + 1);
      }
    } else {
      spinners.item(i).classList.remove("rotate");
      tick_btn.style.backgroundImage = "none";
      allOnboardingSteps.item(i).setAttribute("data-selected", "false");
      svgCircle.item(i).style.display = "block";
      progress("d");
    }
  });
});
