const burger = document.getElementById('burger');
const sideMenu = document.getElementById('sideMenu');
burger.addEventListener('click', onBurgerClick);
sideMenu.addEventListener('click', onBurgerClick);

function onBurgerClick() {
  console.log('sdfsdf');
  sideMenu.classList.toggle('sideMenu-hiding');
}
