const juegos = [
  {
    id: 1,
    nombre: "Battlefield 2042",
    precio: 6000,
    imagen: "./assets/img/battlefield.jpg",
  },
  {
    id: 2,
    nombre: "Elden Ring",
    precio: 6000,
    imagen: "./assets/img/battlefield.jpg",
  },
  {
    id: 3,
    nombre: "Control",
    precio: 6000,
    imagen: "./assets/img/battlefield.jpg",
  },
  {
    id: 4,
    nombre: "Dark Souls",
    precio: 6000,
    imagen: "./assets/img/battlefield.jpg",
  },
  {
    id: 5,
    nombre: "Dark Souls 2",
    precio: 6000,
    imagen: "./assets/img/battlefield.jpg",
  },
];

const cargarTarjetas = (juegos) => {
  let NodesString = "";
  let tarjetas = document.getElementById("tarjetas");
  tarjetas.innerHTML = "";

  juegos.forEach((juego) => {
    NodesString += `<div class="tarjeta">
        <div class="imagenTarjeta">
          <img src=${juego.imagen} />
        </div>
        <div class="detallesTarjeta">
          <p id="juegoNombre">${juego.nombre}</p>
          <p id="precio">$${juego.precio}</p>
          <button class="agregarCarrito" onclick="agregarCarrito(${juego.id})">Agregar al carrito</button>
        </div>
      </div>`;
  });
  tarjetas.insertAdjacentHTML("beforeend", NodesString);
};

const agregarCarrito = (id, modal) => {
  let carrito = localStorage.getItem("carrito") ?? "";
  let arrayCarrito = [];
  let exists = false;
  if (carrito === undefined || carrito === "") {
    carrito += id;
    localStorage.setItem("carrito", carrito);
    contarCarrito();
  } else {
    arrayCarrito = carrito.split(",");
    exists = arrayCarrito.find((item) => item === id.toString());
    if (exists && !modal) {
      toggleModal();
      localStorage.setItem("pendiente", id);
    } else {
      carrito += "," + id;
      localStorage.setItem("carrito", carrito);
      contarCarrito();
    }
  }
};

const contarCarrito = () => {
  let carrito = localStorage.getItem("carrito") ?? "";
  if (carrito !== "") {
    carrito = carrito.split(",");
    let contador = document.getElementById("contadorCarrito");
    contador.innerHTML = carrito.length;
  }
};

const coincidencia = (a, b) => {
  return new RegExp("\\b(" + a.match(/\w+/g).join("|") + ")\\b", "gi").test(b);
};

const buscarJuegos = () => {
  const buscador = document.getElementById("textoBuscador");
  if (buscador.value !== "") {
    const juegosBuscados = juegos.filter((juego) => {
      return coincidencia(buscador.value, juego.nombre);
    });
    cargarTarjetas(juegosBuscados);
    buscador.value = "";
  } else {
    cargarTarjetas(juegos);
  }
};

const toggleModal = () => {
  const modal = document.getElementById("modal");
  modal.classList.toggle("ocultar");
};

const modalAceptar = () => {
  const idJuego = localStorage.getItem("pendiente");
  agregarCarrito(idJuego, true);
  limpiarPendientes();
  toggleModal();
};

const modalCancelar = () => {
  limpiarPendientes();
  toggleModal();
};

const limpiarPendientes = () => {
  localStorage.removeItem("pendiente");
};

limpiarPendientes();
contarCarrito();
cargarTarjetas(juegos);
