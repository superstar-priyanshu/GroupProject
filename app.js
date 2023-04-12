//import the api key
import {myapiKey } from './secret.js';

document.getElementById('search-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const title = document.getElementById('title').value;
    const actor = document.getElementById('actor').value;
  
    const results = await fetchMoviesFromOMDb(title, actor);
    displayResults(results);
  });
  
  async function fetchMoviesFromOMDb(title, actor) {
    const apiKey = myapiKey; 
    const titleQuery = title ? `&s=${encodeURIComponent(title)}` : '';
    const actorQuery = actor ? `&s=${encodeURIComponent(actor)}` : '';
    
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}${titleQuery}${actorQuery}`);
  
    if (!response.ok) {
      throw new Error(`Error fetching movies: ${response.statusText}`);
    }
  
    const movieData = await response.json();
  
    if (movieData.Response === 'False') {
      throw new Error(`Error fetching movies: ${movieData.Error}`);
    }
  
    return movieData.Search || [movieData];
  }
  
  async function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
  
    for (const movie of results) {
      const movieCard = document.createElement('div');
      movieCard.classList.add('movie-card');
  
      const moviePoster = document.createElement('img');
      moviePoster.classList.add('movie-poster');
      moviePoster.src = movie.Poster;
      movieCard.appendChild(moviePoster);
  
      const movieTitle = document.createElement('h3');
      movieTitle.textContent = movie.Title;
      movieCard.appendChild(movieTitle);
  
      const releaseYear = document.createElement('p');
      releaseYear.textContent = `Release Year: ${movie.Year}`;
      movieCard.appendChild(releaseYear);
  
      resultsDiv.appendChild(movieCard);
    }
  }
  const form = document.getElementById('search-form2');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const year = document.getElementById('year').value;
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        const resultContainer = document.getElementById('result-container');
        resultContainer.innerHTML = '';
        data.forEach((winner) => {
          const filmName = winner.film;
          const p = document.createElement('p');
          p.textContent = `The winner in ${year} was: ${filmName}`;
          resultContainer.appendChild(p);
        });
      }
    };
    xhr.open('GET', `/winners/${year}`);
    xhr.send();
  });

