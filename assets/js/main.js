const header = document.querySelector("[data-site-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const menuLabel = document.querySelector("[data-menu-label]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const currentYear = document.querySelector("[data-current-year]");

const syncHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

const setMenuState = (isOpen) => {
  if (!menuButton || !mobileMenu) return;

  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Fechar menu principal" : "Abrir menu principal");
  mobileMenu.classList.toggle("hidden", !isOpen);

  if (menuLabel) {
    menuLabel.textContent = isOpen ? "Fechar menu" : "Abrir menu";
  }
};

const markActiveLinks = () => {
  const path = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    const isActive =
      (path === "" && href === "index.html") ||
      (path === "index.html" && href === "index.html") ||
      href === path;

    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

if (menuButton) {
  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    setMenuState(!isExpanded);
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      setMenuState(false);
    }
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    setMenuState(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuState(false);
  }
});

window.addEventListener("scroll", syncHeaderState, { passive: true });

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

syncHeaderState();
setMenuState(false);
markActiveLinks();
