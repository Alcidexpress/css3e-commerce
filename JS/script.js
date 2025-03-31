const carritoBtn = document.getElementById('carrito-btn');
const carrito = document.getElementById('carrito');
const cerrarCarritoBtn = document.getElementById('cerrar-carrito');
const productosCarrito = document.getElementById('productos-carrito');
const totalElement = document.getElementById('total');

let carritoProductos = JSON.parse(localStorage.getItem('carrito')) || [];

function mostrarCarrito() {
    productosCarrito.innerHTML = ''; // Limpiar el carrito antes de mostrarlo
    let total = 0;

    carritoProductos.forEach((producto, index) => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto-carrito'); // Agregar una clase para estilos

        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" width="50">
            <p>${producto.nombre} - $${producto.precio.toFixed(2)}</p>
            <input type="number" value="${producto.cantidad}" min="1" class="cantidad-producto" data-index="${index}">
            <button class="eliminar-producto" data-index="${index}">Eliminar</button>
        `;

        productosCarrito.appendChild(productoDiv);
        total += producto.precio * producto.cantidad;
    });

    totalElement.textContent = `Total: $${total.toFixed(2)}`;

    // Agregar event listeners a los botones de eliminación y cantidad
    const botonesEliminar = document.querySelectorAll('.eliminar-producto');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', eliminarProducto);
    });

    const inputsCantidad = document.querySelectorAll('.cantidad-producto');
    inputsCantidad.forEach(input => {
        input.addEventListener('change', actualizarCantidad);
    });
}

function eliminarProducto(event) {
    const index = event.target.dataset.index;
    carritoProductos.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carritoProductos));
    mostrarCarrito();
}

function actualizarCantidad(event) {
    const index = event.target.dataset.index;
    carritoProductos[index].cantidad = parseInt(event.target.value);
    localStorage.setItem('carrito', JSON.stringify(carritoProductos));
    mostrarCarrito();
}

carritoBtn.addEventListener('click', () => {
    carrito.classList.add('mostrar');
    mostrarCarrito();
});

cerrarCarritoBtn.addEventListener('click', () => {
    carrito.classList.remove('mostrar');
});

mostrarCarrito(); // Mostrar el carrito al cargar la página (si tiene productos)