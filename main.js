let weatherImage = document.querySelector('#weather-image')
let temperature = document.querySelector('#temperature');
let time = document.querySelector('#time');
let celsius = document.querySelector('#celsius');
let fahrenheit = document.querySelector('#fahrenheit')
let city = document.querySelector('#city');
let tempDegrees;
let lowDegrees;
let highDegrees;

let humidity = document.querySelector('#humidity');
let pressure = document.querySelector('#pressure');
let low = document.querySelector('#low');
let high = document.querySelector('#high');
let sunrise = document.querySelector('#sunrise');
let sunset = document.querySelector('#sunset');
let wind = document.querySelector('#wind');


let backgrounds = {
	overcast: 'https://images.unsplash.com/photo-1499956827185-0d63ee78a910?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
	"Clear": 'https://images.unsplash.com/photo-1445985202117-5acf50779a3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80'
}


let windDegrees = function(num) {
	if ((num >= 0 && num <= 25) || num > 340 ) {
		return 'N'
	} else if (num >25 && num <= 65) {
		return 'NE';
	} else if (num > 65 && num <= 115) {
		return 'E';
	} else if (num > 115 && num <= 155) {
		return 'SE';
	} else if (num > 155 && num <= 205) {
		return 'S';
	} else if (num > 205 && num <= 260) {
		return 'SW';
	} else if (num > 260 && num <= 300) {
		return 'W';
	} else if (num > 300 && num <= 340) {
		return 'NW';
	}
}

time.innerHTML = new Date().toDateString()


fahrenheit.addEventListener('click', function() {
	temperature.textContent = Math.round(tempDegrees * (9/5) + 32) + '˚ F';
	low.textContent = Math.round(lowDegrees * (9/5) + 32) + '˚ F';
	high.textContent = Math.round(highDegrees * (9/5) + 32) + '˚ F';
})
celsius.addEventListener('click', function() {
	temperature.textContent = Math.round(tempDegrees) + '˚ C';
	low.textContent = Math.round(lowDegrees) + '˚ C';
	high.textContent = Math.round(highDegrees) + '˚ C';
})


if ("geolocation" in navigator) {
	navigator.geolocation.getCurrentPosition(function(position) {
let request = new XMLHttpRequest();
let latitude = position.coords.latitude;
let longitude = position.coords.longitude;
	request.open('GET', 'https://fcc-weather-api.glitch.me/api/current?lat=' + latitude + '&lon=' + longitude)	

	request.onload = function() {

		let parsed = JSON.parse(this.response)
		console.log(parsed)
		let sunriseTime = new Date(parsed.sys.sunrise * 1000);
		let sunsetTime = new Date(parsed.sys.sunset * 1000)

		weatherImage.src = parsed.weather[0].icon;

		tempDegrees = parsed.main.temp
		lowDegrees = parsed.main.temp_min;
		highDegrees = parsed.main.temp_max;

		temperature.textContent = Math.round(tempDegrees * (9/5) + 32) + '˚ F';
		city.textContent = parsed.name;
		document.getElementsByTagName('body')[0].style.backgroundImage = "url(" + backgrounds[parsed.weather[0].main] + ")";

		humidity.textContent = parsed.main.humidity + '%';
		pressure.textContent = parsed.main.pressure;
		low.textContent = Math.round(lowDegrees * (9/5) + 32) + '˚ F';
		high.textContent = Math.round(highDegrees * (9/5) + 32) + '˚ F';
		sunrise.textContent = sunriseTime.getHours() + ':' + sunriseTime.getMinutes();
		sunset.textContent = sunsetTime.getHours() + ':' + sunsetTime.getMinutes();
		wind.textContent = parsed.wind.speed + ' ' + windDegrees(parsed.wind.deg);
	}

	request.send()



	})
	

}