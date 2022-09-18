import { add } from "./classes.js";
let page = document.body.dataset.page;
let navLinks = [...document.querySelectorAll("nav a")];
let bars = document.querySelector(".bars");
let app = new add();
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
  techOrCrewFill(page);
}
// navbar events
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    let active = navLinks.find((ele) => ele.classList.contains("active"));
    if (active !== e.currentTarget) {
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

      // fill crew or tech page
      techOrCrewFill(page);
    }
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
tabs.forEach(async (tab) => {
  if (tab.classList.contains("active")) {
    app.choosed = tab.dataset.dest;
    app.destination();
  }
  tab.addEventListener("click", (e) => {
    tabs.forEach((tab) => tab.classList.remove("active"));
    e.currentTarget.classList.add("active");
    app.choosed = e.currentTarget.dataset.dest;
    app.destination();
  });
});

function techOrCrewFill(page) {
  let controller;
  let sliders;
  techOrCrewEmpty();
  if (page.toLowerCase() === "technology") {
    controller = app.technology();
    sliders = [...document.querySelectorAll(".technology .slider-2 li")];
  } else if (page.toLowerCase() === "crew") {
    controller = app.crew();
    sliders = [...document.querySelectorAll(".crew .slider-1 li")];
  }

  if (controller) {
    controller.then(() => {
      let boxes = [
        ...document.querySelectorAll(`.${page} [data-name]:not(li)`),
      ];
      slideFunc(boxes, sliders, page);
    });
  }
}

function techOrCrewEmpty() {
  let content = [
    document.querySelector(".crew .info-cont"),
    document.querySelector(".technology .content .tech"),
  ];
  let imgCont = [
    document.querySelector(".crew .img"),
    document.querySelector(".technology .right"),
  ];
  [...content, ...imgCont].forEach((ele) => (ele.innerHTML = ""));
  app = null;
  app = new add();
}

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
