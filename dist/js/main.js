import {links} from "./links.js";
import {ecosystem} from "./ecosystem.js";

links();
ecosystem();

const html = document.documentElement;
const menuBtn = document.querySelector('.menu-btn');
const headerNav = document.querySelector('.header__nav.mobile');
const anchors = document.querySelectorAll('a.header__link.mobile');
const button = document.querySelector('.home__subname');
const contractParagraph = document.querySelector('.home__item p');
const tooltip = document.querySelector('.home__tooltip');

menuBtn.addEventListener('click', () => {
  menuBtn.blur();
  html.classList.toggle('active');
  menuBtn.classList.toggle('active');
  headerNav.classList.toggle('active');
});

button.addEventListener('click', function () {
  const contractAddress = contractParagraph.textContent;

  navigator.clipboard.writeText(contractAddress)
    .then(() => {
      tooltip.classList.add('visible');
      setTimeout(() => {
        tooltip.classList.remove('visible');
      }, 2000);
      button.blur();
    })
    .catch((error) => {
      console.error('Error when copying contract address:', error);
    });
});

function scrollToTarget(targetId) {
  const targetSection = document.querySelector(targetId);
  if (targetSection) {
    html.classList.remove('active');
    headerNav.classList.remove('active');
    menuBtn.classList.remove('active');
    setTimeout(() => {
      const targetOffset = targetSection.offsetTop - 80;
      window.scrollTo({top: targetOffset, behavior: 'smooth'});
    }, 400);
  }
}

function handleAnchorClick(event) {
  event.preventDefault();
  const href = this.getAttribute('href');
  const hrefParts = href.split('#');
  if (hrefParts.length === 2) {
    const targetId = '#' + hrefParts[1];
    scrollToTarget(targetId);
  }
}

for (const anchor of anchors) {
  anchor.addEventListener('click', handleAnchorClick);
  anchor.addEventListener('touchstart', handleAnchorClick, {passive: true});
}