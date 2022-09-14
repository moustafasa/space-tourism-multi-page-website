let page = document.body.dataset.page;
let navLinks = [...document.querySelectorAll("nav a")];
let bars = document.querySelector(".bars");

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
