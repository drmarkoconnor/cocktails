// API Endpoints - MUST HAVE 'https://' PRE-PENDED"

//Search cocktail by name
// www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita

// List all cocktails by first letter
// www.thecocktaildb.com/api/json/v1/1/search.php?f=a

// Search ingredient by name
// www.thecocktaildb.com/api/json/v1/1/search.php?i=vodka

// Lookup full cocktail details by id
// www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007

// Lookup ingredient by ID
// www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=552

// Lookup a random cocktail
// www.thecocktaildb.com/api/json/v1/1/random.php
const mainEl = document.querySelector('.main');

const API_INGREDIENT =
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
const API_RANDOM = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
const API_ID = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const form = document.querySelector('form');

// const instruct = getAllDrinks(11052);
// COULDN'T GET THIS TO WORK - ALWAYS RETURNED A PROMISE
// async function getAllDrinks(id) {
//   const result = await fetch(API_ID + id);
//   const data = await result.json();
//   const instructions = data.drinks[0].strInstructions;
//   const idd = data.drinks[0].idDrink;
// console.log('from: getAllDrinks:' + instructions + 'idd is: ' + idd);
// }

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  for (const res of data) {
    console.log(res[1]);
    getCocktails(res[1]);
  }
});

async function getCocktails(type) {
  const result = await fetch(API_INGREDIENT + type);
  const data = await result.json();
  showDrinks(data.drinks);

  console.log(data.drinks);
}

// This works
// function showDrinks(objDrinks) {
//   mainEl.innerHTML = '';
//   objDrinks.forEach((drink) => {
//     const div = document.createElement('div');
//     div.classList.add('cocktail');
//     div.innerHTML = `
// <div class="cocktailTitle"><h2>${drink.strDrink}</h2></div>
//        <img src="${drink.strDrinkThumb}" alt=" a cocktail drink" />
//         <div class="cocktailId">${drink.idDrink}</div>`;
//     mainEl.append(div);
//   });
// }

function showDrinks(objDrinks) {
  mainEl.innerHTML = '';
  let strIngredient = '';
  let strMeasure = '';
  objDrinks.forEach((drink) => {
    let strPrint = '';
    for (let i = 1; i <= 15; i++) {
      strIngredient = 'strIngredient' + i;
      strMeasure = 'strMeasure' + i;
      if (drink[strIngredient] != null) {
        strPrint =
          strPrint +
          '[ ' +
          '\n' +
          drink[strMeasure] +
          ' ]' +
          '\n' +
          drink[strIngredient] +
          ' : ' +
          '\n';
      }
    }
    const div = document.createElement('div');
    div.classList.add('cocktail');
    div.innerHTML = `
<div class="cocktailTitle"><h2>${drink.strDrink}</h2></div>
       <img src="${drink.strDrinkThumb}" alt=" a cocktail drink" />
        <div class="cocktailId">${
          'Ingredients: ' + strPrint + ' \n' + 'Use a ' + drink.strGlass
        }</div><div class='instructions'>${drink.strInstructions}</div>`;
    mainEl.append(div);
  });
}
