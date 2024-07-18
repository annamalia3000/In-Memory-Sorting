/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// CONCATENATED MODULE: ./src/movie-list/movie-list.json
const movie_list_namespaceObject = /*#__PURE__*/JSON.parse('[{"id":26,"title":"Побег из Шоушенка","imdb":9.3,"year":1994},{"id":25,"title":"Крёстный отец","imdb":9.2,"year":1972},{"id":27,"title":"Крёстный отец 2","imdb":9,"year":1974},{"id":1047,"title":"Тёмный рыцарь","imdb":9,"year":2008},{"id":223,"title":"Криминальное чтиво","imdb":8.9,"year":1994}]');
;// CONCATENATED MODULE: ./src/js/app.js

const tableBody = document.querySelector('.table-body');
let moviesData = [];
let sortOrder = [{
  field: 'id',
  order: 'asc'
}, {
  field: 'id',
  order: 'desc'
}, {
  field: 'title',
  order: 'asc'
}, {
  field: 'title',
  order: 'desc'
}, {
  field: 'year',
  order: 'asc'
}, {
  field: 'year',
  order: 'desc'
}, {
  field: 'imdb',
  order: 'asc'
}, {
  field: 'imdb',
  order: 'desc'
}];
let currentSortIndex = 0;
function createTable() {
  tableBody.innerHTML = '';
  moviesData.forEach(movie => {
    const row = document.createElement('tr');
    row.innerHTML = `
               <td>#${movie.id}</td>
               <td>${movie.title}</td>
               <td>(${movie.year})</td>
               <td>imdb: ${movie.imdb.toFixed(2)}</td>
            `;
    tableBody.appendChild(row);
  });
}
function sortData(field, order) {
  moviesData.sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];
    if (field === 'title') {
      return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    } else {
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    }
  });
  document.querySelectorAll('th').forEach(th => th.classList.remove('sort-asc', 'sort-desc'));
  const sortedTh = document.querySelector(`th[data-sort="${field}"]`);
  sortedTh.classList.add(order === 'asc' ? 'sort-asc' : 'sort-desc');
  createTable();
}
function changeSortOrder() {
  const {
    field,
    order
  } = sortOrder[currentSortIndex];
  sortData(field, order);
  currentSortIndex = (currentSortIndex + 1) % sortOrder.length;
}
document.addEventListener('DOMContentLoaded', () => {
  moviesData = movie_list_namespaceObject;
  createTable();
  changeSortOrder();
  setInterval(changeSortOrder, 2000);
});
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;