// Array de objetos - servicios a cotizar
const servicios = [
    {
        cantidad: 1,
        id: "am",
        imagen: "https://media.istockphoto.com/id/1325588832/es/foto/verter-aceite-de-motor-para-veh%C3%ADculos-de-motor-de-una-botella-gris-en-el-motor.jpg?s=1024x1024&w=is&k=20&c=baO1JuAKloP8wHwtc9KkVgy_-Ebw8ertgT_eclrqkCc=",
        servicio: "Cambio de Aceite de Motor",
        precio: 40,
    },
    {
        cantidad: 1,
        id: "at",
        imagen: "https://www.shutterstock.com/shutterstock/photos/2156760837/display_1500/stock-photo-car-transmission-and-clutch-transmission-gears-with-oil-clutch-transfer-case-and-driveshaft-d-2156760837.jpg",
        servicio: "Cambio de Aceite de caja de transmición",
        precio: 100,
    },
    {
        cantidad: 1,
        id: "bj",
        imagen: "https://media.istockphoto.com/id/1253089690/es/foto/reemplazo-de-buj%C3%ADas-en-un-motor-moderno.jpg?s=1024x1024&w=is&k=20&c=79kaOJOvUxqBXlMlDKM9ILDtSNJ6CaW8l-7D9JfH8e8=",
        servicio: "Cambio de bujillas",
        precio: 60,
    },
    {
        cantidad: 1,
        id: "fr",
        imagen: "https://media.istockphoto.com/id/1364951743/es/foto/revisando-los-discos-de-freno-de-un-autom%C3%B3vil-moderno-sistema-de-frenado-del-veh%C3%ADculo.jpg?s=1024x1024&w=is&k=20&c=7WiwcXEPoYdVikY1TWEG_o0mkgmS3HUqLj0t-5vk7do=",
        servicio: "Cambio de frenos",
        precio: 120,
    }
]


/* Galeria - llamado al Json mediante el metodo fetch - implementación de la librería sweeper */

const contenedorGaleria = document.querySelector(".swiper-wrapper");

async function cargarGaleria() {
  try {
    const response = await fetch('jsonGalery.json');
    if (!response.ok) {
      throw new Error('Error al cargar el archivo JSON');
    }

    const galeria = await response.json();

    galeria.forEach(imagen => {
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");

      const img = document.createElement("img");
      img.src = imagen.url;
      img.alt = imagen.title;
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

  } catch (error) {
    console.error('Error:', error);
  }
}


cargarGaleria();
