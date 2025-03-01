const weather = {
  fetchWeather(city) {
    fetch(`/weather?city=${encodeURIComponent(city)}`)
      .then(res => res.json())
      .then(data => this.displayWeather(data))
      .catch(err => console.error(err));
  },

  displayWeather(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector('.city').innerText = `Weather in ${name}`;
    document.querySelector('.icon').src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector('.description').innerText = description;
    document.querySelector('.temp').innerText = `${temp}°C`;
    document.querySelector('.humidity').innerText = `Humidity: ${humidity}%`;
    document.querySelector('.wind').innerText = `Wind speed: ${speed} km/h`;
    document.body.style.backgroundImage = `url('https://picsum.photos/1600/900?${name}')`;
  },

  search() {
    this.fetchWeather(document.querySelector('.searchbar').value);
  }
};

document.querySelector('.search button').addEventListener('click', () => weather.search());
document.querySelector('.searchbar').addEventListener('keyup', e => { if (e.key === 'Enter') weather.search(); });

// Initial load
weather.fetchWeather('Nairobi');