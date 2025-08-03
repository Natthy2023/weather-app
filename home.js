const timeBanner = document.querySelector('.time-banner');
const plusBtn = document.querySelector('.fa-plus');
const barsBtn = document.querySelector('.fa-bars');
const weatherMood = document.querySelector('#weather-mood');
const weatherDegree = document.querySelector('#weather-degree');
const maxTemp = document.querySelector('#maxTemp');
const minTemp = document.querySelector('#minTemp');
const selectedRegion = document.querySelector('#region');
const timeList = document.querySelectorAll('.box .time');
const degreeList = document.querySelectorAll('.box .degree');
const conditionList = document.querySelectorAll('.box .condition img');
const row = document.querySelectorAll('.row .left-box span');
const imgList = document.querySelectorAll('.row .right-box img');
const realFeel = document.querySelector('.real span');
const humid = document.querySelector('.humidity span');
const visibility = document.querySelector('.visibility span');
const uvIndex = document.querySelector('.uv-index span');

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
       const current = data.current;
    humid.textContent = `${current.humidity}%`;
    realFeel.textContent = `${current.feelslike_c}°C`;
    visibility.textContent = `${current.vis_km} km`;
    uvIndex.textContent = current.uv;
      
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

      for (let i = 0; i < timeList.length; i++) {
        const hours = data.forecast.forecastday[3].hour;
        const currTemp = hours[i].temp_c;
        const icons = hours[i].condition.icon;
        const time = new Date(hours[i].time);
        let hr = time.getHours();
        let min = time.getMinutes();
        console.log(currTemp);
        timeList[i].textContent = `${String(hr).padStart(2, '0')}:${String(
          min
        ).padStart(2, '0')}`;
        degreeList[i].textContent = `${currTemp}°C`;
        conditionList[i].setAttribute('src', icons);
        imgList[i].setAttribute('src', icons);
      }
    })
    .catch((error) => {
      document.querySelector('.bg-banner').classList.add('animated-error-popup');
      document.querySelector('.bg-banner').textContent =('<p >Weather fetch error: </p>', error);
      
      return false;
    });
 
});
document.addEventListener('DOMContentLoaded', function () {
  const date = new Date();
  const today = date.getDate();
  const day = date.getDay();
  const month = date.getMonth();
  timeBanner.textContent = `${daysOfWeek[day]}, ${months[month]} ${today}`;
  for(let i=0 ; i<row.length; i++){
    row[i].textContent = `${daysOfWeek[i].slice(0,3)}, ${months[month]} ${today+i+1}`;
  }
});
