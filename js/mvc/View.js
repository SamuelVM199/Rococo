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

  self.buildIdeas = () => {
    const ideas = model.getIdeas ? model.getIdeas() : [];
    const box = $("#pv-ideas-chips");
    if (!box) return;
    const st = model.getState();
    box.innerHTML = ideas.map(idea => {
      const isAct = st.ideaSugerida === idea.n;
      return `<button type="button" class="pv-idea-chip ${isAct ? 'active' : ''}" data-id="${esc(idea.id)}" title="${esc(idea.desc)}">
        <img src="${esc(idea.img)}" alt="">
        <span>${esc(idea.n)}</span>
      </button>`;
    }).join("");
    $$(".pv-idea-chip", btn => {
      btn.onclick = () => {
        const id = btn.dataset.id;
        const idea = ideas.find(it => it.id === id);
        if (idea && cb && cb.onIdea) cb.onIdea(idea);
      };
    });
  };

  self.renderFotos = () => {
    const isMobile = typeof navigator !== "undefined" && (
      /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      (navigator.maxTouchPoints > 1 && /Macintosh/i.test(navigator.userAgent))
    );

    const desktopNotice = $("#notice-desktop-foto");
    const mobileWrap = $("#wrap-mobile-foto");
    if (desktopNotice && mobileWrap) {
      desktopNotice.hidden = isMobile;
      mobileWrap.hidden = !isMobile;
    }

    const st = model.getState();
    const list = $("#q-fotos-list");
    const addBtn = $("#q-fotos-add");
    const pvStrip = $("#pv-fotos-strip");
    const pvThumbs = $("#pv-fotos-thumbs");
    if (list) {
      if (!st.fotos || st.fotos.length === 0) {
        list.hidden = true;
        list.innerHTML = "";
        if (addBtn) addBtn.hidden = true;
        const dropT = $("#drop-t"); if (dropT) dropT.textContent = "Sube tus fotos o dibujos del bordado";
        const dropS = $("#drop-s"); if (dropS) dropS.textContent = "Puedes seleccionar varias fotos (JPG o PNG). Toca aquí o arrástralas.";
      } else {
        list.hidden = false;
        if (addBtn) addBtn.hidden = false;
        const dropT = $("#drop-t"); if (dropT) dropT.textContent = `${st.fotos.length} fotografía(s) de diseño`;
        const dropS = $("#drop-s"); if (dropS) dropS.textContent = "Toca para agregar más fotos o arrástralas aquí.";
        list.innerHTML = st.fotos.map((f, i) => {
          const isAct = i === st.fotoActiva;
          return `<div class="foto-card ${isAct ? 'active' : ''}">
            <div class="foto-thumb-wrap js-pick-foto" data-idx="${i}" title="Toca para ver en la pieza">
              <img src="${f.url}" alt="${esc(f.name)}" class="foto-thumb">
              ${isAct ? '<span class="foto-badge">En la pieza</span>' : ''}
            </div>
            <div class="foto-info">
              <span class="foto-name" title="${esc(f.name)}">${esc(f.name)}</span>
              <button type="button" class="foto-del js-del-foto" data-idx="${i}" title="Quitar foto" aria-label="Quitar ${esc(f.name)}">×</button>
            </div>
          </div>`;
        }).join("");

        $$(".js-pick-foto", el => {
          el.onclick = () => { if (cb && cb.onPickFoto) cb.onPickFoto(+el.dataset.idx); };
        });
        $$(".js-del-foto", el => {
          el.onclick = e => {
            e.stopPropagation();
            if (cb && cb.onDelFoto) cb.onDelFoto(+el.dataset.idx);
          };
        });
      }
    }

    if (pvStrip && pvThumbs) {
      if (!st.fotos || st.fotos.length === 0) {
        pvStrip.hidden = true;
        pvThumbs.innerHTML = "";
      } else {
        pvStrip.hidden = false;
        pvThumbs.innerHTML = st.fotos.map((f, i) => {
          const isAct = i === st.fotoActiva;
          return `<button type="button" class="pv-thumb-btn ${isAct ? 'active' : ''} js-pv-pick" data-idx="${i}" title="${esc(f.name)}">
            <img src="${f.url}" alt="${esc(f.name)}">
          </button>`;
        }).join("");
        $$(".js-pv-pick", btn => {
          btn.onclick = () => { if (cb && cb.onPickFoto) cb.onPickFoto(+btn.dataset.idx); };
        });
      }
    }
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

    const activeFoto = st.fotos && st.fotos.length > 0
      ? st.fotos[st.fotoActiva || 0]
      : (st.foto ? { url: st.foto, name: st.fotoNombre || "diseño" } : null);

    const hasImg = !!activeFoto;
    const imgH = W;
    const fs = Math.max(10, W / Math.max(4, txt.length * 0.55)) * le.k * 0.9;
    const textH = txt ? fs * 1.15 : 0;
    const totalH = (hasImg ? imgH : 0) + (hasImg && txt ? 8 : 0) + textH;
    const top = cy - totalH / 2;
    let design = "";
    if (hasImg) {
      design += `<image href="${activeFoto.url}" x="${cx - imgH / 2}" y="${top}" width="${imgH}" height="${imgH}" preserveAspectRatio="xMidYMid meet"/>`;
    }
    const textY = top + (hasImg ? imgH + 8 : 0) + fs * 0.85;
    if (txt) {
      design += `<text x="${cx}" y="${textY}" text-anchor="middle" font-family="${le.f}" font-size="${fs.toFixed(1)}" fill="${col}" stroke-width="${multi !== col ? 0.8 : 0}" stroke="${multi}">${esc(txt)}</text>`;
    }
    if (!hasImg && !txt) {
      design = `<text x="${cx}" y="${cy}" text-anchor="middle" font-family="Quicksand, sans-serif" font-size="13" fill="${dark ? '#fdf0f5' : '#6b5f7a'}">Tu diseño o idea aquí</text>`;
    }
    const r = Math.max(W, Math.max(totalH, W * 0.85)) / 2 + 14;
    const pv = $("#pv");
    if (pv) {
      pv.innerHTML = `<rect width="400" height="440" fill="transparent"/>${sh.draw(tela.c)}
        <circle class="hoop" cx="${cx}" cy="${cy}" r="${r.toFixed(1)}"/>${design}`;
    }
    const pvCap = $("#pv-cap");
    if (pvCap) {
      let capExtra = "";
      if (activeFoto) {
        capExtra = ` · Diseño: <b>${esc(activeFoto.name)}</b>`;
      } else if (st.ideaSugerida) {
        capExtra = ` · Idea: <b>${esc(st.ideaSugerida)}</b>`;
      }
      pvCap.innerHTML = `<b>${q.piezas.find(p => p.id === st.pieza).n}</b> · ${tela.n} · ${tam.n} (${tam.d})${capExtra}`;
    }
    self.progress();
  };

  self.progress = () => {
    const isMobile = typeof navigator !== "undefined" && (
      /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      (navigator.maxTouchPoints > 1 && /Macintosh/i.test(navigator.userAgent))
    );
    const st = model.getState();
    const txtInput = $("#q-texto");
    const txt = txtInput ? txtInput.value.trim() : "";
    const notasInput = $("#q-notas");
    const notasVal = notasInput ? notasInput.value.trim() : "";
    const nameInput = $("#q-nombre");
    const nameVal = nameInput ? nameInput.value.trim() : "";
    const hasDesign = (isMobile && st.fotos && st.fotos.length > 0) || !!st.ideaSugerida || !!txt || (!isMobile && !!notasVal);
    const done = [true, hasDesign, st.hilos.length > 0, !!nameVal];
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

  /* fotografías de diseño */
  function loadFiles(fileList) {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList).filter(f => f.type.startsWith("image/"));
    if (files.length === 0) {
      self.showErr("Selecciona al menos un archivo de imagen (JPG o PNG).");
      return;
    }
    self.showErr("");
    files.forEach(file => {
      const fr = new FileReader();
      fr.onload = () => {
        const im = new Image();
        im.onload = () => {
          const m = 700, k = Math.min(1, m / Math.max(im.width, im.height));
          const c = document.createElement("canvas");
          c.width = im.width * k;
          c.height = im.height * k;
          c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
          if (cb && cb.onFoto) cb.onFoto(c.toDataURL("image/jpeg", 0.85), file.name, file);
        };
        im.src = fr.result;
      };
      fr.readAsDataURL(file);
    });
  }

  const qFoto = $("#q-foto");
  if (qFoto) {
    qFoto.addEventListener("change", e => {
      loadFiles(e.target.files);
      qFoto.value = "";
    });
  }
  const qFotosAdd = $("#q-fotos-add");
  if (qFotosAdd && qFoto) {
    qFotosAdd.onclick = () => qFoto.click();
  }
  const drop = $("#drop");
  if (drop) {
    ["dragenter", "dragover"].forEach(ev => drop.addEventListener(ev, e => {
      e.preventDefault();
      drop.classList.add("over");
    }));
    ["dragleave", "drop"].forEach(ev => drop.addEventListener(ev, e => {
      e.preventDefault();
      drop.classList.remove("over");
    }));
    drop.addEventListener("drop", e => {
      e.preventDefault();
      drop.classList.remove("over");
      if (e.dataTransfer && e.dataTransfer.files) {
        loadFiles(e.dataTransfer.files);
      }
    });
  }

  /* envío */
  if (qform) {
    qform.addEventListener("submit", async e => {
      e.preventDefault();
      const nameInput = $("#q-nombre");
      if (!nameInput || !nameInput.value.trim()) {
        self.showErr("Escribe tu nombre para que sepamos a quién responder.");
        if (nameInput) nameInput.focus();
        return;
      }
      const isMobile = typeof navigator !== "undefined" && (
        /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (navigator.maxTouchPoints > 1 && /Macintosh/i.test(navigator.userAgent))
      );
      const st = model.getState();
      const txtInput = $("#q-texto");
      const notasInput = $("#q-notas");
      const hasTxt = txtInput && txtInput.value.trim();
      const hasNotas = notasInput && notasInput.value.trim();
      const hasDesign = (isMobile && st.fotos && st.fotos.length > 0) || !!st.ideaSugerida || !!hasTxt || !!hasNotas;
      if (!hasDesign) {
        if (isMobile) {
          self.showErr("Sube al menos una foto de tu diseño, escribe un texto o descríbelo en las notas.");
        } else {
          self.showErr("Escribe un texto bordado, descríbelo en las notas o elige una idea.");
        }
        return;
      }
      self.showErr("");

      const sendBtn = $("#q-send");
      const origHtml = sendBtn ? sendBtn.innerHTML : "";
      if (sendBtn) {
        sendBtn.disabled = true;
        sendBtn.textContent = "Abriendo WhatsApp...";
      }

      try {
        if (cb && cb.onEnviar) {
          await cb.onEnviar(model.getState());
        }
      } finally {
        if (sendBtn) {
          sendBtn.disabled = false;
          sendBtn.innerHTML = origHtml;
        }
      }

      const qDoneFoto = $("#q-done-foto");
      if (qDoneFoto) {
        const latestSt = model.getState();
        const fotosReales = (latestSt.fotos || []).filter(f => !f.isIdea);
        if (isMobile && fotosReales.length > 0) {
          qDoneFoto.hidden = false;
          qDoneFoto.textContent = `Tus ${fotosReales.length} fotografía(s) de diseño se enviarán directamente en el chat de WhatsApp.`;
        } else if (latestSt.ideaSugerida) {
          qDoneFoto.hidden = false;
          qDoneFoto.textContent = `Cuéntanos los detalles de tu idea «${latestSt.ideaSugerida}» al iniciar la conversación.`;
        } else {
          qDoneFoto.hidden = true;
        }
      }
      const qDone = $("#q-done");
      if (qDone) qDone.hidden = false;
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
