const searchInput = document.querySelector('#search');
const clearBtn = document.querySelector('#clear-history');

// Always show the clear button
clearBtn.style.display = 'block';

// Clear history on button click
clearBtn.addEventListener('click', () => {
  localStorage.removeItem('weatherSearchHistory');

  const searchItems = document.querySelector('.search-items');
  if (searchItems) {
    searchItems.innerHTML = '';
  }
});

// Load and display history on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedHistory = JSON.parse(localStorage.getItem('weatherSearchHistory')) || [];
  savedHistory.forEach(item => {
    searchHistory(item.city, item.condition, item.curTemp);
  });
});

searchInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    const searchTerm = searchInput.value;
    if (searchTerm.trim() === '') return;

    searchItem(searchTerm);
    event.preventDefault();
  }
});

function searchItem(item) {
  const token = item;
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=3b244e09f66e41cf84413159250208&q=${token},Ethiopia&days=7&aqi=yes&alerts=yes`
  )
    .then((response) => response.json())
    .then((data) => {
      const city = data.location.name;
      const condition = data.current.condition.icon;
      const currentTemp = data.current.temp_c;
      searchResult(city, condition, currentTemp);
    })
    .catch((error) => {
      console.error('Weather fetch error:', error);
    });
}

function searchResult(city, condition, curTemp) {
  const displayBox = document.querySelector('.search-result');

  // Clear previous search result
  displayBox.innerHTML = '';

  const title = document.createElement('h3');
  title.innerHTML = city;

  const img = document.createElement('img');
  img.setAttribute('src', condition);

  const imgWrapper = document.createElement('div');
  imgWrapper.append(img);

  const tempResult = document.createElement('p');
  tempResult.innerHTML = `${curTemp}°C`;

  displayBox.append(title, imgWrapper, tempResult);

  searchHistory(city, condition, curTemp);
}

function searchHistory(city, condition, curTemp) {
  const searchItems = document.querySelector('.search-items');

  const row = document.createElement('div');
  row.classList.add('row');

  const cityName = document.createElement('p');
  cityName.innerHTML = city;

  const tempValue = document.createElement('p');
  tempValue.classList.add('temp-value');
  tempValue.innerHTML = `${curTemp}°C`;

  const iconBox = document.createElement('div');
  iconBox.classList.add('icon');

  const img = document.createElement('img');
  img.setAttribute('src', condition);
  iconBox.appendChild(img);

  row.append(cityName, tempValue, iconBox);
  searchItems.appendChild(row);

  // Save to localStorage
  const history = JSON.parse(localStorage.getItem('weatherSearchHistory')) || [];

  const exists = history.some(entry => entry.city === city);
  if (!exists) {
    history.push({ city, condition, curTemp });
    localStorage.setItem('weatherSearchHistory', JSON.stringify(history));
  }
}
