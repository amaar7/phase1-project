const apiKey = 'live_f9Yq8z8rsShfLEWXaSukamTDdSxmcnksny0LsmAoQGrd2bpcswRI3vF0kY1Q90eu';
const apiUrl = 'https://api.thedogapi.com/v1/breeds';

const headers = {
  'X-Auth-Token': apiKey
};

fetch(apiUrl, { headers })
  .then(response => response.json())
  .then(data => {
    console.log('Football fixtures:', data);
  })
  .catch(error => console.error('Error:', error));
