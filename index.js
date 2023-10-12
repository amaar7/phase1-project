document.addEventListener('DOMContentLoaded', (event) =>{
  searchDogBreeds();
  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', searchDogBreeds);
});

const apiKey = 'live_f9Yq8z8rsShfLEWXaSukamTDdSxmcnksny0LsmAoQGrd2bpcswRI3vF0kY1Q90eu';  
const apiUrl = 'https://api.thedogapi.com/v1/breeds';
const imageApiUrl = 'https://api.thedogapi.com/v1/images/search';

const headers = {
  'X-Auth-Token': apiKey
};

function searchDogBreeds() {
  const breedInput = document.getElementById('breedInput').value.toLowerCase();
  fetch(apiUrl, { headers })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const breedPromises = data
        .filter(breed => breed.name.toLowerCase().includes(breedInput))
        .slice(0, 10) //it will display the first 10 
        .map(breed => {
          return fetch(`${imageApiUrl}?breed_ids=${breed.id}`, { headers })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(imagesData => {
              return { breedName: breed.name, imageUrl: imagesData[0].url };
            });
        });

      Promise.all(breedPromises)
        .then(results => {
          displayResults(results);
        })
        .catch(error => console.error('Error:', error));
    })
    .catch(error => console.error('Error:', error));
}

function displayResults(results) {
  const breedResultsDiv = document.getElementById('breedResults');
  breedResultsDiv.innerHTML = '';
  if (results.length === 0) {
    breedResultsDiv.innerHTML = 'No matching breeds found.';
    return;
  }

    // i Created a container to hold the images in a 3x3 grid
    const gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');
  
  results.forEach(result => {
    const breedElement = document.createElement('div');
    breedElement.classList.add('breed-item');

    // Created an image element and set its source to the fetched image URL
    const imgElement = document.createElement('img');
    imgElement.src = result.imageUrl;
    imgElement.alt = result.breedName;
    imgElement.classList.add('breed-image');

    // Created a paragraph element to display the breed name
    const breedNameElement = document.createElement('p');
    breedNameElement.textContent = result.breedName;
    breedNameElement.classList.add('breed-name');

    // Appended the image and breed name to the breedElement
    breedElement.appendChild(imgElement);
    breedElement.appendChild(breedNameElement);

    gridContainer.appendChild(breedElement);
  });

    breedResultsDiv.appendChild(gridContainer);
}
