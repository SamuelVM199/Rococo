// rococo-handmade/js/config.js
var WHATSAPP = "529531754972";
var INSTAGRAM = "rococohandmade";
var FACEBOOK = "https://www.facebook.com/share/1Cdmksoc2e/";
var CANVA = "https://hdxvzxv.my.canva.site/rococohandmade";
var IMG_BASE = "img";
var config = {
  whatsapp: WHATSAPP,
  instagram: INSTAGRAM,
  facebook: FACEBOOK,
  canva: CANVA,
  imgBase: IMG_BASE
};
var config_default = config;

// rococo-handmade/js/data/products.js
var CATS = {
  tote: "Tote bags",
  jareta: "Bolsas de jareta",
  cosmetiquera: "Cosmetiqueras",
  ropa: "Ropa bordada"
};
var PRODUCTOS = [
  {
    nombre: "Tote Ojo",
    cat: "tote",
    fotos: ["tote-ojo.jpg"],
    precio: null,
    medidas: null,
    personalizable: true,
    desc: "Tote de manta con un ojo bordado a mano en azul y rayos dorados."
  },
  {
    nombre: "Bolsa Vichy rosa",
    cat: "jareta",
    fotos: ["jareta-vichy-rosa-1.jpg", "jareta-vichy-rosa-2.jpg"],
    precio: null,
    medidas: null,
    personalizable: false,
    desc: "Bolsa de jareta en vichy rosa con asas de manta y flores bordadas en negro."
  },
  {
    nombre: "Tote Corazoncitos",
    cat: "tote",
    fotos: ["tote-corazoncitos-1.jpg", "tote-corazoncitos-2.jpg"],
    precio: null,
    medidas: null,
    personalizable: false,
    desc: "Tote de manta con pequeños corazones bordados y asas largas de tela roja."
  },
  {
    nombre: "Bolsa Picnic",
    cat: "jareta",
    fotos: ["jareta-picnic.jpg"],
    precio: null,
    medidas: null,
    personalizable: false,
    desc: "Bolsa de jareta en tela de cuadros vichy con cerezas bordadas."
  },
  {
    nombre: "Cosmetiquera Jirafas",
    cat: "cosmetiquera",
    fotos: ["cosmetiquera-jirafas.jpg"],
    precio: null,
    medidas: null,
    personalizable: true,
    desc: "Cosmetiquera con cierre, bordada con una familia de jirafas, sol y árbol rosa."
  },
  {
    nombre: "Bolsa Corazones",
    cat: "jareta",
    fotos: ["mezclilla-corazones-1.jpg", "mezclilla-corazones-2.jpg", "mezclilla-corazones-3.jpg"],
    precio: null,
    medidas: null,
    personalizable: false,
    desc: "Bolsa de mezclilla con corazones rojos bordados, jareta de cordón y asa larga."
  },
  {
    nombre: "Tote Bolsillos",
    cat: "tote",
    fotos: ["tote-bolsillos-negra.jpg", "tote-bolsillos-olivo.jpg", "tote-bolsillos-olivo-look.jpg"],
    precio: null,
    medidas: null,
    personalizable: false,
    desc: "Tote de lona con bolsillos al frente y llavero de corazón bordado. En negro y verde olivo."
  },
  {
    nombre: "Bolsa Estrellas",
    cat: "jareta",
    fotos: ["jareta-estrellas.jpg"],
    precio: null,
    medidas: null,
    personalizable: false,
    desc: "Bolsa de jareta en terciopelo palo de rosa con estrellas bordadas en dorado."
  },
  {
    nombre: "Tote Polillas",
    cat: "tote",
    fotos: ["tote-polillas.jpg"],
    precio: null,
    medidas: null,
    personalizable: false,
    desc: "Tote de tela clara con polillas bordadas en azul marino y moño de vichy."
  },
  {
    nombre: "Bolsa Cereza",
    cat: "jareta",
    fotos: ["jareta-cereza.jpg"],
    precio: null,
    medidas: null,
    personalizable: false,
    desc: "Bolsa de jareta cruzada con cordón de algodón y una cereza bordada."
  },
  {
    nombre: "Cosmetiqueras Patchwork",
    cat: "cosmetiquera",
    fotos: ["cosmetiqueras-patchwork.jpg"],
    precio: null,
    medidas: null,
    personalizable: false,
    desc: "Cosmetiqueras con cierre en mezclilla, vichy y telas floreadas, con soles y flores bordados."
  },
  {
    nombre: "Cosmetiquera Ojo",
    cat: "cosmetiquera",
    fotos: ["cosmetiquera-ojo.jpg"],
    precio: null,
    medidas: null,
    personalizable: false,
    desc: "Cosmetiquera color vino con un ojo bordado en hilo dorado."
  },
  {
    nombre: "Bolsa Art déco",
    cat: "jareta",
    fotos: ["jareta-deco.jpg"],
    precio: null,
    medidas: null,
    personalizable: false,
    desc: "Bolsa de jareta en tela de abanicos dorados con corazones bordados."
  },
  {
    nombre: "Tote Mixteca",
    cat: "tote",
    fotos: ["tote-mixteca.jpg"],
    precio: null,
    medidas: null,
    personalizable: true,
    desc: "Tote de manta con bordado azul y la palabra «mixteca» en puntada atrás."
  },
  {
    nombre: "Bolsa Amuletos",
    cat: "jareta",
    fotos: ["jareta-amuletos.jpg"],
    precio: null,
    medidas: null,
    personalizable: false,
    desc: "Bolsa de jareta con asas, cubierta de pequeños amuletos bordados a color."
  },
  {
    nombre: "Tote Bosque",
    cat: "tote",
    fotos: ["tote-bosque.jpg"],
    precio: null,
    medidas: null,
    personalizable: false,
    desc: "Tote de manta con criaturas del bosque y hojas bordadas a mano."
  },
  {
    nombre: "Sudadera Perrito florido",
    cat: "ropa",
    fotos: ["sudadera-perrito.jpg"],
    precio: null,
    medidas: null,
    personalizable: true,
    desc: "Sudadera negra con un perrito con corona de flores bordado. Podemos bordar a tu mascota."
  }
];
var Q = {
  piezas: [
    { id: "tote", n: "Tote bag" },
    { id: "jareta", n: "Bolsa de jareta" },
    { id: "cangurera", n: "Cangurera" },
    { id: "cosmetiquera", n: "Cosmetiquera" },
    { id: "sudadera", n: "Sudadera o prenda" }
  ],
  telas: [
    { n: "Manta natural", c: "#efe5d3" },
    { n: "Negro", c: "#25262d" },
    { n: "Mezclilla", c: "#5d81aa" },
    { n: "Rosa palo", c: "#ecc6d1" },
    { n: "Verde olivo", c: "#7b7f4e" },
    { n: "Vino", c: "#6d2335" }
  ],
  letras: [
    { n: "Manuscrita", f: "Sacramento, cursive", k: 1.5 },
    { n: "Cursiva", f: "'Dancing Script', cursive", k: 1.15 },
    { n: "Bloque", f: "'Bricolage Grotesque', sans-serif", k: 1 },
    { n: "Redondeada", f: "Fredoka, sans-serif", k: 1 },
    { n: "Máquina de escribir", f: "'Special Elite', monospace", k: 0.95 }
  ],
  tamanos: [
    { n: "Chico", d: "hasta 6 cm", k: 0.42 },
    { n: "Mediano", d: "hasta 10 cm", k: 0.68 },
    { n: "Grande", d: "hasta 15 cm", k: 1 }
  ],
  posiciones: [
    { id: "centro", n: "Centro" },
    { id: "esquina", n: "Esquina inferior" },
    { id: "arriba", n: "Arriba a la izquierda" }
  ],
  hilos: [
    { n: "Azul marino", c: "#1d2b57" },
    { n: "Rojo cereza", c: "#c2334d" },
    { n: "Rosa", c: "#e98aa6" },
    { n: "Dorado", c: "#c9a13b" },
    { n: "Verde olivo", c: "#6b7a3a" },
    { n: "Negro", c: "#16161a" },
    { n: "Blanco", c: "#fbfbf8" },
    { n: "Multicolor", c: "conic-gradient(#c2334d,#c9a13b,#6b7a3a,#5d81aa,#e98aa6,#c2334d)" }
  ]
};
var SHAPES = {
  tote: {
    area: { x: 200, y: 285, w: 210 },
    draw: (f) => `
      <path d="M128 150 C128 40 190 40 190 150" fill="none" stroke="${f}" stroke-width="15" stroke-linecap="round"/>
      <path d="M210 150 C210 40 272 40 272 150" fill="none" stroke="${f}" stroke-width="15" stroke-linecap="round"/>
      <path d="M128 150 C128 40 190 40 190 150 M210 150 C210 40 272 40 272 150" fill="none" stroke="rgba(0,0,0,.12)" stroke-width="15" stroke-linecap="round" stroke-dasharray="1 0" opacity=".25"/>
      <rect x="70" y="145" width="260" height="275" rx="6" fill="${f}" stroke="rgba(0,0,0,.18)"/>
      <line x1="74" y1="160" x2="326" y2="160" stroke="rgba(0,0,0,.2)" stroke-dasharray="5 5"/>`
  },
  jareta: {
    area: { x: 200, y: 300, w: 175 },
    draw: (f) => `
      <path d="M150 120 C150 50 250 50 250 120" fill="none" stroke="${f}" stroke-width="13"/>
      <path d="M95 130 Q200 160 305 130 L315 400 Q200 432 85 400 Z" fill="${f}" stroke="rgba(0,0,0,.18)"/>
      <path d="M95 130 Q120 110 140 132 Q160 112 180 134 Q200 114 220 134 Q240 112 260 132 Q280 110 305 130" fill="${f}" stroke="rgba(0,0,0,.18)"/>
      <path d="M100 160 Q200 186 300 160" fill="none" stroke="#f3eee4" stroke-width="5" stroke-linecap="round"/>
      <path d="M110 165 l-12 70 M290 165 l12 70" stroke="#f3eee4" stroke-width="5" stroke-linecap="round"/>`
  },
  cangurera: {
    area: { x: 200, y: 270, w: 160 },
    draw: (f) => `
      <path d="M10 215 Q200 165 390 215" fill="none" stroke="#3a3a44" stroke-width="14" stroke-linecap="round"/>
      <rect x="70" y="190" width="260" height="150" rx="72" fill="${f}" stroke="rgba(0,0,0,.18)"/>
      <path d="M110 214 Q200 196 290 214" fill="none" stroke="#c9a13b" stroke-width="3" stroke-dasharray="3 3"/>`
  },
  cosmetiquera: {
    area: { x: 200, y: 285, w: 190 },
    draw: (f) => `
      <rect x="55" y="170" width="290" height="200" rx="34" fill="${f}" stroke="rgba(0,0,0,.18)"/>
      <line x1="80" y1="192" x2="320" y2="192" stroke="#8a8a92" stroke-width="4" stroke-dasharray="2 3"/>
      <rect x="300" y="182" width="26" height="20" rx="4" fill="#b9b9c0"/>`
  },
  sudadera: {
    area: { x: 200, y: 225, w: 140 },
    draw: (f) => `
      <path d="M150 80 Q200 112 250 80 L335 118 L385 292 L332 306 L305 205 L305 412 L95 412 L95 205 L68 306 L15 292 L65 118 Z" fill="${f}" stroke="rgba(0,0,0,.18)" stroke-linejoin="round"/>
      <path d="M150 80 Q200 112 250 80" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="6"/>
      <rect x="95" y="392" width="210" height="20" fill="rgba(0,0,0,.12)"/>`
  }
};
var CAT2PIEZA = { tote: "tote", jareta: "jareta", cosmetiquera: "cosmetiquera", ropa: "sudadera" };

