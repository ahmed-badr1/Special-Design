// Functions

function checkLocalStorage(storedValue, target) {}
const toggleActiveItem = (allTargets, goal) => {
  allTargets.forEach((ele) => ele.classList.remove("active"));
  goal.classList.add("active");
}

// Check if there's color in local storage
let mainColor = window.localStorage.getItem("color_option");
const colorItems = document.querySelectorAll(".colors-list li");

if (mainColor) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  toggleActiveItem(colorItems, document.querySelector(`[data-color="${mainColor}"]`))
}

// Switch and Style Colors List in Setting Box
colorItems.forEach((item) => {
  item.style.setProperty("background-color", item.dataset.color);

  item.addEventListener("click", (event) => {
    document.documentElement.style.setProperty("--main-color", event.target.dataset.color);

    localStorage.setItem("color_option", event.target.dataset.color);

    toggleActiveItem(colorItems, event.target);
  });
});

// Control the background image switching & display the pages
const randomBackGroundOptions = document.querySelectorAll(".random-backgrounds button");
let randomImg = true;
let backgroundSetInterval;

// Check if there's option for background in local storage
let backgroundOption = window.localStorage.getItem("background_option");

if (backgroundOption) {
  backgroundOption === "yes" ? (randomImg = true) : (randomImg = false);

  toggleActiveItem(
    randomBackGroundOptions,
    document.querySelector(`[data-background="${backgroundOption}"]`)
  );
}

randomBackGroundOptions.forEach((item) => {
  item.addEventListener("click", (event) => {
    toggleActiveItem(randomBackGroundOptions, event.target);

    if (event.target.dataset.background === "yes") {
      randomImg = true;
      localStorage.setItem("background_option", "yes");
      clearInterval(backgroundSetInterval);
      randomizeImgs();
    } else {
      randomImg = false;
      localStorage.setItem("background_option", "no");
      clearInterval(backgroundSetInterval);
    }
  });
});

// Control the appearance of bullets
const bulletsOptions = document.querySelectorAll(".bullets-option button");
const bullets = document.querySelector("main .bullets");

// Check if there's option for background in local storage
let localBulletsOption = window.localStorage.getItem("bullets_option");

if (localBulletsOption) {
  bullets.style.display = localBulletsOption;

  toggleActiveItem(bulletsOptions, document.querySelector(`[data-display="${localBulletsOption}"]`))
}

bulletsOptions.forEach((item) => {
  item.addEventListener("click", (event) => {
    toggleActiveItem(bulletsOptions, event.target);

    if (item.dataset.display === "block") {
      localStorage.setItem("bullets_option", item.dataset.display);
      bullets.style.display = item.dataset.display;
    } else {
      localStorage.setItem("bullets_option", item.dataset.display);
      bullets.style.display = item.dataset.display;
    }
  });
});

// Reset ALl Options in Local Storage
const ResetBtn = document.querySelector(
  ".settings .settings-container .reset-options"
);

ResetBtn.onclick = () => {
  localStorage.removeItem("bullets_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("color_option");
  window.location.reload();
};

// Change Landing Page
const landingPage = document.querySelector(".landing");


function randomizeImgs() {
  if (randomImg) {
    backgroundSetInterval = setInterval(() => {
      let randomNum = Math.ceil(Math.random() * 5);
      landingPage.style.backgroundImage = `url(imgs/0${randomNum}.jpg)`;
    }, 6000);
  }
}

randomizeImgs();

// Open Setting Box
document.querySelector(".settings .settings-gear").onclick = function () {
  this.firstElementChild.classList.toggle("fa-spin");
  this.parentElement.classList.toggle("open");
};

// Style Skills progress with Animation
const progLevel = document.querySelectorAll("#skills .skill-box .progress");

window.onscroll = function () {
  if (scrollY > skills.scrollHeight) {
    progLevel.forEach((item) => {
      let span = item.firstElementChild;
      span.style.width = span.dataset.progress;
    });
  }
};

// Gallery Popup
const ourGallery = document.querySelectorAll("#gallery img");

ourGallery.forEach((item) => {
  item.addEventListener("click", (event) => {
    // overlay
    const overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    // Popup Box
    const popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    const popupImg = document.createElement("img");
    popupImg.src = event.target.src;

    if (event.target.alt) {
      const imgHeading = document.createElement("h3");
      const imgText = document.createTextNode(event.target.alt);

      imgHeading.appendChild(imgText);

      popupBox.appendChild(imgHeading);
    }

    popupBox.appendChild(popupImg);
    document.body.appendChild(popupBox);

    // Close Popup Button
    const closeButton = document.createElement("div");
    closeButton.role = "button";
    closeButton.className = "close-button";

    const closeButtonText = document.createTextNode("X");
    closeButton.appendChild(closeButtonText);

    popupBox.appendChild(closeButton);
  });
});

// Close Popup
document.addEventListener("click", (e) => {
  if (e.target.className === "close-button") {
    e.target.parentElement.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

// Apper More image in Gallery
const showMore = document.querySelector("#gallery .more");

showMore.addEventListener("click", (e) => {
  const moreImgs = document.querySelector("#gallery .container .more-imgs");
  console.log(moreImgs);

  if (!moreImgs.classList.contains("non-collapsible")) {
    moreImgs.classList.add("non-collapsible");
    showMore.innerHTML = "Show Less";
  } else {
    moreImgs.classList.remove("non-collapsible");
    showMore.innerHTML = "Show More";
  }

  e.target.classList.toggle("active");
});

// Moving To Sections By Bullets & header
const headerTabs = document.querySelectorAll("header .links a");
const bulletsLis = document.querySelectorAll(".bullets ul li");

function moveToSection(element) {
  element.forEach((item) =>
    item.addEventListener("click", (e) =>
      document
        .querySelector(e.target.dataset.section)
        .scrollIntoView({ behavior: "smooth" })
    )
  );
}

moveToSection(headerTabs);
moveToSection(bulletsLis);

// Open Header Menu
const headerBtn = document.querySelector("header nav button");
const headerLinks = document.querySelector("header nav .links");

headerLinks.onclick = e => e.stopPropagation();
headerBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  headerLinks.classList.toggle("open");
});

document.addEventListener("click", (e) => {
  if (e.target !== headerBtn && e.target !== headerLinks) {
    if (headerLinks.classList.contains("open")) {
      headerLinks.classList.remove("open");
    }
  }
})

// Set Year Automatic

const footerYear = document.querySelector("footer .year");

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

let year = document.createTextNode(currentYear);
footerYear.appendChild(year);