import { apiKey } from './secret.js';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': apiKey,
		'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
	}
};
const userinput = document.querySelector('#search');
const search = document.querySelector('#search-btn');
const tableBody = document.querySelector('#movies-table-body');
let erase = '';
const func = (event) => {
    event.preventDefault();
    const url = `https://movie-database-alternative.p.rapidapi.com/?s=${userinput.value}&r=json&page=1`;
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            tableBody.innerHTML = '';
            data.Search.forEach(movie => {
                const row = tableBody.insertRow();
                row.insertCell(0).innerHTML = movie.Title;
                row.insertCell(1).innerHTML = movie.Year;
                row.insertCell(2).innerHTML = movie.Type;
                row.insertCell(3).innerHTML = movie.imdbID;
                row.insertCell(4).innerHTML = '<button>Add this</button>'
                //console log the movie object to see what properties you can use
                console.log(movie);
            });
        })
        .catch(err => console.error(err));
    userinput.value = '';
};
search.addEventListener('click', func);