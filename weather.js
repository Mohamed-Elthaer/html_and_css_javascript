let namecity = document.querySelector(".city");
console.log(namecity);

let tempreture = document.querySelector(".temp");

let tempicon = document.querySelector(".weather-icon");

let weatherDesc = document.querySelector(".description");

let input = document.querySelector("input");

let searchbtn = document.querySelector("button");

let winder = document.querySelector(".wind");

let humiditing = document.querySelector(".humidity");

let weatherBox = document.querySelector(".weather");

let errOmasseg = document.querySelector(".erro-masseg");

let press = document.querySelector(".press");

let feel = document.querySelector(".feel");

let sun = document.querySelector(".sun");

let sunset = document.querySelector(".sunset");

const apikey = "60e574b8ab9b07cba020b71cde41a63b";

searchbtn.addEventListener("click", () => {
  let city = input.value.trim();
  weatherBox.style.display = "none";
  namecity.innerHTML = "";
  tempreture.innerHTML = "";
  tempicon.innerHTML = "";
  weatherDesc.innerHTML = "";
  winder.innerHTML = "";
  humiditing.innerHTML = "";
  feel.innerHTML = "";
  press.innerHTML = "";
  sun.innerHTML = "";
  sunset.innerHTML = "";

  if (city === "") {
    errOmasseg.textContent = "please Enter city!..";
    errOmasseg.style.display = "block";
    setTimeout(() => (errOmasseg.style.display = "none"), 3000);
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
  )
    .then((result) => {
      console.log(result);
      // let mydata=result.json();
      // console.log(mydata)
      return result.json();
    })
    .then((data) => {
      if (data.cod === 404) {
        errOmasseg.textContent = "No City Found..";
        errOmasseg.style.display = "block";
        setTimeout(() => (errOmasseg.style.display = "none"), 3000);
        return;
      }

      namecity.innerHTML = `${data.name} In ${data.sys.country}`;

      tempreture.innerHTML = `${data.main.temp}°c`;

      let iconcode = data.weather[0].icon;
      tempicon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconcode}@2x.png" alt="weather icon">`;

      weatherDesc.innerHTML = data.weather[0].description;

      winder.innerHTML = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;

      humiditing.innerHTML = `${data.main.humidity} %`;

      feel.innerHTML = `${data.main.feels_like} °C`;

      press.innerHTML = `${data.main.pressure} hPa`;

      sun.innerHTML = `${new Date(
        data.sys.sunrise * 1000
      ).toLocaleTimeString()}`;
      sunset.innerHTML = `${new Date(
        data.sys.sunset * 1000
      ).toLocaleTimeString()}`;
      weatherBox.style.display = "block";

      if (data.weather[0].main === "Clear") {
        weatherBox.style.background = "linear-gradient(135deg,#fcd34d,#f59e0b)";
      } else if (data.weather[0].main === "Rain") {
        weatherBox.style.background = "linear-gradient(135deg,#3b82f6,#1e40af)";
      } else {
        weatherBox.style.background = "linear-gradient(135deg,#00feba,#5b548a)";
      }
    })
    .catch(() => {
      errOmasseg.textContent = "There was an error fetching data.";
      errOmasseg.style.display = "block";
      setTimeout(() => (errOmasseg.style.display = "none"), 3000);
      return;
    });
  input.value = "";
});
