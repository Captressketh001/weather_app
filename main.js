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

// function to round up temp to 1 d.p
function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

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
        reportSection3.textContent = round(response.main.temp)/10 + '\u00B0C'
        reportSection4.textContent = "Day: " + round(response.main.temp_min)/10 + '\u00B0C' + " | Night: "+  round(response.main.temp_max)/10 + '\u00B0C'
        reportSection5.textContent = "Feels like: " + round(response.main.feels_like)/10 + '\u00B0C' 
        reportSection6.textContent = "Pressure: " +response.main.pressure + 'hPa'
        reportSection7.textContent = "Humidity: " + response.main.humidity + '%'
        reportSection8.textContent = "Wind: " +response.wind.speed + 'km/h'


    }
}
