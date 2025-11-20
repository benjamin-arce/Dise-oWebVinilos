// Array de productos
const productos = [
    {
        id: 1,
        nombre: "Dark Side of the Moon - Pink Floyd",
        precio: 45900,
        imagen: "img/pinkfloyd.jpg",
        categoria: "rock"
    },
    {
        id: 2,
        nombre: "Abbey Road - The Beatles",
        precio: 42500,
        imagen: "img/thebeatles.jpg",
        categoria: "rock"
    },
    {
        id: 3,
        nombre: "Random Access Memories - Daft Punk",
        precio: 39800,
        imagen: "img/daftpunk.jpg",
        categoria: "electronica"
    },
    {
        id: 4,
        nombre: "Kind of Blue - Miles Davis",
        precio: 36400,
        imagen: "img/milesdavis.jpg",
        categoria: "jazz"
    },
    {
        id: 5,
        nombre: "Fine Line - Harry Styles",
        precio: 33200,
        imagen: "img/harrystyles.jpg",
        categoria: "pop"
    },
    {
        id: 6,
        nombre: "Thriller - Michael Jackson",
        precio: 41900,
        imagen: "img/michaeljackson.jpg",
        categoria: "pop"
    }
];

// Función para mostrar productos
function mostrarProductos() {
    const contenedor = document.getElementById('productos-container'); 
    if (!contenedor) return;
    
    let html = '';
    
    for (let i = 0; i < productos.length; i++) {
        html += `
            <div class="producto">
                <img src="${productos[i].imagen}" alt="${productos[i].nombre}">
                <h3>${productos[i].nombre}</h3>
                <p class="precio">$${productos[i].precio}</p>
            </div>
        `;
    }
    
    contenedor.innerHTML = html;
}

// Event listeners cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar productos si estamos en la página correcta
    mostrarProductos();
    
    // Año dinámico en footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Menu hamburger
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav ul');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('show');
        });
    }
}); 