import config from "./config.js";
import {PRODUCTOS, CATS, Q, SHAPES, CAT2PIEZA} from "./data/products.js";
import Model from "./mvc/Model.js";
import View from "./mvc/View.js";
import Controller from "./mvc/Controller.js";
import Router from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
  const model = Model({productos: PRODUCTOS, cats: CATS, q: Q, shapes: SHAPES, cat2pieza: CAT2PIEZA});
  const view = View(model, null);   // se completa abajo
  const controller = Controller(model, view, config);
  view.__cb = controller;           // view usa controller como callback-holder
  const router = Router();

  // inicialización
  view.renderFilters();
  view.renderGrid();
  view.buildOpts();
  view.renderCotizador();

  router.init();
});

/* Hero: opacidad de la foto al hacer scroll */
const fotoHero = document.getElementById('foto');
if (fotoHero) {
  window.addEventListener('scroll', () => {
    const opacidad = 1 - window.scrollY / (window.innerHeight * 0.8);
    fotoHero.style.opacity = Math.max(opacidad, 0);
  }, { passive: true });
}
