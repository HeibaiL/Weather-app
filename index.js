let temperature = document.querySelector(".tempnum");
let humidity = document.querySelector(".humiditynum");
let windSpeed = document.querySelector(".windspeed");
let weatherIcon = document.querySelector(".weathericon")
let weatherText = document.querySelector(".weathertext")
let timeElement = document.querySelector(".time");
let dateElement = document.querySelector(".date");
let button = document.querySelector(".btn");
let form = document.querySelector(".form");
let input = document.querySelector(".input");
let inputCity = document.querySelector(".city");
let canvas = document.querySelector("#canvas");

let ctx = canvas.getContext("2d");




  function getWeather(){
    let apikey =  "&APPID=616f1c30e7469bc62ca97046f7babe7a";
    let API = "http://api.openweathermap.org/data/2.5/weather?q="
    let city = input.value;
    input.value="";
    let units= "&units=metric"
    let url = `${API}${city}${apikey}${units}`;

    fetch(url)
      .then(response => response.json())
      .then(data =>{
        let weather = data;
        humidity.innerHTML = `${weather.main.humidity}`;
        temperature.innerHTML = Math.floor(parseInt(`${weather.main.temp}`));
        windSpeed.innerHTML = `${weather.wind.speed}`;
        let description = weather.weather[0].main.toLowerCase();
        let myClass;
        inputCity.innerHTML=data.name;
        switch(description){
          case "clouds":
            myClass = "cloud-sun"
            weatherText.innerHTML = "clouds"
            break;
          case "clear":
            myClass = "sun"
            weatherText.innerHTML="clear sky"
            break;
          case "rain":
            myClass="cloud"
            //raining();
            weatherText.innerHTML="rain"
            break;
          case "snow":
            weatherText.innerHTML="snow"
            myClass="snowFlake"
            //snowing();
        }
        weatherIcon.className=`fas fa-${myClass} weathericon`;
      })
      .catch(err=>console.log("err"));

};

function addTime(){
  let date = new Date();
  let d = [
      "0"+date.getHours(),
      "0"+date.getMinutes(),
      "0"+date.getDate(),
      "0"+date.getMonth(),
      date.getFullYear(),
  ];
  let time = `${d[0].slice(-2)}:${d[1].slice(-2)}`;
  let day = `${d[2].slice(-2)}/${d[3].slice(-2)}/${d[4]}`
  timeElement.innerHTML = time;
  dateElement.innerHTML = day;
};




form.addEventListener("submit",function(e){
  e.preventDefault();
  getWeather();
})
addTime();
