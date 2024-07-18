import data from '../movie-list/movie-list.json';

const tableBody = document.querySelector('.table-body');

let moviesData = [];

let sortOrder = [
    { 
        field: 'id', 
        order: 'asc' 
    },
    { 
        field: 'id', 
        order: 'desc' 
    },
    { 
        field: 'title', 
        order: 'asc' 
    },
    { 
        field: 'title', 
        order: 'desc' 
    },
    { 
        field: 'year', 
        order: 'asc' 
    },
    { 
        field: 'year', 
        order: 'desc' 
    },
    { 
        field: 'imdb', 
        order: 'asc' 
    },
    { 
        field: 'imdb', 
        order: 'desc' 
    }
];

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

        if(field === 'title') {
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
    const { field, order } = sortOrder[currentSortIndex];
    sortData(field, order);
    currentSortIndex = (currentSortIndex + 1) % sortOrder.length;
}

document.addEventListener('DOMContentLoaded', () => {
    moviesData = data;
    createTable();
    changeSortOrder();
    setInterval(changeSortOrder, 2000);
});