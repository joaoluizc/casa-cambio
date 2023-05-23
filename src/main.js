import "./createRate.js";

const btn = document.querySelector("#search");
const input = document.querySelector("input");
const section = document.querySelector("section");

const createRate = (rate, taxa) => {
  const div = document.createElement("div");
  const moedaEl = document.createElement("p");
  const taxaEl = document.createElement("p");
  moedaEl.innerHTML = rate;
  taxaEl.innerHTML = taxa;

  div.appendChild(moedaEl);
  div.appendChild(taxaEl);
  section.appendChild(div);
}

btn.addEventListener('click', (event) => {
  const moeda = input.value;
  fetch(`https://api.exchangerate.host/latest?base=${moeda}`)
    .then((result) => result.json())
    .then((data) => {
      const keys = Object.keys(data.rates);
      keys.forEach((rateAbr) => {
        createRate(rateAbr, data.rates[rateAbr])
      })
    });
}) 