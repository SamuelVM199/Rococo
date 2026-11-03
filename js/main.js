import config from "./config.js";
import {PRODUCTOS, CATS, Q, SHAPES, CAT2PIEZA} from "./data/products.js";
import Model from "./mvc/Model.js";
import View from "./mvc/View.js";
import Controller from "./mvc/Controller.js";
import Router from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
  const model = Model({productos: PRODUCTOS, cats: CATS, q: Q, shapes: SHAPES, cat2pieza: CAT2PIEZA});
  const view = View(model, null);   // se completa abajo
  const controller = Controller(model, view, { ...config, cat2pieza: CAT2PIEZA });
  view.__cb = controller;           // view usa controller como callback-holder
  const router = Router();

  // inicialización
  view.renderFilters();
  view.renderGrid();
  view.buildOpts();
  view.renderCotizador();
  router.init();

  /* Menú de navegación móvil accesible (Ley de Jakob & Fitts) */
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (navToggle && navMenu) {
    const closeNav = () => {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    };
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    navMenu.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", closeNav);
    });
    document.addEventListener("click", e => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains("is-open")) {
        closeNav();
      }
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && navMenu.classList.contains("is-open")) {
        closeNav();
        navToggle.focus();
      }
    });
  }

  /* Botón Volver arriba (Ley de Fitts y Control del Usuario) */
  const scrollTopBtn = document.getElementById("scroll-top");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      scrollTopBtn.hidden = window.scrollY < 400;
    }, { passive: true });
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ScrollSpy: Visibilidad del estado del sistema (Heurística de Nielsen) */
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
});

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
