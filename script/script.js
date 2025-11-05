// Recupera o carrinho do localStorage
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// Salva o carrinho no localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Atualiza o contador do carrinho
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const span = document.getElementById('cart-count');
  if (span) span.textContent = count;
}

// Exibe mensagem toast
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000); // Remove após 3 segundos
}

// Adiciona item ao carrinho
function addToCart(item) {
  const cart = getCart();
  const existing = cart.find(i => i.id === item.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  saveCart(cart);
  updateCartCount();
  alert(`${item.name} adicionado ao carrinho!`);
}
function removeFromCart(id) {
  const cart = getCart().filter(item => item.id !== id);
  saveCart(cart);
  renderCart();
  updateCartCount();
}

// Mostra os itens do carrinho na tela
function renderCart() {
  const container = document.getElementById('cart-items');
  if (!container) return;

  const cart = getCart();
  container.innerHTML = '';

  if (cart.length === 0) {
    container.innerHTML = '<div class="empty-cart"><p>Carrinho vazio.</p></div>';
    return;
  }

  cart.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('item');
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="info">
        <h2>${item.name}</h2>
        <p>R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
        <p>Total: R$ ${(item.price * item.quantity).toFixed(2)}</p>
        <button class="remove-item" data-id="${item.id}">Remover</button>
      </div>
    `;
    container.appendChild(div);
  });

  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.getAttribute('data-id');
      removeFromCart(id);
    });
  });
}

// Aguarda a página carregar
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderCart();

  // Ativa os botões de adicionar ao carrinho se existirem na página
  const buttons = document.querySelectorAll('.add-to-cart');
  if (buttons.length > 0) {
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const item = {
          id: button.getAttribute('data-id'),
          name: button.getAttribute('data-name'),
          price: parseFloat(button.getAttribute('data-price')),
          img: button.getAttribute('data-img')
        };
        addToCart(item);
      });
    });
  }

  const toggleButton = document.getElementById('menu-toggle');
  if (toggleButton) {
    toggleButton.addEventListener('click', function () {
      const menuItems = document.getElementById('menu-items');
      if (menuItems) {
        menuItems.classList.toggle('show');
      }
    });
  }
});
