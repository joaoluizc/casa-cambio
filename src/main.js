import "./createRate.js";
import Swal from 'sweetalert2';

const btn = document.querySelector("#search");
const input = document.querySelector("input");
const section = document.querySelector("section");

const createRate = (rate, taxa) => {
  const div = document.createElement("div");
  div.classList.add('taxa-container');
  const moedaEl = document.createElement("p");
  const taxaEl = document.createElement("p");
  moedaEl.innerHTML = rate;
  taxaEl.innerHTML = parseFloat(taxa).toFixed(3);

  div.appendChild(moedaEl);
  div.appendChild(taxaEl);
  section.appendChild(div);
}

btn.addEventListener('click', (event) => {
  const moeda = input.value;
  // if (!moeda) throw new Error('Você precisa passar uma moeda');
  fetch(`https://api.exchangerate.host/latest?base=${moeda}`)
    .then((result) => result.json())
    .then((data) => {
  if (!moeda) throw new Error('Você precisa passar uma moeda');
      const keys = Object.keys(data.rates);
      if (!moeda) throw new Error('Você precisa passar uma moeda');
      if (!keys.includes(moeda)) throw new Error('Moeda não existente');
      keys.forEach((rateAbr) => {
        createRate(rateAbr, data.rates[rateAbr])
      })
    })
    .catch((error) => Swal.fire({
      title: 'oops',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'Cool',
    }));
}) 