// rococo-handmade/js/mvc/Model.js
function Model({ productos, cats, q, shapes, cat2pieza }) {
  let filtro = "todo";
  let abierto = null;
  let ultimaCat = "tote";
  const st = {
    pieza: "tote",
    tela: 0,
    letra: 0,
    tam: 1,
    pos: "centro",
    hilos: [0],
    foto: null,
    fotoNombre: ""
  };
  return {
    getFiltro() {
      return filtro;
    },
    setFiltro(v) {
      filtro = v;
    },
    getProductos() {
      return productos.map((p, i) => ({ ...p, i })).filter((p) => filtro === "todo" || p.cat === filtro);
    },
    getCounts() {
      const counts = { todo: productos.length };
      productos.forEach((p) => {
        counts[p.cat] = (counts[p.cat] || 0) + 1;
      });
      return counts;
    },
    getCats() {
      return cats;
    },
    getAbierto() {
      return abierto;
    },
    setAbierto(i) {
      abierto = i;
    },
    getUltimaCat() {
      return ultimaCat;
    },
    setUltimaCat(c) {
      ultimaCat = c;
    },
    getState() {
      return { ...st };
    },
    setState(patch) {
      Object.assign(st, patch);
    },
    setPieza(id) {
      st.pieza = id;
    },
    setTela(i) {
      st.tela = i;
    },
    setLetra(i) {
      st.letra = i;
    },
    setTam(i) {
      st.tam = i;
    },
    setPos(v) {
      st.pos = v;
    },
    setHilos(idxs) {
      st.hilos = idxs;
    },
    setFoto(dataUrl, nombre) {
      st.foto = dataUrl;
      st.fotoNombre = nombre;
    },
    limpiarFoto() {
      st.foto = null;
      st.fotoNombre = "";
    },
    getQ() {
      return q;
    },
    getShapes() {
      return shapes;
    },
    getCat2Pieza() {
      return cat2pieza;
    }
  };
}

