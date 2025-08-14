const contenedorProyectos = document.getElementById('proyectos-container');
const modalProyecto = document.getElementById('modal-proyecto');
const btnMostrarForm = document.getElementById('btn-mostrar-form');
const btnCancelar = document.getElementById('btn-cancelar-proyecto');
const formProyecto = document.getElementById('form-proyecto');

let proyectos = [];
let deferredPrompt;

// ----------------------
// Mostrar formulario
// ----------------------
btnMostrarForm.addEventListener('click', () => {
  modalProyecto.style.display = 'flex';
  document.body.style.overflow = 'hidden';
});

btnCancelar.addEventListener('click', () => {
  modalProyecto.style.display = 'none';
  document.body.style.overflow = '';
  formProyecto.reset();
});

// ----------------------
// Guardar proyectos en localStorage
// ----------------------
function guardarProyectosLocal() {
  localStorage.setItem('proyectos', JSON.stringify(proyectos));
}

// ----------------------
// Cargar proyectos de localStorage
// ----------------------
function cargarProyectos() {
  const guardados = localStorage.getItem('proyectos');
  if (guardados) {
    proyectos = JSON.parse(guardados);
  }
  mostrarProyectos();
}

// ----------------------
// Mostrar proyectos en el contenedor
// ----------------------
function mostrarProyectos() {
  contenedorProyectos.innerHTML = '';
  proyectos.forEach(proyecto => {
    const card = document.createElement('portfolio-product-card');
    card.title = proyecto.title;
    card.description = proyecto.description;
    card.imageUrl = proyecto.imageUrl;
    card.link = proyecto.link;
    contenedorProyectos.appendChild(card);
  });
}

// ----------------------
// Manejar envío del formulario
// ----------------------
formProyecto.addEventListener('submit', (e) => {
  e.preventDefault();

  const nuevoProyecto = {
    title: document.getElementById('proyecto-titulo').value,
    description: document.getElementById('proyecto-descripcion').value,
    imageUrl: document.getElementById('proyecto-imagen').value,
    link: document.getElementById('proyecto-link').value
  };

  proyectos.push(nuevoProyecto);
  guardarProyectosLocal();
  mostrarProyectos();

  modalProyecto.style.display = 'none';
  document.body.style.overflow = '';
  formProyecto.reset();
});

// ----------------------
// beforeinstallprompt
// ----------------------
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // Previene el prompt automático
  deferredPrompt = e; // Guardamos el evento

  // Mostramos el botón para instalar
  const bannerInstall = document.querySelector('#banner-install');
  if (bannerInstall) {
    bannerInstall.style.display = 'block';
  }
});

// ----------------------
// Escuchar clic en botón "Instalar App"
// ----------------------
document.addEventListener('install-app', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt(); // Abre ventana de instalación
    const choiceResult = await deferredPrompt.userChoice;
    console.log(`Usuario seleccionó: ${choiceResult.outcome}`);
    deferredPrompt = null; // Limpiamos el evento
  } else {
    console.log("No hay instalación pendiente.");
  }
});

// ----------------------
// Cargar proyectos y registrar Service Worker
// ----------------------
window.addEventListener('load', async () => {
  cargarProyectos();

  // Solicitar permiso para notificaciones
  const permission = await Notification.requestPermission();
  if (permission === "granted" && 'serviceWorker' in navigator) {
    try {
      const basePath = location.hostname === "localhost" ? "" : "/PortafolioInteractivo";

      // Registramos Service Worker
      const registration = await navigator.serviceWorker.register(`${basePath}/sw.js`);
      
      // Esperamos que el Service Worker esté listo
      const swReg = await navigator.serviceWorker.ready;

      // Mostramos notificación
      swReg.showNotification("Portafolio Digital", {
        body: "La aplicación se ha instalado correctamente",
        icon: `/src/images/icons/256.png`,
        vibrate: [100, 50, 200],
      });

    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  } else {
    console.log("Permiso de notificación no concedido o Service Worker no disponible");
  }
});
