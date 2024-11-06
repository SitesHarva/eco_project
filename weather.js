const api = '4a1ddb8e9527b03b2d5f90de93149b52';

const inputApi = document.querySelector('.inputApi');
const weatherButton = document.querySelector('.weatherButton');
const resultApi = document.querySelector('.resultApi');
const resultApi2 = document.querySelector('.resultApi2');
const resultApi3 = document.querySelector('.resultApi3');
const errorApi = document.querySelector('.errorApi');
const url = 'https://api.openweathermap.org/data/2.5/weather';

weatherButton.addEventListener('click', function() {
    if (inputApi.value.length < 2) {
        errorApi.innerHTML = 'Назва міста неправильна';
        return;
    }
    errorApi.innerHTML = '';
    getWeather(inputApi.value);
});

async function getWeather(city) {
    try {
        const response = await fetch(`${url}?q=${city}&units=metric&appid=${api}`);
        const data = await response.json();

        if (data.cod === '404') {
            errorApi.innerHTML = 'Місто не знайдено';
            return;
        }

        const temp = data.main.temp;
        const wind = data.wind.speed;
        const humidity = data.main.humidity;
        const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        resultApi.innerHTML = `Температура: ${temp} °C`;
        resultApi2.innerHTML = `Вітер: ${wind} м/с`;
        resultApi3.innerHTML = `Вологість: ${humidity} %`;

       
        const iconElement = document.createElement('img');
        iconElement.src = weatherIcon;
        iconElement.alt = data.weather[0].description;
        resultApi.appendChild(iconElement);

    } catch (error) {
        console.log(error);
        errorApi.innerHTML = 'Помилка з\'єднання. Спробуйте ще раз.';
    }
}


setInterval(() => {
    if (inputApi.value) {
        getWeather(inputApi.value);
    }
}, 600000); 
