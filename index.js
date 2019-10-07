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
let H = canvas.height;
let W = canvas.width;
let arr = [];

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
            raining();
            weatherText.innerHTML="rain"
            break;
          case "snow":
            weatherText.innerHTML="snow"
            myClass="snowFlake"
            snowing();
        }
        weatherIcon.className=`fas fa-${myClass} weathericon`;
      })
      .catch(err => console.log("err"));
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

function snowing(){
  requestAnimationFrame(snowing)
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle="white";
  ctx.beginPath();
  for(let i = 0; i<arr.length; i++){
  let f = arr[i];
  ctx.moveTo(f.x, f.y);
  ctx.arc(f.x,f.y,f.r,0,Math.PI*2)
  }
  ctx.fill();
  moveFlakes();
}

function moveFlakes(){
  for (let i = 0; i<arr.length; i++){
    let f = arr[i];
    f.y+=f.d;
    f.x+=f.d-0.3;
    if(f.y>H){
      f.y=Math.random()-10;
    }else if(f.x>W){
      f.x=0;
    }
  }
}

function addSomething(){
  for(let i = 0; i<10; i++){
    let x = Math.random()*W;
    let y = Math.random()*H;
    let r = Math.random()*4;
    let d = Math.random();
    arr.push({x:x, y:y-H, r:r, d:d})
    }
  }

function raining(){
  requestAnimationFrame(raining)
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle="white";
  ctx.beginPath();
  for(let i = 0; i<arr.length; i++){
  let f = arr[i];
  ctx.moveTo(f.x, f.y);
  ctx.arc(f.x,f.y,1,0,Math.PI*2)
  }
  ctx.fill();
  moveDrops();
}
  function moveDrops(){
    for (let i = 0; i<arr.length; i++){
      let f = arr[i];
      f.y+=3;
      f.x+=1.5;
      if(f.y>H){
        f.y=0;
      }else if(f.x>W){
        f.x=0;
      }
    }
  }


addSomething();
form.addEventListener("submit",function(e){
  e.preventDefault();
  getWeather();
})
addTime();
