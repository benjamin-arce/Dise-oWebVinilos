const cartItemsContainer = document.querySelector('#cart-items');
const cartCount = document.querySelector('#cart-count');
const subtotalEl = document.querySelector('[data-subtotal]');
const shippingEl = document.querySelector('[data-shipping]');
const totalEl = document.querySelector('[data-total]');
const shippingSelect = document.querySelector('#shipping-method');
const checkoutButton = document.querySelector('#checkout-button');
const checkoutForm = document.querySelector('#checkout-form');
const checkoutMessage = document.querySelector('#checkout-message');
const CART_KEY = 'vinilomania-cart';

const loadCart = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
};

const saveCart = (items) => localStorage.setItem(CART_KEY, JSON.stringify(items));

let cartItems = loadCart();

const formatCurrency = (value) =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value);

const renderCart = () => {
  if (!cartItemsContainer) return;
  cartItemsContainer.innerHTML = '';

  if (!cartItems.length) {
    const empty = document.createElement('div');
    empty.className = 'cart-empty';
    empty.innerHTML = 'Tu carrito está vacío. <a href="productos.html">Agrega vinilos del catálogo</a>.';
    cartItemsContainer.appendChild(empty);
    updateTotals();
    updateCount();
    return;
  }

  cartItems.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'cart-item';

    const cover = document.createElement('div');
    cover.className = 'cover';
    cover.style.setProperty('--cover-color', item.color);
    cover.textContent = '♪';

    const detail = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = item.titulo;
    const meta = document.createElement('p');
    meta.className = 'meta';
    meta.textContent = item.artista;
    const price = document.createElement('div');
    price.className = 'price';
    price.textContent = formatCurrency(item.precio);
    detail.append(title, meta, price);

    const actions = document.createElement('div');
    actions.className = 'cart-actions';
    const qty = document.createElement('div');
    qty.className = 'qty';
    const qtyInput = document.createElement('input');
    qtyInput.type = 'number';
    qtyInput.min = '1';
    qtyInput.value = item.cantidad;
    qtyInput.addEventListener('change', () => {
      const nueva = Math.max(1, parseInt(qtyInput.value, 10) || 1);
      qtyInput.value = nueva;
      item.cantidad = nueva;
      updateTotals();
      updateCount();
      saveCart(cartItems);
    });
    qty.append('Cant.', qtyInput);

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'remove';
    remove.textContent = 'Eliminar';
    remove.addEventListener('click', () => {
      cartItems = cartItems.filter((p) => p.id !== item.id);
      saveCart(cartItems);
      renderCart();
    });

    actions.append(qty, remove);
    card.append(cover, detail, actions);
    cartItemsContainer.append(card);
  });

  updateTotals();
  updateCount();
};

const getShippingCost = () => (shippingSelect ? Number(shippingSelect.value) || 0 : 0);

const updateTotals = () => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const shipping = getShippingCost();
  const total = subtotal + shipping;

  if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
  if (shippingEl) shippingEl.textContent = formatCurrency(shipping);
  if (totalEl) totalEl.textContent = formatCurrency(total);

  if (checkoutButton) {
    checkoutButton.disabled = !cartItems.length;
  }
};

const updateCount = () => {
  if (!cartCount) return;
  const totalQty = cartItems.reduce((acc, item) => acc + item.cantidad, 0);
  cartCount.textContent = totalQty;
};

const handleCheckout = () => {
  const checkoutSection = document.querySelector('#checkout');
  if (checkoutSection) {
    checkoutSection.scrollIntoView({ behavior: 'smooth' });
  }
};

if (checkoutButton) {
  checkoutButton.addEventListener('click', handleCheckout);
}

if (shippingSelect) {
  shippingSelect.addEventListener('change', updateTotals);
}

if (checkoutForm) {
  checkoutForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!cartItems.length) return;

    if (checkoutMessage) {
      checkoutMessage.textContent = '¡Pedido confirmado! Te enviamos el resumen a tu email.';
    }
    checkoutForm.reset();
  });
}

renderCart();