// rococo-handmade/js/mvc/View.js
function View(model, initialCb) {
  const self = {};
  let cb = initialCb || {};
  self.setController = (c) => {
    cb = c;
  };
  const $ = (s) => document.querySelector(s);
  const $$ = (s, fn) => document.querySelectorAll(s).forEach(fn);
  const fmt = (n) => "$" + n.toLocaleString("es-MX") + " MXN";
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  })[c]);
  const contactURL = (msg) => {
    if (cb && cb.config && cb.config.whatsapp)
      return "https://wa.me/" + cb.config.whatsapp + "?text=" + encodeURIComponent(msg);
    if (cb && cb.config && cb.config.instagram)
      return "https://ig.me/m/" + cb.config.instagram;
    return "https://wa.me/529531754972?text=" + encodeURIComponent(msg);
  };
  const pedirMsg = (p) => `Hola, Rococó. Me interesa la pieza «${p.nombre}» que vi en su catálogo. ¿Me pueden dar precio y disponibilidad?`;
  self.renderFilters = () => {
    const counts = model.getCounts();
    const opts = [["todo", "Todo"], ...Object.entries(model.getCats()).filter(([k]) => counts[k])];
    const el = $("#filters");
    if (!el)
      return;
    el.innerHTML = opts.map(([k, l]) => `<button class="chip" type="button" data-f="${k}" aria-pressed="${k === model.getFiltro()}">${l}<span class="n">${counts[k]}</span></button>`).join("");
    $$("#filters .chip", (b) => {
      b.onclick = () => {
        if (cb && cb.onFilter)
          cb.onFilter(b.dataset.f);
      };
    });
  };
  self.renderGrid = () => {
    const list = model.getProductos();
    const grid = $("#grid");
    if (!grid)
      return;
    const countEl = $("#catalog-count");
    if (countEl) {
      const f = model.getFiltro();
      const catName = f === "todo" ? "todas las categorías" : model.getCats()[f] || f;
      countEl.textContent = `Mostrando ${list.length} ${list.length === 1 ? "pieza" : "piezas"} (${catName})`;
    }
    const imgBase = cb && cb.config && cb.config.imgBase || "img";
    grid.innerHTML = list.map((p) => `
      <article class="card">
        <button class="ph" type="button" data-i="${p.i}" aria-label="Ver detalles y fotos de ${p.nombre}">
          <img src="${imgBase}/${p.fotos[0]}" alt="${esc(p.desc)}" loading="lazy">
          ${p.personalizable ? '<span class="badge">Personalizable</span>' : ""}
          ${p.fotos.length > 1 ? `<span class="count">${p.fotos.length} fotos</span>` : ""}
        </button>
        <div class="body">
          <span class="cat-badge">${model.getCats()[p.cat]}</span>
          <h3>${esc(p.nombre)}</h3>
          <p class="desc">${esc(p.desc)}</p>
          <div class="meta">
            ${p.precio ? `<span class="price">${fmt(p.precio)}</span>` : '<span class="price ask">Consulta precio</span>'}
            <a class="btn btn-solid" href="${contactURL(pedirMsg(p))}" target="_blank" rel="noopener" aria-label="Pedir ${esc(p.nombre)} por WhatsApp">Pedir</a>
          </div>
        </div>
      </article>`).join("") + `
      <div class="cta-card">
        <p class="eyebrow">¿No encuentras lo que buscas?</p>
        <h3>Diseñamos una pieza solo para ti</h3>
        <p>Elige la bolsa, la tela y el bordado. Te mandamos precio y tiempo de entrega.</p>
        <a class="btn btn-solid" href="${contactURL("Hola, Rococó. Quiero cotizar una pieza personalizada. Mi idea es: ")}" target="_blank" rel="noopener">Cotizar mi pieza</a>
      </div>`;
    $$(".ph", (b) => {
      b.onclick = () => {
        if (cb && cb.onOpen)
          cb.onOpen(+b.dataset.i);
      };
    });
  };
  const dlg = $("#viewer");
  let curProduct = null;
  let curPhotoIdx = 0;
  self.renderViewer = (p) => {
    if (!dlg)
      return;
    curProduct = p;
    curPhotoIdx = 0;
    $("#dv-cat").textContent = model.getCats()[p.cat];
    $("#dv-title").textContent = p.nombre;
    $("#dv-desc").textContent = p.desc;
    const rows = [["Precio", p.precio ? fmt(p.precio) : "Consulta precio"]];
    if (p.medidas)
      rows.push(["Medidas", p.medidas]);
    rows.push(["Elaboración", "Bordado a mano"]);
    rows.push(["Personalizable", p.personalizable ? "Sí, bajo cotización" : "Pregunta por colores"]);
    rows.push(["Envío", "Local y nacional"]);
    $("#dv-dl").innerHTML = rows.map(([a, b]) => `<dt>${esc(a)}</dt><dd>${esc(b)}</dd>`).join("");
    $("#dv-btn").href = contactURL(pedirMsg(p));
    const isWa = cb && cb.config && cb.config.whatsapp;
    $("#dv-btn").textContent = "Pedir por " + (isWa ? "WhatsApp" : "mensaje directo");
    const thumbs = $("#dv-thumbs");
    const imgBase = cb && cb.config && cb.config.imgBase || "img";
    thumbs.innerHTML = p.fotos.length > 1 ? p.fotos.map((f, k) => `<button type="button" aria-label="Ver foto ${k + 1} de ${p.fotos.length}" aria-current="${k === 0}"><img src="${imgBase}/${f}" alt=""></button>`).join("") : "";
    $$("#dv-thumbs button", (b, k) => {
      b.onclick = () => {
        if (cb && cb.onPhoto)
          cb.onPhoto(p, k);
        else
          self.showPhoto(p, k);
      };
    });
    self.showPhoto(p, 0);
    if (typeof dlg.showModal === "function")
      dlg.showModal();
  };
  self.showPhoto = (p, k) => {
    curProduct = p;
    curPhotoIdx = k;
    const imgBase = cb && cb.config && cb.config.imgBase || "img";
    const dvImg = $("#dv-img");
    if (dvImg) {
      dvImg.src = imgBase + "/" + p.fotos[k];
      dvImg.alt = `${p.nombre} · Foto ${k + 1} de ${p.fotos.length}`;
    }
    const prev = $("#dv-prev");
    const next = $("#dv-next");
    const count = $("#dv-counter");
    const hasMany = p.fotos.length > 1;
    if (prev)
      prev.hidden = !hasMany;
    if (next)
      next.hidden = !hasMany;
    if (count) {
      count.hidden = !hasMany;
      count.textContent = `${k + 1} / ${p.fotos.length}`;
    }
    $$("#dv-thumbs button", (b, j) => b.setAttribute("aria-current", j === k));
  };
  const prevBtn = $("#dv-prev");
  const nextBtn = $("#dv-next");
  if (prevBtn) {
    prevBtn.onclick = () => {
      if (!curProduct || curProduct.fotos.length <= 1)
        return;
      const nextIdx = (curPhotoIdx - 1 + curProduct.fotos.length) % curProduct.fotos.length;
      self.showPhoto(curProduct, nextIdx);
    };
  }
  if (nextBtn) {
    nextBtn.onclick = () => {
      if (!curProduct || curProduct.fotos.length <= 1)
        return;
      const nextIdx = (curPhotoIdx + 1) % curProduct.fotos.length;
      self.showPhoto(curProduct, nextIdx);
    };
  }
  document.addEventListener("keydown", (e) => {
    if (!dlg || !dlg.open || !curProduct || curProduct.fotos.length <= 1)
      return;
    if (e.key === "ArrowLeft") {
      const nextIdx = (curPhotoIdx - 1 + curProduct.fotos.length) % curProduct.fotos.length;
      self.showPhoto(curProduct, nextIdx);
    } else if (e.key === "ArrowRight") {
      const nextIdx = (curPhotoIdx + 1) % curProduct.fotos.length;
      self.showPhoto(curProduct, nextIdx);
    }
  });
  const dvClose = $("#dv-close");
  if (dvClose)
    dvClose.onclick = () => {
      if (dlg)
        dlg.close();
    };
  if (dlg)
    dlg.addEventListener("click", (e) => {
      if (e.target === dlg)
        dlg.close();
    });
  self.buildOpts = () => {
    const q = model.getQ();
    const chips = (el, items, name, type, isOn, label, extraClass = "") => {
      if (!el)
        return;
      el.innerHTML = items.map((it, i) => `<label class="opt ${extraClass}"><input type="${type}" name="${name}" value="${it.id ?? i}" ${isOn(it, i) ? "checked" : ""}><span>${label(it, i)}</span></label>`).join("");
    };
    const sw = (c) => `<i class="sw" style="background:${c}"></i>`;
    const st = model.getState();
    chips($("#o-pieza"), q.piezas, "pieza", "radio", (it) => it.id === st.pieza, (it) => it.n);
    chips($("#o-tela"), q.telas, "tela", "radio", (it, i) => i === st.tela, (it) => sw(it.c) + it.n);
    chips($("#o-letra"), q.letras, "letra", "radio", (it, i) => i === st.letra, (it) => `<em style="font-family:${it.f};font-size:${it.k}em;line-height:1">${it.n}</em>`, "font-opt");
    chips($("#o-tam"), q.tamanos, "tam", "radio", (it, i) => i === st.tam, (it) => `${it.n} <small>${it.d}</small>`);
    chips($("#o-pos"), q.posiciones, "pos", "radio", (it) => it.id === st.pos, (it) => it.n);
    chips($("#o-hilo"), q.hilos, "hilo", "checkbox", (it, i) => st.hilos.includes(i), (it) => sw(it.c) + it.n);
  };
  self.renderCotizador = () => {
    const q = model.getQ();
    const shapes = model.getShapes();
    const st = model.getState();
    const sh = shapes[st.pieza];
    const tela = q.telas[st.tela];
    const tam = q.tamanos[st.tam];
    const le = q.letras[st.letra];
    const txtInput = $("#q-texto");
    const txt = txtInput ? txtInput.value.trim() : "";
    const dark = ["Negro", "Vino", "Mezclilla", "Verde olivo"].includes(tela.n);
    let col = q.hilos[st.hilos[0] ?? 0]?.c || "#1d2b57";
    if (col.startsWith("conic"))
      col = "#c2334d";
    const multi = st.hilos.length > 1 ? q.hilos[st.hilos[1]].c : col;
    const W = sh.area.w * tam.k * (st.pos === "centro" ? 1 : 0.62);
    let cx = sh.area.x, cy = sh.area.y;
    if (st.pos === "esquina") {
      cx += sh.area.w * 0.34;
      cy += sh.area.w * 0.32;
    }
    if (st.pos === "arriba") {
      cx -= sh.area.w * 0.3;
      cy -= sh.area.w * 0.3;
    }
    const hasImg = !!st.foto;
    const imgH = W;
    const fs = Math.max(10, W / Math.max(4, txt.length * 0.55)) * le.k * 0.9;
    const totalH = imgH + (txt ? fs * 1.1 : 0);
    const top = cy - totalH / 2;
    let design = "";
    if (hasImg)
      design += `<image href="${st.foto}" x="${cx - imgH / 2}" y="${top}" width="${imgH}" height="${imgH}" preserveAspectRatio="xMidYMid meet"/>`;
    if (txt)
      design += `<text x="${cx}" y="${top + imgH + fs * 0.85}" text-anchor="middle" font-family="${le.f}" font-size="${fs.toFixed(1)}" fill="${col}" stroke-width="${multi !== col ? 0.8 : 0}" stroke="${multi}">${esc(txt)}</text>`;
    if (!hasImg && !txt) {
      design = `<text x="${cx}" y="${cy}" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="13" fill="${dark ? "#fdf0f5" : "#6b5f7a"}">Tu bordado aquí</text>`;
    }
    const r = Math.max(W, totalH) / 2 + 14;
    const pv = $("#pv");
    if (pv) {
      pv.innerHTML = `<rect width="400" height="440" fill="transparent"/>${sh.draw(tela.c)}
        <circle class="hoop" cx="${cx}" cy="${cy}" r="${r.toFixed(1)}"/>${design}`;
    }
    const pvCap = $("#pv-cap");
    if (pvCap) {
      pvCap.innerHTML = `<b>${q.piezas.find((p) => p.id === st.pieza).n}</b> · ${tela.n} · ${tam.n} (${tam.d})`;
    }
    self.progress();
  };
  self.progress = () => {
    const st = model.getState();
    const txtInput = $("#q-texto");
    const txt = txtInput ? txtInput.value.trim() : "";
    const nameInput = $("#q-nombre");
    const nameVal = nameInput ? nameInput.value.trim() : "";
    const done = [true, !!(st.foto || txt), st.hilos.length > 0, !!nameVal];
    done.forEach((d, i) => {
      const el = $("#ok" + (i + 1));
      if (el)
        el.textContent = d ? "✓ listo" : "";
    });
    const prog = $("#qprog");
    if (prog)
      prog.style.width = done.filter(Boolean).length / 4 * 100 + "%";
  };
  self.showErr = (m) => {
    const e = $("#q-err");
    if (e) {
      e.textContent = m;
      e.hidden = !m;
    }
  };
  const qform = $("#qform");
  if (qform) {
    qform.addEventListener("change", (e) => {
      const t = e.target;
      if (!cb)
        return;
      if (t.name === "pieza" && cb.onPieza)
        cb.onPieza(t.value);
      if (t.name === "tela" && cb.onTela)
        cb.onTela(+t.value);
      if (t.name === "letra" && cb.onLetra)
        cb.onLetra(+t.value);
      if (t.name === "tam" && cb.onTam)
        cb.onTam(+t.value);
      if (t.name === "pos" && cb.onPos)
        cb.onPos(t.value);
      if (t.name === "hilo" && cb.onHilos)
        cb.onHilos([...document.querySelectorAll("input[name=hilo]:checked")].map((x) => +x.value));
    });
  }
  ["q-texto", "q-nombre"].forEach((id) => {
    const el = $("#" + id);
    if (el)
      el.addEventListener("input", () => self.renderCotizador());
  });
  function loadFile(file) {
    if (!file || !file.type.startsWith("image/")) {
      self.showErr("El archivo debe ser una imagen (JPG o PNG).");
      return;
    }
    const fr = new FileReader;
    fr.onload = () => {
      const im = new Image;
      im.onload = () => {
        const m = 700, k = Math.min(1, m / Math.max(im.width, im.height));
        const c = document.createElement("canvas");
        c.width = im.width * k;
        c.height = im.height * k;
        c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
        if (cb && cb.onFoto)
          cb.onFoto(c.toDataURL("image/jpeg", 0.85), file.name);
        const dropImg = $("#drop-img");
        if (dropImg) {
          dropImg.src = model.getState().foto;
          dropImg.hidden = false;
        }
        const dropT = $("#drop-t");
        if (dropT)
          dropT.textContent = "Foto lista";
        const dropS = $("#drop-s");
        if (dropS)
          dropS.textContent = file.name;
        const qFotoX = $("#q-foto-x");
        if (qFotoX)
          qFotoX.hidden = false;
        self.renderCotizador();
      };
      im.src = fr.result;
    };
    fr.readAsDataURL(file);
  }
  const qFoto = $("#q-foto");
  if (qFoto)
    qFoto.addEventListener("change", (e) => loadFile(e.target.files[0]));
  const drop = $("#drop");
  if (drop) {
    ["dragenter", "dragover"].forEach((ev) => drop.addEventListener(ev, (e) => {
      e.preventDefault();
      drop.classList.add("over");
    }));
    ["dragleave", "drop"].forEach((ev) => drop.addEventListener(ev, (e) => {
      e.preventDefault();
      drop.classList.remove("over");
    }));
    drop.addEventListener("drop", (e) => loadFile(e.dataTransfer.files[0]));
  }
  const qFotoX = $("#q-foto-x");
  if (qFotoX) {
    qFotoX.onclick = () => {
      if (cb && cb.limpiarFoto)
        cb.limpiarFoto();
      if (qFoto)
        qFoto.value = "";
      const dropImg = $("#drop-img");
      if (dropImg)
        dropImg.hidden = true;
      const dropT = $("#drop-t");
      if (dropT)
        dropT.textContent = "Sube la foto o dibujo del bordado";
      const dropS = $("#drop-s");
      if (dropS)
        dropS.textContent = "JPG o PNG. Toca aquí o arrastra la imagen.";
      qFotoX.hidden = true;
      self.renderCotizador();
    };
  }
  if (qform) {
    qform.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = $("#q-nombre");
      if (!nameInput || !nameInput.value.trim()) {
        self.showErr("Escribe tu nombre para que sepamos a quién responder.");
        if (nameInput)
          nameInput.focus();
        return;
      }
      const st = model.getState();
      const txtInput = $("#q-texto");
      const notasInput = $("#q-notas");
      const hasTxt = txtInput && txtInput.value.trim();
      const hasNotas = notasInput && notasInput.value.trim();
      if (!st.foto && !hasTxt && !hasNotas) {
        self.showErr("Sube una foto de tu diseño, escribe un texto o descríbelo en las notas.");
        return;
      }
      self.showErr("");
      if (cb && cb.onEnviar)
        cb.onEnviar(st);
      const qDoneFoto = $("#q-done-foto");
      if (qDoneFoto)
        qDoneFoto.hidden = !st.foto;
      const qDone = $("#q-done");
      if (qDone)
        qDone.hidden = false;
    });
  }
  const fechaEl = $("#q-fecha");
  if (fechaEl) {
    const todayStr = new Date().toISOString().split("T")[0];
    fechaEl.min = todayStr;
  }
  const qCopy = $("#q-copy");
  if (qCopy) {
    qCopy.onclick = async () => {
      try {
        if (cb && cb.mensaje)
          await navigator.clipboard.writeText(cb.mensaje());
        const orig = qCopy.textContent;
        qCopy.textContent = "✓ ¡Solicitud copiada al portapapeles!";
        setTimeout(() => {
          qCopy.textContent = orig;
        }, 3500);
      } catch {
        const qNotas = $("#q-notas");
        if (qNotas)
          qNotas.focus();
        qCopy.textContent = "No se pudo copiar automáticamente; copia tus datos manualmente";
      }
    };
  }
  self.scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el)
      el.scrollIntoView({ behavior: "smooth" });
  };
  return self;
}

