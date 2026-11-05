/* ======== DATOS PARA EDITAR ========
   precio: número en pesos (ej. 450) o null para mostrar "Consulta precio".
   medidas / material: texto o null para ocultarlo.
   Imágenes: ./img/<archivo>  (nombres normalizados; mantener archivos en img/)
*/
export const CATS = {
  tote: "Tote bags",
  jareta: "Bolsas de jareta",
  cosmetiquera: "Cosmetiqueras",
  ropa: "Ropa bordada",
};

export const PRODUCTOS = [
  {nombre: "Tote Ojo", cat: "tote", fotos: ["tote-ojo.jpg"], precio: null, medidas: null, personalizable: true,
   desc: "Tote de manta con un ojo bordado a mano en azul y rayos dorados."},
  {nombre: "Bolsa Vichy rosa", cat: "jareta", fotos: ["jareta-vichy-rosa-1.jpg", "jareta-vichy-rosa-2.jpg"], precio: null, medidas: null, personalizable: false,
   desc: "Bolsa de jareta en vichy rosa con asas de manta y flores bordadas en negro."},
  {nombre: "Tote Corazoncitos", cat: "tote", fotos: ["tote-corazoncitos-1.jpg", "tote-corazoncitos-2.jpg"], precio: null, medidas: null, personalizable: false,
   desc: "Tote de manta con pequeños corazones bordados y asas largas de tela roja."},
  {nombre: "Bolsa Picnic", cat: "jareta", fotos: ["jareta-picnic.jpg"], precio: null, medidas: null, personalizable: false,
   desc: "Bolsa de jareta en tela de cuadros vichy con cerezas bordadas."},
  {nombre: "Cosmetiquera Jirafas", cat: "cosmetiquera", fotos: ["cosmetiquera-jirafas.jpg"], precio: null, medidas: null, personalizable: true,
   desc: "Cosmetiquera con cierre, bordada con una familia de jirafas, sol y árbol rosa."},
  {nombre: "Bolsa Corazones", cat: "jareta", fotos: ["mezclilla-corazones-1.jpg", "mezclilla-corazones-2.jpg", "mezclilla-corazones-3.jpg"], precio: null, medidas: null, personalizable: false,
   desc: "Bolsa de mezclilla con corazones rojos bordados, jareta de cordón y asa larga."},
  {nombre: "Tote Bolsillos", cat: "tote", fotos: ["tote-bolsillos-negra.jpg", "tote-bolsillos-olivo.jpg", "tote-bolsillos-olivo-look.jpg"], precio: null, medidas: null, personalizable: false,
   desc: "Tote de lona con bolsillos al frente y llavero de corazón bordado. En negro y verde olivo."},
  {nombre: "Bolsa Estrellas", cat: "jareta", fotos: ["jareta-estrellas.jpg"], precio: null, medidas: null, personalizable: false,
   desc: "Bolsa de jareta en terciopelo palo de rosa con estrellas bordadas en dorado."},
  {nombre: "Tote Polillas", cat: "tote", fotos: ["tote-polillas.jpg"], precio: null, medidas: null, personalizable: false,
   desc: "Tote de tela clara con polillas bordadas en azul marino y moño de vichy."},
  {nombre: "Bolsa Cereza", cat: "jareta", fotos: ["jareta-cereza.jpg"], precio: null, medidas: null, personalizable: false,
   desc: "Bolsa de jareta cruzada con cordón de algodón y una cereza bordada."},
  {nombre: "Cosmetiqueras Patchwork", cat: "cosmetiquera", fotos: ["cosmetiqueras-patchwork.jpg"], precio: null, medidas: null, personalizable: false,
   desc: "Cosmetiqueras con cierre en mezclilla, vichy y telas floreadas, con soles y flores bordados."},
  {nombre: "Cosmetiquera Ojo", cat: "cosmetiquera", fotos: ["cosmetiquera-ojo.jpg"], precio: null, medidas: null, personalizable: false,
   desc: "Cosmetiquera color vino con un ojo bordado en hilo dorado."},
  {nombre: "Bolsa Art déco", cat: "jareta", fotos: ["jareta-deco.jpg"], precio: null, medidas: null, personalizable: false,
   desc: "Bolsa de jareta en tela de abanicos dorados con corazones bordados."},
  {nombre: "Tote Mixteca", cat: "tote", fotos: ["tote-mixteca.jpg"], precio: null, medidas: null, personalizable: true,
   desc: "Tote de manta con bordado azul y la palabra «mixteca» en puntada atrás."},
  {nombre: "Bolsa Amuletos", cat: "jareta", fotos: ["jareta-amuletos.jpg"], precio: null, medidas: null, personalizable: false,
   desc: "Bolsa de jareta con asas, cubierta de pequeños amuletos bordados a color."},
  {nombre: "Tote Bosque", cat: "tote", fotos: ["tote-bosque.jpg"], precio: null, medidas: null, personalizable: false,
   desc: "Tote de manta con criaturas del bosque y hojas bordadas a mano."},
  {nombre: "Sudadera Perrito florido", cat: "ropa", fotos: ["sudadera-perrito.jpg"], precio: null, medidas: null, personalizable: true,
   desc: "Sudadera negra con un perrito con corona de flores bordado. Podemos bordar a tu mascota."},
];

