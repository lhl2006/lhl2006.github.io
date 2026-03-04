(function () {
  const body = document.body;
  const navToggle = document.querySelector(".nav-toggle");

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      body.classList.toggle("nav-open", !expanded);
    });
  }

  const page = body.getAttribute("data-page");
  const links = document.querySelectorAll(".site-nav a[data-page]");

  links.forEach((link) => {
    if (link.getAttribute("data-page") === page) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      if (!body.classList.contains("nav-open")) {
        return;
      }

      body.classList.remove("nav-open");
      if (navToggle) {
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820 && body.classList.contains("nav-open")) {
      body.classList.remove("nav-open");
      if (navToggle) {
        navToggle.setAttribute("aria-expanded", "false");
      }
    }
  });

  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((item) => item.classList.remove("is-active"));
      btn.classList.add("is-active");
    });
  });

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry, index) => {
          if (!entry.isIntersecting) {
            return;
          }

          setTimeout(() => {
            entry.target.classList.add("is-visible");
          }, index * 50);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }
})();
