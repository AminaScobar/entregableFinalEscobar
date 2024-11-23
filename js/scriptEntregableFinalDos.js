const contenedorCotizador = document.getElementById("contenedorCotizador");
const totalCotizador = document.getElementById("totalCotizador");
const cotizador = JSON.parse(localStorage.getItem("cotizador")) || [];


const actualizarCotizador = () => {
  contenedorCotizador.innerHTML = "";

  if (cotizador.length === 0) {
    contenedorCotizador.innerHTML = `<p>El cotizador está vacío</p>`;
    totalCotizador.innerHTML = "";
    return;
  }

  cotizador.forEach((elm) => {
    const cotizadorDiv = document.createElement("div");
    cotizadorDiv.classList.add("bg-box3");
    cotizadorDiv.innerHTML = `
      <p class="p2 m-p"><strong>${elm.servicio}</strong></p>
      <p class="p2 mb-p">Precio unitario: $${elm.precio}</p>
      <p class="mb-p">Cantidad: <strong id="cantidad-${elm.id}" class="h3">${elm.cantidad}</strong></p>
      <button class="buttonEliminar mb-p" data-id="${elm.id}">Eliminar de la cotización</button>`;
    contenedorCotizador.appendChild(cotizadorDiv);
  });

  totalCotizador.innerHTML = `
    <div class="flotante">
      <h4>Total: $${cotizador.reduce((acc, elm) => acc + elm.precio * elm.cantidad, 0)}</h4>
    </div>
  `;
};

const eliminarServicio = (id) => {

    const index = cotizador.findIndex((servicio) => servicio.id === id);
    if (index !== -1) {
      cotizador.splice(index, 1); 
      localStorage.setItem("cotizador", JSON.stringify(cotizador)); 
      actualizarCotizador(); 
    } else {
      console.error(`No se encontró el servicio con id ${id}`);
    }
  };

contenedorCotizador.addEventListener("click", (event) => {
  if (event.target.classList.contains("buttonEliminar")) {
    const id = event.target.dataset.id;
    eliminarServicio(id);
  }
});

document.addEventListener("DOMContentLoaded", () => {
    actualizarCotizador();
  });

  /******  formulario  *****/

  const form = document.getElementById('contactForm');
  const thankYouMessage = document.getElementById('thankYouMessage');

  form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    form.style.display = 'none'; 
    thankYouMessage.style.display = 'block'; 
  });