/* Opciones del cotizador personalizable */
export const Q = {
  piezas: [
    {id: "tote", n: "Tote bag"},
    {id: "jareta", n: "Bolsa de jareta"},
    {id: "cangurera", n: "Cangurera"},
    {id: "cosmetiquera", n: "Cosmetiquera"},
    {id: "sudadera", n: "Sudadera o prenda"},
  ],
  telas: [
    {n: "Manta natural", c: "#efe5d3"},
    {n: "Negro", c: "#25262d"},
    {n: "Mezclilla", c: "#5d81aa"},
    {n: "Rosa palo", c: "#ecc6d1"},
    {n: "Verde olivo", c: "#7b7f4e"},
    {n: "Vino", c: "#6d2335"},
  ],
  letras: [
    {n: "Manuscrita", f: "Sacramento, cursive", k: 1.5},
    {n: "Cursiva", f: "'Dancing Script', cursive", k: 1.15},
    {n: "Bloque", f: "'Bricolage Grotesque', sans-serif", k: 1},
    {n: "Redondeada", f: "Fredoka, sans-serif", k: 1},
    {n: "Máquina de escribir", f: "'Special Elite', monospace", k: 0.95},
  ],
  tamanos: [
    {n: "Chico", d: "hasta 6 cm", k: 0.42},
    {n: "Mediano", d: "hasta 10 cm", k: 0.68},
    {n: "Grande", d: "hasta 15 cm", k: 1},
  ],
  posiciones: [
    {id: "centro", n: "Centro"},
    {id: "esquina", n: "Esquina inferior"},
    {id: "arriba", n: "Arriba a la izquierda"},
  ],
  hilos: [
    {n: "Azul marino", c: "#1d2b57"},
    {n: "Rojo cereza", c: "#c2334d"},
    {n: "Rosa", c: "#e98aa6"},
    {n: "Dorado", c: "#c9a13b"},
    {n: "Verde olivo", c: "#6b7a3a"},
    {n: "Negro", c: "#16161a"},
    {n: "Blanco", c: "#fbfbf8"},
    {n: "Multicolor", c: "conic-gradient(#c2334d,#c9a13b,#6b7a3a,#5d81aa,#e98aa6,#c2334d)"},
  ],
};

