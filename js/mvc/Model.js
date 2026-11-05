/* Modelo: estado único de la aplicación. No toca el DOM. */
export default function Model({productos, cats, q, shapes, cat2pieza, ideas}) {
  let filtro = "todo";
  let abierto = null;          // índice del producto abierto en el visor
  let ultimaCat = "tote";      // última categoría vista (para "Personalizar una así")

  /* Estado del cotizador */
  const st = {
    pieza: "tote", tela: 0, letra: 0, tam: 1, pos: "centro",
    hilos: [0],
    fotos: [],          // [{ id, url, name, isIdea }]
    fotoActiva: 0,      // índice de la foto mostrada en la pieza
    foto: null,         // compatibilidad (foto activa)
    fotoNombre: "",     // compatibilidad (nombre foto activa)
    ideaSugerida: null, // nombre de idea sugerida si se seleccionó una
    rawFiles: [],       // File objects en memoria temporal
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
    getState() { return {...st, fotos: [...st.fotos]}; },
    setState(patch) { Object.assign(st, patch); },
    setPieza(id) { st.pieza = id; },
    setTela(i) { st.tela = i; },
    setLetra(i) { st.letra = i; },
    setTam(i) { st.tam = i; },
    setPos(v) { st.pos = v; },
    setHilos(idxs) { st.hilos = idxs; },
    addFoto(url, name, isIdea = false, rawFile = null) {
      const id = Date.now() + "_" + Math.random().toString(36).slice(2, 6);
      st.fotos.push({ id, url, name, isIdea });
      if (rawFile) st.rawFiles.push(rawFile);
      st.fotoActiva = st.fotos.length - 1;
      st.foto = url;
      st.fotoNombre = name;
      if (!isIdea) st.ideaSugerida = null;
    },
    removeFoto(index) {
      if (index >= 0 && index < st.fotos.length) {
        st.fotos.splice(index, 1);
        if (index < st.rawFiles.length) {
          st.rawFiles.splice(index, 1);
        }
        if (st.fotoActiva >= st.fotos.length) {
          st.fotoActiva = Math.max(0, st.fotos.length - 1);
        }
        const active = st.fotos[st.fotoActiva];
        st.foto = active ? active.url : null;
        st.fotoNombre = active ? active.name : "";
      }
    },
    setFotoActiva(index) {
      if (index >= 0 && index < st.fotos.length) {
        st.fotoActiva = index;
        st.foto = st.fotos[index].url;
        st.fotoNombre = st.fotos[index].name;
      }
    },
    setFotoServerUrl(index, serverUrl) {
      if (index >= 0 && index < st.fotos.length) {
        st.fotos[index].serverUrl = serverUrl;
      }
    },
    limpiarFotos() {
      st.fotos = [];
      st.rawFiles = [];
      st.fotoActiva = 0;
      st.foto = null;
      st.fotoNombre = "";
      st.ideaSugerida = null;
    },
    setFoto(dataUrl, nombre) {
      st.fotos = [{ id: "f0", url: dataUrl, name: nombre, isIdea: false }];
      st.fotoActiva = 0;
      st.foto = dataUrl;
      st.fotoNombre = nombre;
      st.ideaSugerida = null;
    },
    limpiarFoto() {
      this.limpiarFotos();
    },
    setIdeaSugerida(idea) {
      if (!idea) {
        st.ideaSugerida = null;
        return;
      }
      st.ideaSugerida = idea.n;
      const foundIdx = st.fotos.findIndex(f => f.isIdea && f.name === idea.n);
      if (foundIdx >= 0) {
        this.setFotoActiva(foundIdx);
      } else {
        this.addFoto(idea.img, idea.n, true);
      }
    },
    getQ() { return q; },
    getShapes() { return shapes; },
    getCat2Pieza() { return cat2pieza; },
    getIdeas() { return ideas || []; },
    getRawFiles() { return [...st.rawFiles]; },
  };
}
