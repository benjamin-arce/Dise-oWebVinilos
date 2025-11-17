// main.js

// 1) Catálogo dinámico en productos.html
const productosContainer = document.querySelector('#productos-container');
const botonesFiltro = document.querySelectorAll('.btn-filtro');
const CART_KEY = 'vinilomania-cart';

const formatCurrency = (value) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value);

const loadCart = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
};

const saveCart = (items) => localStorage.setItem(CART_KEY, JSON.stringify(items));

const addToCart = (producto) => {
  const cart = loadCart();
  const existente = cart.find((p) => p.id === producto.id);

  if (existente) {
    existente.cantidad += 1;
  } else {
    cart.push({ ...producto, cantidad: 1 });
  }

  saveCart(cart);
};

if (productosContainer) {
  const catalogo = [
    { id: 'pf-dsotm', titulo: 'Dark Side of the Moon (Remaster)', artista: 'Pink Floyd', genero: 'rock', precio: 45900, color: '#b832ff' },
    { id: 'beatles-abbey', titulo: 'Abbey Road', artista: 'The Beatles', genero: 'rock', precio: 42500, color: '#7ce7ff' },
    { id: 'daft-ram', titulo: 'Random Access Memories', artista: 'Daft Punk', genero: 'electronica', precio: 39800, color: '#ff9f1c' },
    { id: 'miles-kind', titulo: 'Kind of Blue', artista: 'Miles Davis', genero: 'jazz', precio: 36400, color: '#4dd1c4' },
    { id: 'harry-fine', titulo: 'Fine Line', artista: 'Harry Styles', genero: 'pop', precio: 33200, color: '#ff7eb6' },
    { id: 'mj-thriller', titulo: 'Thriller', artista: 'Michael Jackson', genero: 'pop', precio: 41900, color: '#eec643' },
    { id: 'coltrane-blue', titulo: 'Blue Train', artista: 'John Coltrane', genero: 'jazz', precio: 35600, color: '#00c2ff' },
    { id: 'am', titulo: 'AM', artista: 'Arctic Monkeys', genero: 'rock', precio: 38500, color: '#f55c7a' }
  ];

  const renderProductos = (filtro = 'todos') => {
    productosContainer.innerHTML = '';

    const lista = filtro === 'todos' ? catalogo : catalogo.filter((p) => p.genero === filtro);

    if (!lista.length) {
      const empty = document.createElement('div');
      empty.className = 'productos-empty';
      empty.textContent = 'No encontramos vinilos para este género, probá con otro filtro.';
      productosContainer.appendChild(empty);
      return;
    }

    lista.forEach((producto) => {
      const card = document.createElement('article');
      card.className = 'producto-card';

      const cover = document.createElement('div');
      cover.className = 'product-cover';
      cover.style.setProperty('--accent', producto.color);
      cover.textContent = '♪';
      card.appendChild(cover);

      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = producto.genero;

      const titulo = document.createElement('h3');
      titulo.textContent = producto.titulo;

      const artista = document.createElement('p');
      artista.className = 'producto-artista';
      artista.textContent = producto.artista;

      const precio = document.createElement('p');
      precio.className = 'producto-precio';
      precio.textContent = formatCurrency(producto.precio);

      const boton = document.createElement('button');
      boton.type = 'button';
      boton.className = 'btn-agregar';
      boton.textContent = 'Agregar al carrito';
      boton.addEventListener('click', () => {
        addToCart(producto);
        boton.textContent = 'Agregado!';
        setTimeout(() => {
          boton.textContent = 'Agregar al carrito';
        }, 1200);
      });

      card.append(tag, titulo, artista, precio, boton);
      productosContainer.append(card);
    });
  };

  // eventos de filtro
  botonesFiltro.forEach((boton) => {
    boton.addEventListener('click', () => {
      botonesFiltro.forEach((b) => b.classList.remove('is-active'));
      boton.classList.add('is-active');
      renderProductos(boton.dataset.filtro);
    });
  });

  renderProductos();
}

// 2) Código del formulario de contacto
const formContacto = document.querySelector('#form-contacto');

if (formContacto) {
  // Validaciones/submit acá
}
