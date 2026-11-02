/* Router ligero: navega por hash (#catalogo, #personaliza, #pedidos, etc.) con scroll suave. */
export default function Router() {
  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({behavior: "smooth", block: "start"});
  };

  const handleHash = () => {
    const hash = location.hash.replace(/^#/, "");
    if (!hash) return;
    // solo navega si hay un elemento con ese id
    go(hash);
  };

  return {
    init() {
      // enlaces internos con hash
      document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener("click", e => {
          const id = a.getAttribute("href").slice(1);
          if (document.getElementById(id)) {
            e.preventDefault();
            history.pushState(null, "", "#" + id);
            go(id);
          }
        });
      });
      window.addEventListener("hashchange", handleHash);
      // si se carga con hash directo
      if (location.hash) handleHash();
    },
  };
}
