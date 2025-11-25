// Script centralizado: inicializaciones y handlers sin eliminar lógica previa
document.addEventListener("DOMContentLoaded", () => {
  // --- Inicialización de Leaflet (si está cargado y existe el contenedor) ---
  if (window.L && document.getElementById("mapa")) {
    try {
      // Coordenadas aproximadas de Tampico, Tamaulipas
      const coordinates = [22.2757, -97.8639]

      // Crear el mapa
      const mapa = L.map("mapa").setView(coordinates, 16)

      // Agregar tiles de OpenStreetMap
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(mapa)

      // Agregar marcador con popup
      const marker = L.marker(coordinates).addTo(mapa)
      marker
        .bindPopup(`
        <div style="text-align: center;">
          <h4 style="margin: 0 0 0.5rem 0; color: #ff1493;">Papelería Vignol</h4>
          <p style="margin: 0.25rem 0; font-size: 0.9rem;">Lomas de Rosales 387</p>
          <p style="margin: 0.25rem 0; font-size: 0.9rem;">Tampico, Tamaulipas</p>
        </div>
      `)
        .openPopup()
    } catch (err) {
      // en caso de error evitamos romper el resto del script
      console.error("Error inicializando Leaflet:", err)
    }
  }

  // --- Manejo del menú móvil (compatible con distintos id/class existentes) ---
  const menuToggle = document.getElementById("menuToggle") || document.querySelector(".menu-toggle")
  const nav = document.getElementById("nav") || document.getElementById("mobileMenu") || document.querySelector("nav")

  if (menuToggle && nav) {
    // Evitar doble listener si ya se agregó en otro lugar
    const addToggle = () => menuToggle.addEventListener("click", () => nav.classList.toggle("active"))
    // Sólo añadir si no está añadido (no fiable 100% pero útil)
    try {
      addToggle()
    } catch (e) {
      console.warn("No se pudo añadir listener del menú:", e)
    }
  }

  // Cerrar menú al hacer clic en un enlace (buscamos en posibles selectores)
  document.querySelectorAll(".nav a, .mobile-menu a, nav a").forEach((link) => {
    link.addEventListener("click", () => {
      if (nav) nav.classList.remove("active")
    })
  })

  // Scroll suave para anclas internas
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (!href || href === "#") return
      const target = document.querySelector(href)
      if (target) {
        e.preventDefault()
        target.scrollIntoView({ behavior: "smooth" })
      }
    })
  })
})
