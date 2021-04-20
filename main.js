// Access DOM elements
const reportSection1 = document.getElementById('weather-report1');
const reportSection2 = document.getElementById('weather-report2');
const reportSection3 = document.getElementById('weather-report3');
const reportSection4 = document.getElementById('weather-report4');
const reportSection5 = document.getElementById('weather-report5');
const reportSection6 = document.getElementById('weather-report6');
const reportSection7 = document.getElementById('weather-report7');
const reportSection8 = document.getElementById('weather-report8');
const cityForm = document.getElementById('city-form');
const cityInput = document.getElementById('city-input');

let apiRequest = new XMLHttpRequest();


// send the request

cityForm.addEventListener('submit', ($event) => {
    //prevent the default behavior of the button
    $event.preventDefault();
   const chosenCity = cityInput.value;
    // making http request
    apiRequest.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + chosenCity + '&APPID=b34fddd3dae4a2eb0ad363b62f98ba1e');
    apiRequest.send();
});

// handling the data returned by the request
apiRequest.onreadystatechange = () => {
    if (apiRequest.readyState === 4) {
        // check if the city is not found
            if (apiRequest.status === 404) {
                return  reportSection1.textContent = 'city not found!';
            }
        const response = JSON.parse(apiRequest.response);

        reportSection1.textContent = "What's the weather like today in " + response.name + "," + response.sys.country +"?"
        reportSection2.textContent = response.weather[0].description
        reportSection3.textContent = response.main.temp + '\u00B0C'
        reportSection4.textContent = "Day: " + response.main.temp_min + '\u00B0C' + " | Night: "+  response.main.temp_max + '\u00B0C'
        reportSection5.textContent = "Feels like: " + response.main.feels_like
        reportSection6.textContent = "Pressure: " +response.main.pressure + 'hPa'
        reportSection7.textContent = "Humidity: " + response.main.humidity + '%'
        reportSection8.textContent = "Wind: " +response.wind.speed + 'km/h'


    }
}