/* Siluetas de cada pieza: área de bordado y dibujo SVG base */
export const SHAPES = {
  tote: {
    area: {x: 200, y: 285, w: 210},
    draw: f => `
      <path d="M128 150 C128 40 190 40 190 150" fill="none" stroke="${f}" stroke-width="15" stroke-linecap="round"/>
      <path d="M210 150 C210 40 272 40 272 150" fill="none" stroke="${f}" stroke-width="15" stroke-linecap="round"/>
      <path d="M128 150 C128 40 190 40 190 150 M210 150 C210 40 272 40 272 150" fill="none" stroke="rgba(0,0,0,.12)" stroke-width="15" stroke-linecap="round" stroke-dasharray="1 0" opacity=".25"/>
      <rect x="70" y="145" width="260" height="275" rx="6" fill="${f}" stroke="rgba(0,0,0,.18)"/>
      <line x1="74" y1="160" x2="326" y2="160" stroke="rgba(0,0,0,.2)" stroke-dasharray="5 5"/>`,
  },
  jareta: {
    area: {x: 200, y: 300, w: 175},
    draw: f => `
      <path d="M150 120 C150 50 250 50 250 120" fill="none" stroke="${f}" stroke-width="13"/>
      <path d="M95 130 Q200 160 305 130 L315 400 Q200 432 85 400 Z" fill="${f}" stroke="rgba(0,0,0,.18)"/>
      <path d="M95 130 Q120 110 140 132 Q160 112 180 134 Q200 114 220 134 Q240 112 260 132 Q280 110 305 130" fill="${f}" stroke="rgba(0,0,0,.18)"/>
      <path d="M100 160 Q200 186 300 160" fill="none" stroke="#f3eee4" stroke-width="5" stroke-linecap="round"/>
      <path d="M110 165 l-12 70 M290 165 l12 70" stroke="#f3eee4" stroke-width="5" stroke-linecap="round"/>`,
  },
  cangurera: {
    area: {x: 200, y: 270, w: 160},
    draw: f => `
      <path d="M10 215 Q200 165 390 215" fill="none" stroke="#3a3a44" stroke-width="14" stroke-linecap="round"/>
      <rect x="70" y="190" width="260" height="150" rx="72" fill="${f}" stroke="rgba(0,0,0,.18)"/>
      <path d="M110 214 Q200 196 290 214" fill="none" stroke="#c9a13b" stroke-width="3" stroke-dasharray="3 3"/>`,
  },
  cosmetiquera: {
    area: {x: 200, y: 285, w: 190},
    draw: f => `
      <rect x="55" y="170" width="290" height="200" rx="34" fill="${f}" stroke="rgba(0,0,0,.18)"/>
      <line x1="80" y1="192" x2="320" y2="192" stroke="#8a8a92" stroke-width="4" stroke-dasharray="2 3"/>
      <rect x="300" y="182" width="26" height="20" rx="4" fill="#b9b9c0"/>`,
  },
  sudadera: {
    area: {x: 200, y: 225, w: 140},
    draw: f => `
      <path d="M150 80 Q200 112 250 80 L335 118 L385 292 L332 306 L305 205 L305 412 L95 412 L95 205 L68 306 L15 292 L65 118 Z" fill="${f}" stroke="rgba(0,0,0,.18)" stroke-linejoin="round"/>
      <path d="M150 80 Q200 112 250 80" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="6"/>
      <rect x="95" y="392" width="210" height="20" fill="rgba(0,0,0,.12)"/>`,
  },
};

export const CAT2PIEZA = {tote: "tote", jareta: "jareta", cosmetiquera: "cosmetiquera", ropa: "sudadera"};

/* Ideas de inspiración de bordado */
export const IDEAS_BORDADO = [
  { id: "perrito", n: "Mascota", img: "img/sudadera-perrito.jpg", desc: "Bordado de tu mascota favorita" },
  { id: "ojo", n: "Ojo místico", img: "img/tote-ojo.jpg", desc: "Ojo protector con rayos dorados" },
  { id: "cereza", n: "Cerezas", img: "img/jareta-cereza.jpg", desc: "Frutas y elementos botánicos" },
  { id: "corazoncitos", n: "Corazoncitos", img: "img/tote-corazoncitos-1.jpg", desc: "Pequeños corazones bordados a mano" },
  { id: "flores", n: "Flores", img: "img/jareta-vichy-rosa-1.jpg", desc: "Flores artesanales en relieve" },
  { id: "jirafas", n: "Animales", img: "img/cosmetiquera-jirafas.jpg", desc: "Diseño tierno con árboles y sol" },
];
