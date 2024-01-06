'use strict';

const cart = document.querySelector('.cart');
const cart_sidebar = document.querySelector('.cart-sidebar');
const close_sidebar = document.querySelector('.close-sidebar');
document.getElementById('currentYear').textContent = new Date().getFullYear();

// card-sidebar open and hide function
const handleSidebar = () => {
  if (cart_sidebar.classList.contains('-right-72')) {
    // If cart_sidebar has -right-72, remove it and add right-0
    cart_sidebar.classList.remove('-right-72');
    cart_sidebar.classList.add('right-0');
  } else if (cart_sidebar.classList.contains('right-0')) {
    // If cart_sidebar has right-0, remove it and add -right-72
    cart_sidebar.classList.remove('right-0');
    cart_sidebar.classList.add('-right-72');
  }
};

// card-sidebar open and hide
cart.addEventListener('click', handleSidebar);
close_sidebar.addEventListener('click', handleSidebar);
