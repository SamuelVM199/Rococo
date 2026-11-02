/* Vista: renderizado del DOM. Recibe el modelo y el holder de callbacks (controlador). */
export default function View(model, cb) {
  const $ = s => document.querySelector(s);
  const $$ = (s, fn) => document.querySelectorAll(s).forEach(fn);

  /* ---- helpers ---- */
  const fmt = n => "$" + n.toLocaleString("es-MX") + " MXN";
  const esc = t => String(t).replace(/[&<>"]/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"
  }[c]));
  const contactURL = (msg) => {
    if (cb.config.whatsapp) return "https://wa.me/" + cb.config.whatsapp + "?text=" + encodeURIComponent(msg);
    return "https://ig.me/m/" + cb.config.instagram;
  };
  const pedirMsg = p => `Hola, Rococó. Me interesa la pieza «${p.nombre}» que vi en su catálogo. ¿Me pueden dar precio y disponibilidad?`;

  /* ---- Catálogo ---- */
  this.renderFilters = () => {
    const counts = model.getCounts();
    const opts = [["todo", "Todo"], ...Object.entries(model.getCats()).filter(([k]) => counts[k])];
    const el = $("#filters");
    el.innerHTML = opts.map(([k, l]) =>
      `<button class="chip" type="button" data-f="${k}" aria-pressed="${k === model.getFiltro()}">${l}<span class="n">${counts[k]}</span></button>`).join("");
    $$("#filters .chip", b => {
      b.onclick = () => { cb.onFilter(b.dataset.f); };
    });
  };

  this.renderGrid = () => {
    const list = model.getProductos();
    const grid = $("#grid");
    grid.innerHTML = list.map(p => `
      <article class="card">
        <button class="ph" type="button" data-i="${p.i}" aria-label="Ver fotos de ${p.nombre}">
          <img src="${cb.config.imgBase}/${p.fotos[0]}" alt="${esc(p.desc)}" loading="lazy">
          ${p.personalizable ? '<span class="badge">Personalizable</span>' : ''}
          ${p.fotos.length > 1 ? `<span class="count">${p.fotos.length} fotos</span>` : ''}
        </button>
        <div class="body">
          <span class="cat">${model.getCats()[p.cat]}</span>
          <h3>${esc(p.nombre)}</h3>
          <p class="desc">${esc(p.desc)}</p>
          <div class="meta">
            ${p.precio ? `<span class="price">${fmt(p.precio)}</span>` : '<span class="price ask">Consulta precio</span>'}
            <a class="btn btn-solid" href="${contactURL(pedirMsg(p))}" target="_blank" rel="noopener">Pedir</a>
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
      b.onclick = () => cb.onOpen(+b.dataset.i);
    });
  };

  /* ---- Visor ---- */
  const dlg = $("#viewer");
  this.renderViewer = (p) => {
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
    $("#dv-btn").textContent = "Pedir por " + (cb.config.whatsapp ? "WhatsApp" : "mensaje directo");
    const thumbs = $("#dv-thumbs");
    thumbs.innerHTML = p.fotos.length > 1 ? p.fotos.map((f, k) =>
      `<button type="button" aria-label="Foto ${k + 1}"><img src="${cb.config.imgBase}/${f}" alt=""></button>`).join("") : "";
    $$("#dv-thumbs button", (b, k) => {
      b.onclick = () => cb.onPhoto(p, k);
    });
    this.showPhoto(p, 0);
    if (typeof dlg.showModal === "function") dlg.showModal();
  };
  this.showPhoto = (p, k) => {
    $("#dv-img").src = cb.config.imgBase + "/" + p.fotos[k];
    $("#dv-img").alt = p.desc;
    $$("#dv-thumbs button", (b, j) => b.setAttribute("aria-current", j === k));
  };

  $("#dv-close").onclick = () => dlg.close();
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });

  /* ---- Cotizador ---- */
  this.buildOpts = () => {
    const q = model.getQ();
    const chips = (el, items, name, type, isOn, label, extraClass = "") => {
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

  this.renderCotizador = () => {
    const q = model.getQ();
    const shapes = model.getShapes();
    const st = model.getState();
    const sh = shapes[st.pieza];
    const tela = q.telas[st.tela];
    const tam = q.tamanos[st.tam];
    const le = q.letras[st.letra];
    const txt = $("#q-texto").value.trim();
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
    $("#pv").innerHTML = `<rect width="400" height="440" fill="transparent"/>${sh.draw(tela.c)}
      <circle class="hoop" cx="${cx}" cy="${cy}" r="${r.toFixed(1)}"/>${design}`;
    $("#pv-cap").innerHTML = `<b>${q.piezas.find(p => p.id === st.pieza).n}</b> · ${tela.n} · ${tam.n} (${tam.d})`;
    this.progress();
  };

  this.progress = () => {
    const st = model.getState();
    const txt = $("#q-texto").value.trim();
    const done = [true, !!(st.foto || txt), st.hilos.length > 0, !!$("#q-nombre").value.trim()];
    done.forEach((d, i) => { const el = $("#ok" + (i + 1)); if (el) el.textContent = d ? "✓ listo" : ""; });
    const prog = $("#qprog"); if (prog) prog.style.width = (done.filter(Boolean).length / 4 * 100) + "%";
  };

  this.showErr = (m) => {
    const e = $("#q-err"); e.textContent = m; e.hidden = !m;
  };

  /* wires del cotizador */
  $("#qform").addEventListener("change", e => {
    const t = e.target;
    if (t.name === "pieza") cb.onPieza(t.value);
    if (t.name === "tela") cb.onTela(+t.value);
    if (t.name === "letra") cb.onLetra(+t.value);
    if (t.name === "tam") cb.onTam(+t.value);
    if (t.name === "pos") cb.onPos(t.value);
    if (t.name === "hilo") cb.onHilos([...document.querySelectorAll('input[name=hilo]:checked')].map(x => +x.value));
  });
  ["q-texto", "q-nombre"].forEach(id => $("#" + id).addEventListener("input", () => this.renderCotizador()));

  /* foto */
  function loadFile(file) {
    if (!file || !file.type.startsWith("image/")) { this.showErr("El archivo debe ser una imagen (JPG o PNG)."); return; }
    const fr = new FileReader();
    fr.onload = () => {
      const im = new Image();
      im.onload = () => {
        const m = 700, k = Math.min(1, m / Math.max(im.width, im.height));
        const c = document.createElement("canvas"); c.width = im.width * k; c.height = im.height * k;
        c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
        cb.onFoto(c.toDataURL("image/jpeg", 0.85), file.name);
        $("#drop-img").src = model.getState().foto; $("#drop-img").hidden = false;
        $("#drop-t").textContent = "Foto lista"; $("#drop-s").textContent = file.name;
        $("#q-foto-x").hidden = false;
        this.renderCotizador();
      };
      im.src = fr.result;
    };
    fr.readAsDataURL(file);
  }
  $("#q-foto").addEventListener("change", e => loadFile.call(this, e.target.files[0]));
  const drop = $("#drop");
  ["dragenter", "dragover"].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add("over"); }));
  ["dragleave", "drop"].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove("over"); }));
  drop.addEventListener("drop", e => loadFile.call(this, e.dataTransfer.files[0]));
  $("#q-foto-x").onclick = () => {
    cb.limpiarFoto();
    $("#q-foto").value = "";
    $("#drop-img").hidden = true;
    $("#drop-t").textContent = "Sube la foto o dibujo del bordado";
    $("#drop-s").textContent = "JPG o PNG. Toca aquí o arrastra la imagen.";
    $("#q-foto-x").hidden = true;
    this.renderCotizador();
  };

  /* envío */
  $("#qform").addEventListener("submit", e => {
    e.preventDefault();
    if (!$("#q-nombre").value.trim()) { this.showErr("Escribe tu nombre para que sepamos a quién responder."); $("#q-nombre").focus(); return; }
    const st = model.getState();
    if (!st.foto && !$("#q-texto").value.trim() && !$("#q-notas").value.trim()) {
      this.showErr("Sube una foto de tu diseño, escribe un texto o descríbelo en las notas."); return;
    }
    this.showErr("");
    cb.onEnviar(st);
    $("#q-done-foto").hidden = !st.foto;
    $("#q-done").hidden = false;
  });
  $("#q-copy").onclick = async () => {
    try {
      await navigator.clipboard.writeText(cb.mensaje());
      $("#q-copy").textContent = "solicitud copiada";
    } catch {
      $("#q-notas").focus(); $("#q-copy").textContent = "no se pudo copiar; envíanos los datos a mano";
    }
  };

  /* ---- Hash / navegación simple ---- */
  this.scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({behavior: "smooth"});
  };
}
