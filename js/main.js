import config from "./config.js?v=4";
import {PRODUCTOS, CATS, Q, SHAPES, CAT2PIEZA} from "./data/products.js?v=4";
import Model from "./mvc/Model.js?v=4";
import View from "./mvc/View.js?v=4";
import Controller from "./mvc/Controller.js?v=4";
import Router from "./router.js?v=4";

function initApp() {
  try {
    const model = Model({productos: PRODUCTOS, cats: CATS, q: Q, shapes: SHAPES, cat2pieza: CAT2PIEZA});
    const view = View(model, null);
    const controller = Controller(model, view, { ...config, cat2pieza: CAT2PIEZA });
    if (view && view.setController) view.setController(controller);
    if (view) view.__cb = controller;
    const router = Router();

    // inicialización de vistas
    view.renderFilters();
    view.renderGrid();
    view.buildOpts();
    view.renderCotizador();
    router.init();
  } catch (err) {
    console.error("Error al inicializar la app:", err);
  }

  /* Menú de navegación móvil accesible (Ley de Jakob & Fitts) */
  initNav();

  /* Botón Volver arriba (Ley de Fitts y Control del Usuario) */
  initScrollTop();

  /* ScrollSpy: Visibilidad del estado del sistema */
  initScrollSpy();
}

function initNav() {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navBackdrop = document.getElementById("nav-backdrop");
  if (!navToggle || !navMenu) return;

  const openNav = () => {
    navMenu.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Cerrar menú de navegación");
    if (navBackdrop) navBackdrop.hidden = false;
    document.body.classList.add("nav-open");
  };

  const closeNav = () => {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú de navegación");
    if (navBackdrop) navBackdrop.hidden = true;
    document.body.classList.remove("nav-open");
  };

  navToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = navMenu.classList.contains("is-open");
    if (isOpen) closeNav();
    else openNav();
  });

  navMenu.querySelectorAll(".nav-link, .btn-mobile-wa").forEach(link => {
    link.addEventListener("click", closeNav);
  });

  if (navBackdrop) {
    navBackdrop.addEventListener("click", closeNav);
  }

  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains("is-open")) {
      closeNav();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("is-open")) {
      closeNav();
      navToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1120 && navMenu.classList.contains("is-open")) {
      closeNav();
    }
  }, { passive: true });
}

function initScrollTop() {
  const scrollTopBtn = document.getElementById("scroll-top");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      scrollTopBtn.hidden = window.scrollY < 400;
    }, { passive: true });
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

function initScrollSpy() {
  const sections = ["inicio", "catalogo", "personaliza", "pedidos", "talleres", "nosotros", "preguntas"]
    .map(id => document.getElementById(id))
    .filter(Boolean);
  const navLinks = document.querySelectorAll(".nav-link");

  const updateScrollSpy = () => {
    const scrollPos = window.scrollY + 140;
    let currentId = "inicio";
    for (const sec of sections) {
      if (sec.offsetTop <= scrollPos) {
        currentId = sec.id;
      }
    }
    navLinks.forEach(link => {
      const href = link.getAttribute("href")?.replace(/^#/, "");
      const isMatch = href === currentId;
      link.classList.toggle("active", isMatch);
      if (isMatch) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };
  window.addEventListener("scroll", updateScrollSpy, { passive: true });
  updateScrollSpy();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

/* Hero: opacidad suave de la foto al hacer scroll */
const fotoHero = document.getElementById('foto');
if (fotoHero) {
  window.addEventListener('scroll', () => {
    const opacidad = 1 - window.scrollY / (window.innerHeight * 0.85);
    fotoHero.style.opacity = Math.max(opacidad, 0);
  }, { passive: true });
}

/* Altura del header para hacer scroll offset y padding exacto */
const header = document.querySelector('header');
function setHh() {
  if (header) {
    document.documentElement.style.setProperty('--hh', header.getBoundingClientRect().height + 'px');
  }
}
setHh();
window.addEventListener('resize', setHh);
