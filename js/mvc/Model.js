/* Modelo: estado único de la aplicación. No toca el DOM. */
export default function Model({productos, cats, q, shapes, cat2pieza, ideas}) {
  let filtro = "todo";
  let abierto = null;          // índice del producto abierto en el visor
  let ultimaCat = "tote";      // última categoría vista (para "Personalizar una así")

  /* Estado del cotizador */
  const st = {
    pieza: "tote", tela: 0, letra: 0, tam: 1, pos: "centro",
    hilos: [0],
    ideaSugerida: null, // nombre de idea sugerida si se seleccionó una
    ideaImg: null,      // imagen de la idea seleccionada
  };

  return {
    /* ---------- Catálogo ---------- */
    getFiltro() { return filtro; },
    setFiltro(v) { filtro = v; },
    getProductos() {
      return productos.map((p, i) => ({...p, i}))
        .filter(p => filtro === "todo" || p.cat === filtro);
    },
    getCounts() {
      const counts = {todo: productos.length};
      productos.forEach(p => { counts[p.cat] = (counts[p.cat] || 0) + 1; });
      return counts;
    },
    getCats() { return cats; },

    /* ---------- Visor de producto ---------- */
    getAbierto() { return abierto; },
    setAbierto(i) { abierto = i; },
    getUltimaCat() { return ultimaCat; },
    setUltimaCat(c) { ultimaCat = c; },

    /* ---------- Cotizador ---------- */
    getState() { return {...st}; },
    setState(patch) { Object.assign(st, patch); },
    setPieza(id) { st.pieza = id; },
    setTela(i) { st.tela = i; },
    setLetra(i) { st.letra = i; },
    setTam(i) { st.tam = i; },
    setPos(v) { st.pos = v; },
    setHilos(idxs) { st.hilos = idxs; },
    setIdeaSugerida(idea) {
      if (!idea) {
        st.ideaSugerida = null;
        st.ideaImg = null;
        return;
      }
      st.ideaSugerida = idea.n;
      st.ideaImg = idea.img || null;
    },
    getQ() { return q; },
    getShapes() { return shapes; },
    getCat2Pieza() { return cat2pieza; },
    getIdeas() { return ideas || []; },
  };
}
