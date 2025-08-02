const timeBanner = document.querySelector('.time-banner');
const plusBtn = document.querySelector('.fa-plus');
const barsBtn = document.querySelector('.fa-bars');
const weatherMood = document.querySelector('#weather-mood');
const weatherDegree = document.querySelector('#weather-degree');
const maxTemp = document.querySelector('#maxTemp');
const minTemp = document.querySelector('#minTemp');
const selectedRegion = document.querySelector('#region');
const timeList = document.querySelectorAll('.box .time');

const daysOfWeek = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tueday',
  3: 'Wedneday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday'
};
const months = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December'
};

selectedRegion.addEventListener('click', function (event) {
  let token = event.target.value;
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=3b244e09f66e41cf84413159250208&q=${token},Ethiopia&days=7&aqi=yes&alerts=yes`
  )
    .then((response) => response.json())
    .then((data) => {
      const hours = data.forecast.forecastday.hour;
      const currentTemp = data.current.temp_c;
      const condition = data.current.condition;
      const dayTemp = data.forecast.forecastday[0].day;
      maxTemp.textContent = `${dayTemp.maxtemp_c}°C`;
      minTemp.textContent = `${dayTemp.mintemp_c}°C`;
      document.querySelector('.bg-banner img').src = condition.icon;
      document
        .querySelector('.bg-banner img')
        .setAttribute('title', condition.text);
      weatherMood.textContent = condition.text;
      weatherDegree.textContent = `${currentTemp}°C`;
      
        const time = new Date(hours[index].time_epoch);
        let hr = time.getHours();
        let min = time.getMinutes();
        console.log(time);
        box[index].textContent = `${hr}:${min}`;
      
    })
    .catch((error) => {
      console.log('Error: ', error);
      return false;
    });
  console.log(token);
});
document.addEventListener('DOMContentLoaded', function () {
  const date = new Date();
  const today = date.getDate();
  const day = date.getDay();
  const month = months[date.getMonth()];
  timeBanner.textContent = `${daysOfWeek[day]}, ${month} ${today}`;
});
