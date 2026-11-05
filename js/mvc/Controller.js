/* Controlador: conecta vista y modelo. Orquesta eventos y re-renders. */
export default function Controller(model, view, config) {
  const cb = {
    config,
    onFilter: f => {
      model.setFiltro(f);
      view.renderFilters();
      view.renderGrid();
    },
    onOpen: i => {
      const p = model.getProductos()[i];
      model.setUltimaCat(p.cat);
      model.setAbierto(i);
      view.renderViewer(p);
    },
    onPhoto: (p, k) => view.showPhoto(p, k),
    onPieza: id => {
      model.setPieza(id);
      view.buildOpts();
      view.renderCotizador();
    },
    onTela: i => { model.setTela(i); view.renderCotizador(); },
    onLetra: i => { model.setLetra(i); view.renderCotizador(); },
    onTam: i => { model.setTam(i); view.renderCotizador(); },
    onPos: v => { model.setPos(v); view.renderCotizador(); },
    onHilos: idxs => { model.setHilos(idxs); view.renderCotizador(); },
    onFoto: (dataUrl, nombre, rawFile) => {
      model.addFoto(dataUrl, nombre, false, rawFile);
      view.renderCotizador();
      view.renderFotos();
      view.buildIdeas();
    },
    onPickFoto: idx => {
      model.setFotoActiva(idx);
      view.renderCotizador();
      view.renderFotos();
    },
    onDelFoto: idx => {
      model.removeFoto(idx);
      view.renderCotizador();
      view.renderFotos();
      view.buildIdeas();
    },
    onIdea: idea => {
      model.setIdeaSugerida(idea);
      view.renderCotizador();
      view.renderFotos();
      view.buildIdeas();
    },
    limpiarFoto: () => {
      model.limpiarFotos();
      view.renderCotizador();
      view.renderFotos();
      view.buildIdeas();
    },
    onEnviar: async st => {
      const msg = cb.mensaje();
      const url = "https://wa.me/" + config.whatsapp + "?text=" + encodeURIComponent(msg);
      const qWaLink = document.getElementById("q-wa-link");
      if (qWaLink) qWaLink.href = url;

      const isMobile = typeof navigator !== "undefined" && (
        /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (navigator.maxTouchPoints > 1 && /Macintosh/i.test(navigator.userAgent))
      );

      const rawFiles = model.getRawFiles ? model.getRawFiles() : [];

      // En móvil: mandar las fotos adjuntas vía Web Share API directamente a WhatsApp
      if (isMobile && rawFiles.length > 0 && typeof navigator !== "undefined" && navigator.canShare) {
        try {
          if (navigator.canShare({ files: rawFiles })) {
            await navigator.share({
              files: rawFiles,
              text: msg,
              title: "Cotización Rococó Handmade",
            });
            return;
          }
        } catch (shareErr) {
          if (shareErr.name === "AbortError") return;
        }
      }

      // En computadora o respaldo: abrir WhatsApp con el mensaje completo
      try {
        if (isMobile) {
          window.location.href = url;
        } else {
          const win = window.open(url, "_blank", "noopener,noreferrer");
          if (!win || win.closed || typeof win.closed === "undefined") {
            const a = document.createElement("a");
            a.href = url;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            document.body.appendChild(a);
            a.click();
            a.remove();
          }
        }
      } catch {
        window.location.href = url;
      }
    },
    mensaje: () => {
      const q = model.getQ();
      const st = model.getState();
      const v = id => {
        const el = document.getElementById(id);
        return el ? el.value.trim() : "";
      };
      const piezaObj = q.piezas.find(p => p.id === st.pieza);
      const piezaNombre = piezaObj ? piezaObj.n : st.pieza;
      const telaNombre = q.telas[st.tela] ? q.telas[st.tela].n : "Manta natural";
      const tam = q.tamanos[st.tam] || q.tamanos[1];
      const posObj = q.posiciones.find(p => p.id === st.pos);
      const posNombre = posObj ? posObj.n : st.pos;
      const hilosTexto = st.hilos && st.hilos.length
        ? st.hilos.map(i => q.hilos[i]?.n).filter(Boolean).join(", ")
        : "A elección de Rococó";
      const letraNombre = q.letras[st.letra] ? q.letras[st.letra].n : "Manuscrita";
      const textoBordado = v("q-texto");
      const cant = v("q-cant") || "1";
      const nombre = v("q-nombre");
      const ciudad = v("q-ciudad");
      const notas = v("q-notas");
      const fechaVal = v("q-fecha");

      let fechaStr = "Lo antes posible / Flexible";
      if (fechaVal) {
        try {
          const d = new Date(fechaVal + "T12:00:00");
          if (!isNaN(d.getTime())) {
            fechaStr = d.toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });
          } else {
            fechaStr = fechaVal;
          }
        } catch {
          fechaStr = fechaVal;
        }
      }

      let disenoTexto = "Sin fotos adjuntas (ver texto y notas)";
      const fotosReales = (st.fotos || []).filter(f => !f.isIdea);
      const isMobile = typeof navigator !== "undefined" && (
        /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (navigator.maxTouchPoints > 1 && /Macintosh/i.test(navigator.userAgent))
      );

      if (isMobile && fotosReales.length > 0) {
        const nombres = fotosReales.map(f => f.name).join(", ");
        disenoTexto = `${fotosReales.length} fotografía(s) adjunta(s): ${nombres}`;
      } else if (st.ideaSugerida) {
        disenoTexto = `Idea de catálogo: «${st.ideaSugerida}»`;
      }

      const lines = [
        "✨ *Solicitud de Cotización Personalizada - Rococó Handmade* ✨",
        "",
        "Hola, Rococó. Quiero cotizar una pieza personalizada con los siguientes datos:",
        "",
        "📋 *Detalles de la pieza:*",
        "• Pieza: " + piezaNombre,
        "• Color de tela: " + telaNombre,
        "• Tamaño del bordado: " + tam.n + " (" + tam.d + ")",
        "• Ubicación: " + posNombre,
        "• Colores de hilo: " + hilosTexto,
        "",
        "🎨 *Diseño y bordado:*",
        "• Fotografías / Diseño: " + disenoTexto,
        "• Texto bordado: " + (textoBordado ? `«${textoBordado}»` : "Sin texto bordado"),
        "• Tipo de letra: " + letraNombre,
        "",
        "👤 *Datos del pedido y entrega:*",
        "• Nombre completo: " + (nombre || "No especificado"),
        "• Ciudad de entrega: " + (ciudad || "No especificada (a acordar)"),
        "• Cantidad de piezas: " + cant,
        "• Fecha deseada: " + fechaStr,
        "• Notas para la bordadora: " + (notas || "Ninguna"),
      ];

      if (isMobile && fotosReales.length > 0) {
        lines.push("", `📎 _(Adjunto mis ${fotosReales.length} fotografía(s) de diseño en este mensaje)_`);
      } else if (st.ideaSugerida) {
        lines.push("", `💡 _(Me gustaría un diseño basado en la idea de: ${st.ideaSugerida})_`);
      }

      return lines.join("\n");
    },
  };

  /* contactos js-contact (WhatsApp/Instagram) */
  const contactURL = (msg) => config.whatsapp
    ? "https://wa.me/" + config.whatsapp + "?text=" + encodeURIComponent(msg)
    : "https://ig.me/m/" + config.instagram;
  document.querySelectorAll(".js-contact").forEach(a => {
    a.href = contactURL(a.dataset.msg || "");
    a.target = "_blank"; a.rel = "noopener";
  });
  document.querySelectorAll(".js-contact-label").forEach(s => { s.textContent = config.whatsapp ? "WhatsApp" : "Escríbenos"; });
  if (config.whatsapp) {
    const li = document.getElementById("wa-number");
    if (li) { li.hidden = false; li.textContent = "WhatsApp: +52 953 175 4972"; }
  }

  /* desde el visor: "Personalizar una así" */
  const dvCustom = document.getElementById("dv-custom");
  if (dvCustom) {
    dvCustom.onclick = () => {
      const cat = model.getUltimaCat();
      const pieza = config.cat2pieza[cat] || "tote";
      model.setPieza(pieza);
      view.buildOpts();
      view.renderCotizador();
      const dlg = document.getElementById("viewer"); if (dlg) dlg.close();
      const sec = document.getElementById("personaliza");
      if (sec) sec.scrollIntoView({behavior: "smooth"});
    };
  }

  return cb;
}
