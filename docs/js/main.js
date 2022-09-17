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

//fill page content on slider-1
let sliders = [...document.querySelectorAll(".crew .slider-1 li")];
let crewApp = new add();
let crew = crewApp.crew();
let boxes;
crew.then(() => {
  boxes = [...document.querySelectorAll(".crew :is(.box,.img img)")];
  sliders.forEach((slide) => {
    // show active slide
    if (slide.classList.contains("active")) {
      // show active member data
      let data = document.querySelectorAll(
        `.crew :is(img,.box)[data-name='${slide.dataset.name}']`
      );
      data.forEach((ele) => ele.classList.add("showed"));
    }
    // change data on click on slider
    slide.addEventListener("click", (ev) => {
      showData(ev.currentTarget);
    });
  });

  // change data with slide on touchphones
  let start;
  document.body.addEventListener("touchstart", (e) => {
    // get first touch event
    start = e.changedTouches[0].screenX;
  });
  document.body.addEventListener("touchend", (e) => {
    let active = sliders.indexOf(
      sliders.find((ele) => ele.classList.contains("active"))
    );
    if (e.changedTouches[0].screenX > start) {
      if (active < sliders.length - 1) {
        showData(sliders[active + 1]);
      }
    } else if (e.changedTouches[0].screenX < start) {
      if (active > 0) {
        showData(sliders[active - 1]);
      }
    }
  });
});

function showData(slide) {
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
