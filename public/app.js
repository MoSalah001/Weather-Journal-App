const baseApiUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = '&appid=7f13bd553d3fcb48f54db5ec8ac0ad7c&units=imperial';
let appBtn = document.getElementById('generate');
const feel = document.getElementById('feelings');
let hider = document.getElementById('toggle');
let herokuHost = "https://openweather-app-demo.herokuapp.com";

appBtn.addEventListener('click',getZipCode);

// fetch api data with user-entered zip code
function getZipCode(){
    let zipCode = document.getElementById('zip').value;
    getApiData(baseApiUrl,zipCode,apiKey,feel.value)
}
const getApiData = async (baseApiUrl,inputData,apiKey,feeling)=>{
    try {
        document.getElementById('error').textContent = "";// hide error message when a valid zip code is entered 
        const resApi = await fetch(baseApiUrl+inputData+apiKey);
        const resApiData = await resApi.json();
        let projectData = {
            id : resApiData.sys.id,
            cityName : resApiData.name,
            currentTemp : Math.round(resApiData.main.temp),
            country : resApiData.sys.country,
            maxTemp : Math.round(resApiData.main.temp_max),
            minTemp : Math.round(resApiData.main.temp_min),
            windSpeed:resApiData.wind.speed,
            windDirection:resApiData.wind.deg,
            weather : resApiData.weather[0].main,
            weatherDesc:resApiData.weather[0].description,
            feelsLike:Math.round(resApiData.main.feels_like),
            humidity:resApiData.main.humidity,
            pressure:resApiData.main.pressure,
            timezone:resApiData.timezone/3600 > 0 ? "UTC+"+resApiData.timezone/3600: resApiData.timezone = 0 ? "UTC": "UTC"+resApiData.timezone/3600,
            visibility:resApiData.visibility,
            feeling: feeling
        }
        sendToServer(projectData);
    } catch(error){
        hider.className='';
        document.getElementById('error').textContent = "Please enter a valid zip code";
        hider.classList.add('hide');
    }
}
// send api data after no error detected
const sendToServer = async (dataObj)=>{
    hider.className='';
    hider.classList.add('show');
    await fetch(herokuHost+'/addData',{
            method : "POST",
            body:JSON.stringify(dataObj),
            headers:{
                "Content-Type":"application/json"
            }
        })
        serverData();
}

const serverData = async()=>{
    const callData = await fetch(herokuHost+'/getData');
    const data = await callData.json();
    showData(data);
}

function showData(obj){
    console.log(obj.weather);
    const date = new Date();
    document.getElementById('date').innerHTML = `Date: ${date.getDate()} / ${date.getMonth()+1} / ${date.getFullYear()}`;
    document.getElementById('temp').textContent =`Current temp: `+obj.currentTemp;
    document.getElementById('realFeel').textContent =`Feels like: `+obj.feelsLike;
    let country = document.getElementById('country');
    country.textContent =`Country: `+obj.country;
    country.style.gridArea = "country";
    let city = document.getElementById('cityName');
    city.textContent =`City: `+obj.cityName;
    city.style.gridArea = "city";
    let feel = document.getElementById('feeling');
    feel.textContent =`You feel: `+obj.feeling;
    feel.style.gridArea = 'feel';
    let weather = document.getElementById('weatherDesc');
    weather.textContent =`Weather: `+obj.weatherDesc;
    weather.style.gridArea = "weather";
    document.getElementById('maxTemp').textContent =`Max Temp: `+obj.maxTemp;
    document.getElementById('minTemp').textContent =`Min Temp: `+obj.minTemp;
    document.getElementById('windSpeed').textContent =`Wind Speed: `+obj.windSpeed;
    document.getElementById('humidity').textContent =`Humidity: `+obj.humidity;
    document.getElementById('visibility').textContent =`Visibility: `+obj.visibility;
    document.getElementById('pressure').textContent =`Pressure: `+obj.pressure;
    document.getElementById('windDirection').textContent =`Wind Direction: `+obj.windDirection;
    document.getElementById('timezone').textContent =`Time Zone: `+obj.timezone;
    switch(obj.weather){
        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url(weather/thunder.jpg)'
            break;
        case 'Drizzle':
            document.body.style.backgroundImage = 'url(weather/rain.jpg)'
            break;
        case 'Rain':
            document.body.style.backgroundImage = 'url(weather/rain.jpg)'
            break;
        case 'Clear':
            document.body.style.backgroundImage = 'url(weather/clear.jpg)'
            break;
        case 'Snow':
            document.body.style.backgroundImage = 'url(weather/snow.jpg)'
            break;
        case 'Clouds':
            document.body.style.backgroundImage = 'url(weather/cloudy.jpg)'
            break;
        case 'Tornado':
            document.body.style.backgroundImage = 'url(weather/tornado.jpeg)'
            break;
        case 'Mist'|| 'Fog' || 'Haze':
            document.body.style.backgroundImage = 'url(weather/mist.jpg)'
            break;
        case 'Dust' || 'Sand':
            document.body.style.backgroundImage = 'url(weather/sand.jpg)'
            break;
        case 'Squall':
            document.body.style.backgroundImage = 'url(weather/squall.jpg)'
            break;
        default :
        document.body.style.backgroundImage = 'url(weather/ash.jpeg)'
        break;
    }
}