'use strict';

const theme_switcher = document.querySelector('.theme-switcher');

const cart = document.querySelector('.cart');

let isDarkTheme = false;

// Function to toggle between light and dark themes
function toggleTheme() {
  const body = document.body;
  const lightThemeIcon = document.getElementById('lightTheme');
  const darkThemeIcon = document.getElementById('darkTheme');

  // Toggle theme class on the body
  body.classList.toggle('dark-theme', isDarkTheme);
  body.classList.toggle('light-theme', !isDarkTheme);

  // Toggle icons visibility
  lightThemeIcon.classList.add(isDarkTheme ? 'block' : 'hidden');
  darkThemeIcon.classList.add(isDarkTheme ? 'hidden' : 'block');

  // Update theme state
  isDarkTheme = !isDarkTheme;
}

// Add click event listener to the theme switcher
theme_switcher.addEventListener('click', toggleTheme);
