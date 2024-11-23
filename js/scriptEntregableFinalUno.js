const contenedorGaleria = document.querySelector(".swiper-wrapper");
const contenedorServicios = document.getElementById("contenedorServicios");
const contenedorCotizador = document.getElementById("contenedorCotizador");
const totalCotizador = document.getElementById("totalCotizador");
const cotizador = JSON.parse(localStorage.getItem("cotizador")) || [];

const cargarInfo = async () => {
  try {
    const response = await fetch('./js/jsonGalery.json');     
    const data = await response.json()

    renderizarGaleria(data)
    renderizarServicio(data)

    if (!response.ok) {
      throw new Error('Error al cargar el archivo JSON');
    }

  } catch (error) {
    console.error("Error al cargar el archivo JSON", error);
  }
}

const renderizarGaleria = (array) => {

  array.forEach(elm => {
    const slide = document.createElement("div");
    slide.classList.add("swiper-slide");

    const img = document.createElement("img");
    img.src = elm.url;
    img.alt = elm.alt;

    slide.appendChild(img);
    contenedorGaleria.appendChild(slide);
  });

  new Swiper('.swiper', {
    loop: true,
    effect: "flip",
    grabCursor: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

}

const renderizarServicio = (array) => {

  array.forEach((elm)=> {
    
    //Crear elemento html
    const servicioDiv = document.createElement('div');
    servicioDiv.classList.add("bg-box");
    servicioDiv.innerHTML = `
      <img src="${elm.imagen}" alt="${elm.servicio}" >
      <h5>${elm.servicio}</h5>
      <p>Precio: $${elm.precio}</p>
      <h4 class="total${elm.id}"></h4>
      <div class="buttonBox">
        <a id="agregar${elm.id}" class="boton">Agregar a la cotización</a>
        <div class="border"></div>
        <div class="border"></div>
      </div>
    `;
    contenedorServicios.appendChild(servicioDiv);

    //agregar a cotizador
    const botonAgregar = document.getElementById(`agregar${elm.id}`);
    const notificacion = document.getElementById("notificacion");

    botonAgregar.addEventListener('click', function () {
      agregarServicio(elm.id, array);
      notificacion.style.display = "block";

      setTimeout(function () {
        notificacion.style.display = "none";
      }, 
      2300);

    });

  });
}

cargarInfo();


const agregarServicio =(id, servicios)=> {
  const servicioAgregado = servicios.find(servicio=>servicio.id===id)
  
  if(cotizador.some(servicio=>servicio.id===id)) {
      const indexServicio = cotizador.findIndex(servicio=>servicio.id===id)
      cotizador[indexServicio].cantidad++ 
  } else {
      servicioAgregado.cantidad = 1
      cotizador.push(servicioAgregado)
  }

  guardarCotizadorLs()

  console.log("Cotizador después de agregar:", cotizador);

}

const guardarCotizadorLs = () => {
  localStorage.setItem("cotizador", JSON.stringify(cotizador))
} 

const irACotizador = () => {
  guardarCotizadorLs(); 
  window.location.href = "./paginas/cotizador.html"; 
};

// Ejemplo de redirección desde un botón
const botonCotizador = document.getElementById("botonCotizador");
if (botonCotizador) {
  botonCotizador.addEventListener("click", irACotizador);
}

const cargarCotizador = () => {
  if (cotizador.length > 0) {
      actualizarCotizador(cotizador)
  } else {
      contenedorCotizador.innerHTML =`
      <p>El cotizador está vacio</p>
      `;
  }
}