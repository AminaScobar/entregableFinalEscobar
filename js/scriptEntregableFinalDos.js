

const contenedorServicios = document.getElementById("contenedorServicios");
const contenedorCotizador = document.getElementById("contenedorCotizador");
const totalCotizador = document.getElementById("totalCotizador");
const cotizador = [];

const agregarCotizador =(id)=> {
    const servicioAgregado = servicios.find(servicio=>servicio.id===id)
    
    if(cotizador.some(servicio=>servicio.id===id)) {
        const indexServicio = cotizador.findIndex(servicio=>servicio.id===id)
        cotizador[indexServicio].cantidad++ 
    } else {
        cotizador.push(servicioAgregado)
    }
}

const elinimarServicio =(id)=> {
    const servicioEliminado = cotizador.find(servicio=>servicio.id===id)
    const indexServicio = cotizador.indexOf(servicioEliminado)

    cotizador.splice(indexServicio, 1)
}

const actualizarCotizador =()=> {

    contenedorCotizador.innerHTML ="";

    cotizador.forEach((servicio)=> {
        const cotizadorDiv = document.createElement('div');
        cotizadorDiv.classList.add("bg-box3");
        cotizadorDiv.innerHTML = `
        <p class="p2"> <strong>${servicio.servicio}</strong></p>
        <p class="p2">Precio unitario: $${servicio.precio}</p>
        <p>cantidad: <strong>${servicio.cantidad}</strong></p>
        <button class="buttonEliminar" id="eliminar${servicio.id}"> Eliminar de la cotización</button> 
    `; 
    contenedorCotizador.appendChild(cotizadorDiv)

    const eliminarBoton = document.getElementById(`eliminar${servicio.id}`) 
    eliminarBoton.addEventListener('click', function () {
        elinimarServicio(servicio.id);
        actualizarCotizador();
    })
  })

  totalCotizador.innerHTML = `
  <div class="flotante">
     <h4>Total $${cotizador.reduce((acc,servicio)=> acc + (servicio.precio*servicio.cantidad), 0)}</h4>
  </div>
`; 
  
}

// 
servicios.forEach((servicio)=> {
    
    //Crear elemento html
    const servicioDiv = document.createElement('div');
    servicioDiv.classList.add("bg-box");
    servicioDiv.innerHTML = `
        <img src="${servicio.imagen}" alt="${servicio.servicio}" >
        <h5>${servicio.servicio}</h5>
        <p>Precio: $${servicio.precio}</p>
        <h4 class="total${servicio.id}"></h4>
        <div class="buttonBox">
          <a id="agregar${servicio.id}" class="boton">Agregar a la cotización</a>
          <div class="border"></div>
          <div class="border"></div>
        </div>
      </div>
    `;
    contenedorServicios.appendChild(servicioDiv);

    //agregar a cotizador
    const botonAgregar = document.getElementById(`agregar${servicio.id}`);
    botonAgregar.addEventListener('click', function () {
            agregarCotizador(servicio.id);
            actualizarCotizador();
        });

});

// Carrito
