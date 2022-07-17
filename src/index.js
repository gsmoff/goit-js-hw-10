import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const divRef = document.querySelector('.country-info');
const ulRef = document.querySelector('.country-list');
console.log(inputRef);


function onInput() {
  let value = this.value;
  if (!value.trim()) {
    Notify.failure('Сountry not selected!');
    cleanMarkup();
    return;
  }
  console.log(value);
  fetchCountries(value.trim())
    .then(data => {
      createCountryMarkup(data);
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (data.length === 1) {
        cleanMarkup();
        divRef.innerHTML = createOneCountryInDom(data);
        return;
      }
      cleanMarkup();
      ulRef.innerHTML = createSomeCountryInDom(data);
    })
    .catch(error => {
    cleanMarkup();
      Notify.failure('Oops, there is no country with that name')
    });
};

const createCountryMarkup = data => {
  console.log(data);
};

const cleanMarkup = () => {
        divRef.innerHTML = '';
        ulRef.innerHTML = '';  
}
const createOneCountryInDom = (data) => { 
  return `
        <h2><img src="${data[0].flags.svg}" width = 40px class="flag-img"> ${data[0].name.common}</h2>
        <h4>Capital: <span> ${data[0].capital[0]}</span></h4>
        <h4>Population:<span> ${data[0].population}</span></h4>
        <h4>Common Languages:<span> ${Object.values(data[0].languages)
          .toString()
          .split(',')
          .join(', ')}</span></h4>
      `;
}
const createSomeCountryInDom = data => {
  return data.map(createCountryHTML).join('');
};

function createCountryHTML(data) {
  return `<li><img src="${data.flags.svg}" alt="${data.name.common}" width = 40px class="country-flag"> ${data.name.common}</li>`;
}

inputRef.addEventListener('keydown', debounce(onInput, DEBOUNCE_DELAY)); 

