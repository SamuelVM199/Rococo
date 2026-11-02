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
    onFoto: (dataUrl, nombre) => { model.setFoto(dataUrl, nombre); },
    limpiarFoto: () => { model.limpiarFoto(); },
    onEnviar: st => {
      const a = document.createElement("a");
      a.href = "https://wa.me/" + config.whatsapp + "?text=" + encodeURIComponent(mensaje());
      a.target = "_blank"; a.rel = "noopener"; document.body.appendChild(a); a.click(); a.remove();
    },
    mensaje: () => {
      const q = model.getQ();
      const st = model.getState();
      const v = id => document.getElementById(id).value.trim();
      const tam = q.tamanos[st.tam];
      const lines = [
        "Hola, Rococó. Quiero cotizar una pieza personalizada:",
        "",
        "• Pieza: " + q.piezas.find(p => p.id === st.pieza).n,
        "• Tela: " + q.telas[st.tela].n,
        "• Tamaño del bordado: " + tam.n + " (" + tam.d + ")",
        "• Ubicación: " + q.posiciones.find(p => p.id === st.pos).n,
        "• Colores de hilo: " + (st.hilos.length ? st.hilos.map(i => q.hilos[i].n).join(", ") : "a elección de Rococó"),
      ];
      if (v("q-texto")) lines.push("• Texto: «" + v("q-texto") + "» con letra " + q.letras[st.letra].n);
      lines.push("• Diseño: " + (st.foto ? "te envío la foto en este chat" : "sin foto, ver notas"));
      lines.push("• Cantidad: " + (v("q-cant") || "1"));
      if (v("q-fecha")) lines.push("• Fecha deseada: " + new Date(v("q-fecha") + "T12:00").toLocaleDateString("es-MX", {day: "numeric", month: "long", year: "numeric"}));
      lines.push("", "Nombre: " + v("q-nombre"));
      if (v("q-ciudad")) lines.push("Entrega en: " + v("q-ciudad"));
      if (v("q-notas")) lines.push("Notas: " + v("q-notas"));
      if (st.foto) lines.push("", "(Adjunto la foto de mi diseño en el siguiente mensaje)");
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
