const cargarTarjetasVentas = (juegos) => {
  let NodesString = "";
  let tarjetas = document.getElementById("tarjetas");
  tarjetas.innerHTML = "";
  let carrito = localStorage.getItem("carrito") ?? "";
  if (carrito === "") return;
  let arrayjuegos = [];
  const arrayCarrito = carrito.split(",");
  arrayCarrito.forEach((item) => {
    const idx = arrayjuegos.findIndex((juego) => item === juego.id.toString());
    if (idx !== -1) {
      arrayjuegos[idx].cantidad += 1;
    } else {
      const juegoParaAgregar = juegos.find(
        (juego) => item === juego.id.toString()
      );
      if (juegoParaAgregar) {
        arrayjuegos.push({
          ...juegoParaAgregar,
          cantidad: 1,
        });
      }
    }
  });
  let precioTotal = 0;
  arrayjuegos.forEach((juego) => {
    NodesString += `<div class="tarjeta">
          <div class="imagenTarjeta">
            <img src=${juego.imagen} />
          </div>
          <div class="detallesTarjeta">
            <p id="juegoNombre">${juego.nombre}</p>
            <p id="precio">$${juego.precio}</p>
            <p id="cantidad">${juego.cantidad}</p>
            <button class="agregarCarrito" onclick="agregarCarrito(${juego.id})">Agregar al carrito</button>
          </div>
        </div>`;
    precioTotal += juego.cantidad * juego.precio;
  });
  tarjetas.insertAdjacentHTML("beforeend", NodesString);
  const total = document.getElementById("total");
  total.innerHTML = " Total carrito: $" + precioTotal;
};

const modalVenta = (tipo) => {
  const titulo = document.getElementById("modalTitulo");
  const contenido = document.getElementById("modalContenido");
  switch (tipo) {
    case "limpiar":
      const botonesLimpiar = document.getElementById("botonesLimpiar");
      titulo.innerHTML = "Limpiar carrito";
      contenido.innerHTML =
        "¿Desea limpiar el contenido del carrito de compra?";
      botonesLimpiar.classList.toggle("ocultar");
      toggleModal();
      break;
    case "comprar":
      titulo.innerHTML = "Confirmar compra";
      contenido.innerHTML =
        "¿Desea realizar su compra?";
      const botonesComprar = document.getElementById("botonesComprar");
      botonesComprar.classList.toggle("ocultar");
      toggleModal();
      break;
    case "felicitar":
      titulo.innerHTML = "Muchas gracias";
      contenido.innerHTML = "¡Muchas gracias por concretar su compra!";
      const botonesFelicitar = document.getElementById("botonesFelicitar");
      botonesFelicitar.classList.toggle("ocultar");
      break;
  }
};

const modalClose = (id) => {
  const botones = document.getElementById(id);
  botones.classList.toggle("ocultar");
  toggleModal();
};

const finalizarVenta = () => {
  const botones = document.getElementById("botonesComprar");
  botones.classList.toggle("ocultar");
  localStorage.removeItem("carrito");
  modalVenta("felicitar");
};

const limpiarCarrito = () => {
  localStorage.removeItem("carrito");
  window.location.href="index.html";
  modalClose("botonesLimpiar")
};

const aceptarModalFelicitacion = () => {
    window.location.href="index.html";
    modalClose('botonesFelicitar');
}

contarCarrito();
cargarTarjetasVentas(juegos);