// rococo-handmade/js/mvc/Controller.js
function Controller(model, view, config) {
  const cb = {
    config,
    onFilter: (f) => {
      model.setFiltro(f);
      view.renderFilters();
      view.renderGrid();
    },
    onOpen: (i) => {
      const p = model.getProductos()[i];
      model.setUltimaCat(p.cat);
      model.setAbierto(i);
      view.renderViewer(p);
    },
    onPhoto: (p, k) => view.showPhoto(p, k),
    onPieza: (id) => {
      model.setPieza(id);
      view.buildOpts();
      view.renderCotizador();
    },
    onTela: (i) => {
      model.setTela(i);
      view.renderCotizador();
    },
    onLetra: (i) => {
      model.setLetra(i);
      view.renderCotizador();
    },
    onTam: (i) => {
      model.setTam(i);
      view.renderCotizador();
    },
    onPos: (v) => {
      model.setPos(v);
      view.renderCotizador();
    },
    onHilos: (idxs) => {
      model.setHilos(idxs);
      view.renderCotizador();
    },
    onFoto: (dataUrl, nombre) => {
      model.setFoto(dataUrl, nombre);
    },
    limpiarFoto: () => {
      model.limpiarFoto();
    },
    onEnviar: (st) => {
      const a = document.createElement("a");
      a.href = "https://wa.me/" + config.whatsapp + "?text=" + encodeURIComponent(mensaje());
      a.target = "_blank";
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
    },
    mensaje: () => {
      const q = model.getQ();
      const st = model.getState();
      const v = (id) => document.getElementById(id).value.trim();
      const tam = q.tamanos[st.tam];
      const lines = [
        "Hola, Rococó. Quiero cotizar una pieza personalizada:",
        "",
        "• Pieza: " + q.piezas.find((p) => p.id === st.pieza).n,
        "• Tela: " + q.telas[st.tela].n,
        "• Tamaño del bordado: " + tam.n + " (" + tam.d + ")",
        "• Ubicación: " + q.posiciones.find((p) => p.id === st.pos).n,
        "• Colores de hilo: " + (st.hilos.length ? st.hilos.map((i) => q.hilos[i].n).join(", ") : "a elección de Rococó")
      ];
      if (v("q-texto"))
        lines.push("• Texto: «" + v("q-texto") + "» con letra " + q.letras[st.letra].n);
      lines.push("• Diseño: " + (st.foto ? "te envío la foto en este chat" : "sin foto, ver notas"));
      lines.push("• Cantidad: " + (v("q-cant") || "1"));
      if (v("q-fecha"))
        lines.push("• Fecha deseada: " + new Date(v("q-fecha") + "T12:00").toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" }));
      lines.push("", "Nombre: " + v("q-nombre"));
      if (v("q-ciudad"))
        lines.push("Entrega en: " + v("q-ciudad"));
      if (v("q-notas"))
        lines.push("Notas: " + v("q-notas"));
      if (st.foto)
        lines.push("", "(Adjunto la foto de mi diseño en el siguiente mensaje)");
      return lines.join(`
`);
    }
  };
  const contactURL = (msg) => config.whatsapp ? "https://wa.me/" + config.whatsapp + "?text=" + encodeURIComponent(msg) : "https://ig.me/m/" + config.instagram;
  document.querySelectorAll(".js-contact").forEach((a) => {
    a.href = contactURL(a.dataset.msg || "");
    a.target = "_blank";
    a.rel = "noopener";
  });
  document.querySelectorAll(".js-contact-label").forEach((s) => {
    s.textContent = config.whatsapp ? "WhatsApp" : "Escríbenos";
  });
  if (config.whatsapp) {
    const li = document.getElementById("wa-number");
    if (li) {
      li.hidden = false;
      li.textContent = "WhatsApp: +52 953 175 4972";
    }
  }
  const dvCustom = document.getElementById("dv-custom");
  if (dvCustom) {
    dvCustom.onclick = () => {
      const cat = model.getUltimaCat();
      const pieza = config.cat2pieza[cat] || "tote";
      model.setPieza(pieza);
      view.buildOpts();
      view.renderCotizador();
      const dlg = document.getElementById("viewer");
      if (dlg)
        dlg.close();
      const sec = document.getElementById("personaliza");
      if (sec)
        sec.scrollIntoView({ behavior: "smooth" });
    };
  }
  return cb;
}

// rococo-handmade/js/router.js
function Router() {
  const go = (id) => {
    const el = document.getElementById(id);
    if (el)
      el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const handleHash = () => {
    const hash = location.hash.replace(/^#/, "");
    if (!hash)
      return;
    go(hash);
  };
  return {
    init() {
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener("click", (e) => {
          const href = a.getAttribute("href");
          if (!href || href === "#")
            return;
          const id = href.slice(1);
          if (document.getElementById(id)) {
            e.preventDefault();
            history.pushState(null, "", "#" + id);
            go(id);
          }
        });
      });
      window.addEventListener("hashchange", handleHash);
      if (location.hash)
        handleHash();
    }
  };
}

// rococo-handmade/js/main.js
function initApp() {
  try {
    const model = Model({ productos: PRODUCTOS, cats: CATS, q: Q, shapes: SHAPES, cat2pieza: CAT2PIEZA });
    const view = View(model, null);
    const controller = Controller(model, view, { ...config_default, cat2pieza: CAT2PIEZA });
    if (view && view.setController)
      view.setController(controller);
    if (view)
      view.__cb = controller;
    const router = Router();
    view.renderFilters();
    view.renderGrid();
    view.buildOpts();
    view.renderCotizador();
    router.init();
  } catch (err) {
    console.error("Error al inicializar la app:", err);
  }
  initNav();
  initScrollTop();
  initScrollSpy();
}
function initNav() {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navBackdrop = document.getElementById("nav-backdrop");
  if (!navToggle || !navMenu)
    return;
  const openNav = () => {
    navMenu.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Cerrar menú de navegación");
    if (navBackdrop)
      navBackdrop.hidden = false;
    document.body.classList.add("nav-open");
  };
  const closeNav = () => {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú de navegación");
    if (navBackdrop)
      navBackdrop.hidden = true;
    document.body.classList.remove("nav-open");
  };
  navToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = navMenu.classList.contains("is-open");
    if (isOpen)
      closeNav();
    else
      openNav();
  });
  navMenu.querySelectorAll(".nav-link, .btn-mobile-wa").forEach((link) => {
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
  const sections = ["inicio", "catalogo", "personaliza", "pedidos", "talleres", "nosotros", "preguntas"].map((id) => document.getElementById(id)).filter(Boolean);
  const navLinks = document.querySelectorAll(".nav-link");
  const updateScrollSpy = () => {
    const scrollPos = window.scrollY + 140;
    let currentId = "inicio";
    for (const sec of sections) {
      if (sec.offsetTop <= scrollPos) {
        currentId = sec.id;
      }
    }
    navLinks.forEach((link) => {
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
var fotoHero = document.getElementById("foto");
if (fotoHero) {
  window.addEventListener("scroll", () => {
    const opacidad = 1 - window.scrollY / (window.innerHeight * 0.85);
    fotoHero.style.opacity = Math.max(opacidad, 0);
  }, { passive: true });
}
var header = document.querySelector("header");
function setHh() {
  if (header) {
    document.documentElement.style.setProperty("--hh", header.getBoundingClientRect().height + "px");
  }
}
setHh();
window.addEventListener("resize", setHh);
