'use strict';

const cart = document.querySelector('.cart');
const cart_sidebar = document.querySelector('.cart-sidebar');
const close_sidebar = document.querySelector('.close-sidebar');
let list = document.querySelector('.list');
let listCart = document.querySelector('.listCart');
let total = document.querySelector('.total');
let cartQuantityElements = document.querySelectorAll('.quantity');
document.getElementById('currentYear').textContent = new Date().getFullYear();

const products = [];
let listCarts = [];

// // card-sidebar open and hide function
const handleSidebar = () => {
  cart_sidebar.classList.toggle('-right-72');
  cart_sidebar.classList.toggle('right-0');
};

// Assuming api call
const fetchData = async () => {
  try {
    const response = await fetch('./products.json');
    const data = await response.json();

    // Handle the data here
    products.push(...data);
  } catch (error) {
    // Handle errors
    console.error('Error fetching data:', error);
  } finally {
    initApp();
  }
};
// Call the asynchronous fetchData function to fetch Data
fetchData();

const initApp = () => {
  products.forEach((value, key) => {
    const itemHTML = `
      <div class="item bg-card-color rounded p-6 relative">
${
  value.status === 'new'
    ? `<span class="inline-block absolute top-0 -left-4 -rotate-45 bg-primary-color px-4 py-[3px] rounded-xl text-xs font-semibold text-white uppercase ">${
        value?.status ? value.status : ''
      }</span>`
    : ''
}
        <figure class="overflow-hidden">
          <img class="bg-white duration-300 hover:scale-110 cursor-pointer" src="assets/images/${
            value.image
          }">
        </figure>
        <div class="content flex flex-col mt-6">
          <h2 class="title line-clamp-1 cursor-pointer text-xl capitalize font-bold" title="${
            value.name
          }">${value.name}</h2>
          <h4 class="price font-semibold text-base">${value.price
            ?.toFixed(2)
            ?.toLocaleString()}<span class='ml-1'>$/each</span></h4>
          <p class="line-clamp-3 my-4 min-h-[75px]">
            ${value.description}
          </p>
          <div class="flex flex-col gap-2">
            <button class="border-2 border-primary-color bg-primary-color hover:bg-transparent text-white hover:text-gray-900 duration-300 text-lg font-semibold p-2 add-to-cart-button disabled:bg-gray-600 disabled:hover:text-white disabled:border-gray-600" onclick="addToCart(${key})">Add to Cart</button>
            <button class="border-2 border-primary-color bg-transparent hover:bg-primary-color hover:text-white  duration-300 text-lg font-semibold p-2">Customize</button>
          </div>
        </div>
      </div>
    `;
    list.insertAdjacentHTML('beforeend', itemHTML);
  });
};

const addToCart = (key) => {
  if (listCarts[key] !== null) {
    // copy product form list to list card
    listCarts[key] = JSON.parse(JSON.stringify(products[key]));
    listCarts[key].quantity = 1;

    document.querySelectorAll('.add-to-cart-button').forEach((button, key) => {
      if (listCarts[key] !== undefined) {
        // If the item already exists, disable the button
        button.setAttribute('disabled', true);
        button.classList.add('cursor-not-allowed');
      } else {
        // If the item does not exist, enable the button
        button.removeAttribute('disabled');
        button.classList.remove('cursor-not-allowed');
      }
    });
  }
  reloadCart();
};

const deleteItemFromCart = (key) => {
  delete listCarts[key];
  document.querySelectorAll('.add-to-cart-button').forEach((button, key) => {
    if (listCarts[key] !== undefined) {
      // If the item already exists, disable the button
      button.setAttribute('disabled', true);
      button.classList.add('cursor-not-allowed');
    } else {
      // If the item does not exist, enable the button
      button.removeAttribute('disabled');
      button.classList.remove('cursor-not-allowed');
    }
  });
  reloadCart();
};

const reloadCart = () => {
  listCart.innerHTML = '';
  let count = 0;
  let totalPrice = 0;
  listCarts.forEach((value, key) => {
    totalPrice = totalPrice + value.price;
    count = count + value.quantity;
    if (value != null) {
      const itemHTML = `
        <li class="border-2 flex gap-2 p-1 justify-start items-center relative rounded-md">
        <span class="inline-block absolute -top-2 -right-2 bg-white px-2 py-1 rounded-sm text-xs uppercase tracking-widest z-50 cursor-pointer delete" onclick="deleteItemFromCart(${key})">
        <i class="fa-solid fa-trash text-primary-color"></i>
        </span>
          <figure class='grid place-content-center min-w-16 max-w-16 h-full bg-white'>
            <img
            title=${value.name}
            src="assets/images/${value.image}"/>
          </figure>
          <div class="flex flex-col overflow-hidden w-full">
            <h3 class='truncate text-white font-semibold' title=${value.name}>${
        value.name
      }</h3>
            <h4 class="lowercase text-xs font-semibold my-1 text-white">${value.price
              .toFixed(2)
              .toLocaleString()}$/each</h4>
            <div class="flex relative max-w-28">
                <button 
                class="absolute top-0 left-0 bg-gray-700 px-2 py-1"
                onclick="changeQuantity(${key},${value.quantity - 1})">
                  <i class="fa-solid fa-minus text-white"></i>
                </button>
                <span class="text-center w-full bg-white font-bold p-1 block">
                ${value.quantity}
                </span>
                <button 
                class="absolute top-0 right-0 bg-gray-700 px-2 py-1"
                onclick="changeQuantity(${key}, ${value.quantity + 1})">
                  <i class="fa-solid fa-plus text-white"></i>
                </button>
            </div>
             <h4 class="lowercase text-base font-bold text-right text-white">${value.price
               .toFixed(2)
               .toLocaleString()}$</h4>
          </div>
        </li>
        `;
      listCart.insertAdjacentHTML('beforeend', itemHTML);
    }
  });

  // Update quantity
  cartQuantityElements.forEach((element) => {
    element.innerText = listCarts.length;
  });

  total.innerText = totalPrice.toFixed(2).toLocaleString();
  // quantity.innerText = count;
};
const changeQuantity = (key, quantity) => {
  if (quantity == 0) {
    delete listCarts[key];
    document.querySelectorAll('.add-to-cart-button').forEach((button, key) => {
      if (listCarts[key] !== undefined) {
        // If the item already exists, disable the button
        button.setAttribute('disabled', true);
        button.classList.add('cursor-not-allowed');
      } else {
        // If the item does not exist, enable the button
        button.removeAttribute('disabled');
        button.classList.remove('cursor-not-allowed');
      }
    });
  } else {
    listCarts[key].quantity = quantity;
    listCarts[key].price = quantity * products[key].price;
  }
  reloadCart();
};

// card-sidebar open and hide
cart.addEventListener('click', handleSidebar);
close_sidebar.addEventListener('click', handleSidebar);
