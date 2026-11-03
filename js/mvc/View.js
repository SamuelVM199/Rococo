/* Vista: renderizado del DOM. Recibe el modelo y el holder de callbacks (controlador). */
export default function View(model, initialCb) {
  const self = {};
  let cb = initialCb || {};
  self.setController = (c) => { cb = c; };

  const $ = s => document.querySelector(s);
  const $$ = (s, fn) => document.querySelectorAll(s).forEach(fn);

  /* ---- helpers ---- */
  const fmt = n => "$" + n.toLocaleString("es-MX") + " MXN";
  const esc = t => String(t).replace(/[&<>"]/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"
  }[c]));
  const contactURL = (msg) => {
    if (cb && cb.config && cb.config.whatsapp) return "https://wa.me/" + cb.config.whatsapp + "?text=" + encodeURIComponent(msg);
    if (cb && cb.config && cb.config.instagram) return "https://ig.me/m/" + cb.config.instagram;
    return "https://wa.me/529531754972?text=" + encodeURIComponent(msg);
  };
  const pedirMsg = p => `Hola, Rococó. Me interesa la pieza «${p.nombre}» que vi en su catálogo. ¿Me pueden dar precio y disponibilidad?`;

  /* ---- Catálogo ---- */
  self.renderFilters = () => {
    const counts = model.getCounts();
    const opts = [["todo", "Todo"], ...Object.entries(model.getCats()).filter(([k]) => counts[k])];
    const el = $("#filters");
    if (!el) return;
    el.innerHTML = opts.map(([k, l]) =>
      `<button class="chip" type="button" data-f="${k}" aria-pressed="${k === model.getFiltro()}">${l}<span class="n">${counts[k]}</span></button>`).join("");
    $$("#filters .chip", b => {
      b.onclick = () => { if (cb && cb.onFilter) cb.onFilter(b.dataset.f); };
    });
  };

  self.renderGrid = () => {
    const list = model.getProductos();
    const grid = $("#grid");
    if (!grid) return;
    const countEl = $("#catalog-count");
    if (countEl) {
      const f = model.getFiltro();
      const catName = f === "todo" ? "todas las categorías" : (model.getCats()[f] || f);
      countEl.textContent = `Mostrando ${list.length} ${list.length === 1 ? 'pieza' : 'piezas'} (${catName})`;
    }
    const imgBase = (cb && cb.config && cb.config.imgBase) || "img";
    grid.innerHTML = list.map(p => `
      <article class="card">
        <button class="ph" type="button" data-i="${p.i}" aria-label="Ver detalles y fotos de ${p.nombre}">
          <img src="${imgBase}/${p.fotos[0]}" alt="${esc(p.desc)}" loading="lazy">
          ${p.personalizable ? '<span class="badge">Personalizable</span>' : ''}
          ${p.fotos.length > 1 ? `<span class="count">${p.fotos.length} fotos</span>` : ''}
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
        <a class="btn btn-solid" href="${contactURL('Hola, Rococó. Quiero cotizar una pieza personalizada. Mi idea es: ')}" target="_blank" rel="noopener">Cotizar mi pieza</a>
      </div>`;
    $$(".ph", b => {
      b.onclick = () => { if (cb && cb.onOpen) cb.onOpen(+b.dataset.i); };
    });
  };

  /* ---- Visor ---- */
  const dlg = $("#viewer");
  let curProduct = null;
  let curPhotoIdx = 0;

  self.renderViewer = (p) => {
    if (!dlg) return;
    curProduct = p;
    curPhotoIdx = 0;
    $("#dv-cat").textContent = model.getCats()[p.cat];
    $("#dv-title").textContent = p.nombre;
    $("#dv-desc").textContent = p.desc;
    const rows = [["Precio", p.precio ? fmt(p.precio) : "Consulta precio"]];
    if (p.medidas) rows.push(["Medidas", p.medidas]);
    rows.push(["Elaboración", "Bordado a mano"]);
    rows.push(["Personalizable", p.personalizable ? "Sí, bajo cotización" : "Pregunta por colores"]);
    rows.push(["Envío", "Local y nacional"]);
    $("#dv-dl").innerHTML = rows.map(([a, b]) => `<dt>${esc(a)}</dt><dd>${esc(b)}</dd>`).join("");
    $("#dv-btn").href = contactURL(pedirMsg(p));
    const isWa = cb && cb.config && cb.config.whatsapp;
    $("#dv-btn").textContent = "Pedir por " + (isWa ? "WhatsApp" : "mensaje directo");
    const thumbs = $("#dv-thumbs");
    const imgBase = (cb && cb.config && cb.config.imgBase) || "img";
    thumbs.innerHTML = p.fotos.length > 1 ? p.fotos.map((f, k) =>
      `<button type="button" aria-label="Ver foto ${k + 1} de ${p.fotos.length}" aria-current="${k === 0}"><img src="${imgBase}/${f}" alt=""></button>`).join("") : "";
    $$("#dv-thumbs button", (b, k) => {
      b.onclick = () => {
        if (cb && cb.onPhoto) cb.onPhoto(p, k);
        else self.showPhoto(p, k);
      };
    });
    self.showPhoto(p, 0);
    if (typeof dlg.showModal === "function") dlg.showModal();
  };

  self.showPhoto = (p, k) => {
    curProduct = p;
    curPhotoIdx = k;
    const imgBase = (cb && cb.config && cb.config.imgBase) || "img";
    const dvImg = $("#dv-img");
    if (dvImg) {
      dvImg.src = imgBase + "/" + p.fotos[k];
      dvImg.alt = `${p.nombre} · Foto ${k + 1} de ${p.fotos.length}`;
    }
    const prev = $("#dv-prev");
    const next = $("#dv-next");
    const count = $("#dv-counter");
    const hasMany = p.fotos.length > 1;
    if (prev) prev.hidden = !hasMany;
    if (next) next.hidden = !hasMany;
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
      if (!curProduct || curProduct.fotos.length <= 1) return;
      const nextIdx = (curPhotoIdx - 1 + curProduct.fotos.length) % curProduct.fotos.length;
      self.showPhoto(curProduct, nextIdx);
    };
  }
  if (nextBtn) {
    nextBtn.onclick = () => {
      if (!curProduct || curProduct.fotos.length <= 1) return;
      const nextIdx = (curPhotoIdx + 1) % curProduct.fotos.length;
      self.showPhoto(curProduct, nextIdx);
    };
  }
  document.addEventListener("keydown", e => {
    if (!dlg || !dlg.open || !curProduct || curProduct.fotos.length <= 1) return;
    if (e.key === "ArrowLeft") {
      const nextIdx = (curPhotoIdx - 1 + curProduct.fotos.length) % curProduct.fotos.length;
      self.showPhoto(curProduct, nextIdx);
    } else if (e.key === "ArrowRight") {
      const nextIdx = (curPhotoIdx + 1) % curProduct.fotos.length;
      self.showPhoto(curProduct, nextIdx);
    }
  });

  const dvClose = $("#dv-close");
  if (dvClose) dvClose.onclick = () => { if (dlg) dlg.close(); };
  if (dlg) dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });

  /* ---- Cotizador ---- */
  self.buildOpts = () => {
    const q = model.getQ();
    const chips = (el, items, name, type, isOn, label, extraClass = "") => {
      if (!el) return;
      el.innerHTML = items.map((it, i) => `<label class="opt ${extraClass}"><input type="${type}" name="${name}" value="${it.id ?? i}" ${isOn(it, i) ? "checked" : ""}><span>${label(it, i)}</span></label>`).join("");
    };
    const sw = c => `<i class="sw" style="background:${c}"></i>`;

    const st = model.getState();
    chips($("#o-pieza"), q.piezas, "pieza", "radio", it => it.id === st.pieza, it => it.n);
    chips($("#o-tela"), q.telas, "tela", "radio", (it, i) => i === st.tela, it => sw(it.c) + it.n);
    chips($("#o-letra"), q.letras, "letra", "radio", (it, i) => i === st.letra, it => `<em style="font-family:${it.f};font-size:${it.k}em;line-height:1">${it.n}</em>`, "font-opt");
    chips($("#o-tam"), q.tamanos, "tam", "radio", (it, i) => i === st.tam, it => `${it.n} <small>${it.d}</small>`);
    chips($("#o-pos"), q.posiciones, "pos", "radio", it => it.id === st.pos, it => it.n);
    chips($("#o-hilo"), q.hilos, "hilo", "checkbox", (it, i) => st.hilos.includes(i), it => sw(it.c) + it.n);
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
    if (col.startsWith("conic")) col = "#c2334d";
    const multi = st.hilos.length > 1 ? q.hilos[st.hilos[1]].c : col;
    const W = sh.area.w * tam.k * (st.pos === "centro" ? 1 : 0.62);
    let cx = sh.area.x, cy = sh.area.y;
    if (st.pos === "esquina") { cx += sh.area.w * 0.34; cy += sh.area.w * 0.32; }
    if (st.pos === "arriba")  { cx -= sh.area.w * 0.3;  cy -= sh.area.w * 0.3;  }
    const hasImg = !!st.foto;
    const imgH = W;
    const fs = Math.max(10, W / Math.max(4, txt.length * 0.55)) * le.k * 0.9;
    const totalH = imgH + (txt ? fs * 1.1 : 0);
    const top = cy - totalH / 2;
    let design = "";
    if (hasImg) design += `<image href="${st.foto}" x="${cx - imgH / 2}" y="${top}" width="${imgH}" height="${imgH}" preserveAspectRatio="xMidYMid meet"/>`;
    if (txt)    design += `<text x="${cx}" y="${top + imgH + fs * 0.85}" text-anchor="middle" font-family="${le.f}" font-size="${fs.toFixed(1)}" fill="${col}" stroke-width="${multi !== col ? 0.8 : 0}" stroke="${multi}">${esc(txt)}</text>`;
    if (!hasImg && !txt) {
      design = `<text x="${cx}" y="${cy}" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="13" fill="${dark ? '#fdf0f5' : '#6b5f7a'}">Tu bordado aquí</text>`;
    }
    const r = Math.max(W, totalH) / 2 + 14;
    const pv = $("#pv");
    if (pv) {
      pv.innerHTML = `<rect width="400" height="440" fill="transparent"/>${sh.draw(tela.c)}
        <circle class="hoop" cx="${cx}" cy="${cy}" r="${r.toFixed(1)}"/>${design}`;
    }
    const pvCap = $("#pv-cap");
    if (pvCap) {
      pvCap.innerHTML = `<b>${q.piezas.find(p => p.id === st.pieza).n}</b> · ${tela.n} · ${tam.n} (${tam.d})`;
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
    done.forEach((d, i) => { const el = $("#ok" + (i + 1)); if (el) el.textContent = d ? "✓ listo" : ""; });
    const prog = $("#qprog"); if (prog) prog.style.width = (done.filter(Boolean).length / 4 * 100) + "%";
  };

  self.showErr = (m) => {
    const e = $("#q-err");
    if (e) {
      e.textContent = m;
      e.hidden = !m;
    }
  };

  /* wires del cotizador */
  const qform = $("#qform");
  if (qform) {
    qform.addEventListener("change", e => {
      const t = e.target;
      if (!cb) return;
      if (t.name === "pieza" && cb.onPieza) cb.onPieza(t.value);
      if (t.name === "tela" && cb.onTela) cb.onTela(+t.value);
      if (t.name === "letra" && cb.onLetra) cb.onLetra(+t.value);
      if (t.name === "tam" && cb.onTam) cb.onTam(+t.value);
      if (t.name === "pos" && cb.onPos) cb.onPos(t.value);
      if (t.name === "hilo" && cb.onHilos) cb.onHilos([...document.querySelectorAll('input[name=hilo]:checked')].map(x => +x.value));
    });
  }
  ["q-texto", "q-nombre"].forEach(id => {
    const el = $("#" + id);
    if (el) el.addEventListener("input", () => self.renderCotizador());
  });

  /* foto */
  function loadFile(file) {
    if (!file || !file.type.startsWith("image/")) { self.showErr("El archivo debe ser una imagen (JPG o PNG)."); return; }
    const fr = new FileReader();
    fr.onload = () => {
      const im = new Image();
      im.onload = () => {
        const m = 700, k = Math.min(1, m / Math.max(im.width, im.height));
        const c = document.createElement("canvas"); c.width = im.width * k; c.height = im.height * k;
        c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
        if (cb && cb.onFoto) cb.onFoto(c.toDataURL("image/jpeg", 0.85), file.name);
        const dropImg = $("#drop-img");
        if (dropImg) {
          dropImg.src = model.getState().foto;
          dropImg.hidden = false;
        }
        const dropT = $("#drop-t"); if (dropT) dropT.textContent = "Foto lista";
        const dropS = $("#drop-s"); if (dropS) dropS.textContent = file.name;
        const qFotoX = $("#q-foto-x"); if (qFotoX) qFotoX.hidden = false;
        self.renderCotizador();
      };
      im.src = fr.result;
    };
    fr.readAsDataURL(file);
  }
  const qFoto = $("#q-foto");
  if (qFoto) qFoto.addEventListener("change", e => loadFile(e.target.files[0]));
  const drop = $("#drop");
  if (drop) {
    ["dragenter", "dragover"].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add("over"); }));
    ["dragleave", "drop"].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove("over"); }));
    drop.addEventListener("drop", e => loadFile(e.dataTransfer.files[0]));
  }
  const qFotoX = $("#q-foto-x");
  if (qFotoX) {
    qFotoX.onclick = () => {
      if (cb && cb.limpiarFoto) cb.limpiarFoto();
      if (qFoto) qFoto.value = "";
      const dropImg = $("#drop-img"); if (dropImg) dropImg.hidden = true;
      const dropT = $("#drop-t"); if (dropT) dropT.textContent = "Sube la foto o dibujo del bordado";
      const dropS = $("#drop-s"); if (dropS) dropS.textContent = "JPG o PNG. Toca aquí o arrastra la imagen.";
      qFotoX.hidden = true;
      self.renderCotizador();
    };
  }

  /* envío */
  if (qform) {
    qform.addEventListener("submit", e => {
      e.preventDefault();
      const nameInput = $("#q-nombre");
      if (!nameInput || !nameInput.value.trim()) {
        self.showErr("Escribe tu nombre para que sepamos a quién responder.");
        if (nameInput) nameInput.focus();
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
      if (cb && cb.onEnviar) cb.onEnviar(st);
      const qDoneFoto = $("#q-done-foto"); if (qDoneFoto) qDoneFoto.hidden = !st.foto;
      const qDone = $("#q-done"); if (qDone) qDone.hidden = false;
    });
  }

  /* Establecer fecha mínima para entrega (hoy) para prevenir errores de entrada */
  const fechaEl = $("#q-fecha");
  if (fechaEl) {
    const todayStr = new Date().toISOString().split("T")[0];
    fechaEl.min = todayStr;
  }

  const qCopy = $("#q-copy");
  if (qCopy) {
    qCopy.onclick = async () => {
      try {
        if (cb && cb.mensaje) await navigator.clipboard.writeText(cb.mensaje());
        const orig = qCopy.textContent;
        qCopy.textContent = "✓ ¡Solicitud copiada al portapapeles!";
        setTimeout(() => { qCopy.textContent = orig; }, 3500);
      } catch {
        const qNotas = $("#q-notas"); if (qNotas) qNotas.focus();
        qCopy.textContent = "No se pudo copiar automáticamente; copia tus datos manualmente";
      }
    };
  }

  /* ---- Hash / navegación simple ---- */
  self.scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({behavior: "smooth"});
  };

  return self;
}
