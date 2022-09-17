import { add } from "./classes.js";
let page = document.body.dataset.page;
let navLinks = [...document.querySelectorAll("nav a")];
let bars = document.querySelector(".bars");

if (localStorage["page"]) {
  page = localStorage["page"];
  navLinks.forEach((ele) => {
    if (ele.dataset.page === page) {
      ele.classList.add("active");
    } else {
      ele.classList.remove("active");
    }
  });
  document.body.dataset.page = page;
}
// navbar events
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    // change active class
    navLinks.forEach((a) => {
      a.classList.remove("active");
    });
    e.currentTarget.classList.add("active");

    // change page
    page = e.currentTarget.dataset.page;
    document.body.dataset.page = page;

    // remove active class from bars to hide nav
    if (bars.classList.contains("active")) {
      bars.classList.remove("active");
    }

    // add to localstorage
    localStorage["page"] = page;
  });
});

// show nav on click on burger icon
bars.querySelector(".burger").addEventListener("click", (e) => {
  e.stopPropagation();
  bars.classList.add("active");
});

// close nav on click on close icon
bars.querySelector(".close").addEventListener("click", (e) => {
  e.stopPropagation();
  bars.classList.remove("active");
});

// change page content on tab change
let tabs = [...document.querySelectorAll(".tabs li")];
tabs.forEach((tab) => {
  if (tab.classList.contains("active")) {
    let addApp = new add(tab.dataset.dest);
    addApp.destination();
  }
  tab.addEventListener("click", (e) => {
    tabs.forEach((tab) => tab.classList.remove("active"));
    e.currentTarget.classList.add("active");
    let addApp = new add(e.currentTarget.dataset.dest);
    addApp.destination();
  });
});

//fill page content on crew page
let sliders = [...document.querySelectorAll(".crew .slider-1 li")];
let crewApp = new add();
let crew = crewApp.crew();
crew.then(() => {
  let boxes = [...document.querySelectorAll(".crew :is(.box,.img img)")];
  slideFunc(boxes, sliders, "crew");
});

// fill page content of technology page
let techApp = new add();
let tech = techApp.technology();
let sliders2 = [...document.querySelectorAll(".technology .slider-2 li")];
tech.then(() => {
  let boxes = [...document.querySelectorAll(".technology .box")];
  slideFunc(boxes, sliders2, "technology");
});

function slideFunc(boxes, sliders, page) {
  sliders.forEach((slide) => {
    if (slide.classList.contains("active")) {
      let data = document.querySelectorAll(
        `.${page} [data-name="${slide.dataset.name}"]:not(li)`
      );
      data.forEach((ele) => ele.classList.add("showed"));
    }
    slide.addEventListener("click", (e) => {
      showData(e.currentTarget, boxes, sliders);
    });
  });
  let start;
  let section = document.querySelector(`.${page}`);
  section.addEventListener("touchstart", (e) => {
    start = e.changedTouches[0].screenX;
  });
  section.addEventListener("touchend", (e) => {
    let active = sliders.indexOf(
      sliders.find((ele) => ele.classList.contains("active"))
    );
    if (e.changedTouches[0].screenX < start) {
      if (active < sliders.length - 1) {
        showData(sliders[active + 1], boxes, sliders);
      }
    } else if (e.changedTouches[0].screenX > start) {
      if (active > 0) {
        showData(sliders[active - 1], boxes, sliders);
      }
    }
  });
}

function showData(slide, boxes, sliders) {
  sliders.forEach((ele) => ele.classList.remove("active"));
  slide.classList.add("active");
  boxes.forEach((box) => {
    box.classList.remove("showed");
    if (box.id == slide.id) {
      box.classList.remove("slided");
      box.classList.add("showed");
    } else if (box.id < slide.id) {
      box.classList.add("slided");
    } else if (box.id > slide.id) {
      box.classList.remove("slided");
    }
  });
}
