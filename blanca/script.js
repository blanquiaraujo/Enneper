const loadText = document.querySelector('.loading-text');
const bg = document.querySelector('.bg');
const body = document.body;

let load = 0;
let int = setInterval(blurring, 30);

function blurring() {
  load++;

  if (load > 99) {
    clearInterval(int);
    createRedirectButton();
  }

  loadText.innerText = `${load}%`;
  loadText.style.opacity = scale(load, 0, 100, 1, 0);
  bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
}

const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

function createRedirectButton() {
  const redirectButton = document.createElement('button');
  redirectButton.innerText = 'Entra!';
  redirectButton.classList.add('redirect-button');
  redirectButton.addEventListener('click', function () {
    alert("A ver se che gusta a tua nova web!");
    window.location.href = 'https://enneper.vercel.app/';
  });

  body.appendChild(redirectButton);
}
