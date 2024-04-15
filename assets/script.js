const searchBtn=document.getElementById("city-search-button");
const cityNameInput= document.getElementById("city-name-search");
const weatherCardsCont= document.getElementById("weather-cards");




function getWeatherInfo (city){//cityName is the actual value entered by user//
//we want to but const url inside the function bc template literal is being used!
const url= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=a8fde234c6df99a82c3f2846a5f0faeb`



    
fetch(url)
//I wanted to write more than the bare minimum, and practice proper erro handling//
.then(function(response){
    if(response.status ===404){
    throw new Error ('404-Not Found');
}
    if(response.status===500){
        throw new Error ('500-Internal Server Error');
}
    if(response.status===200){
        return response.json();
    }
})

.catch(function(error){
console.error('Problem has occured', error);
})


.then(function(data){
//slicing the data means starting at index 0 up to index 5 NOT including index 5. So that would be list items 1-5..  1 is index[0] and 5 is index[5]
//taking the data that is returned from the api call and getting the list property from the weather API. 
    const weatherForecast= data.list.slice(0,5);

    updateWeatherCards(weatherForecast);// i want to use the info gathered from the list property to be used to update date, icon, windspeed, and humidity



 console.log(data); 
});

}

//starting a new function to update the weather cards!

function updateWeatherCards (forecastData){
    weatherCardsCont.innerHTML=''; //this clears the inputs that are already in the html doc!

forecastData.forEach((item,index)=> {
    //=> used for each (loop) item (indicated by the weather API)
  const date= item.dt_txt; 
  const icon=item.weather[0].icon;
  const windSpeed= item.wind.speed;
  const temperature= item.main.temp;
  const humidityLevel= item.main.humidity;


  const card=document.createElement('div')
  card.classList.add('card');
  const cardBody= document.createElement('div');
  cardBody.classList.add('card-body');
//remember back tics when doing innerhtml and you want to do template literal
  cardBody.innerHTML=`
  
  <input type="text" class="date" value="${date}" readonly>
  <img src="https://openweathermap.org/img/w/${icon}.png" class="card-img-top' alt="weather-icon">
  <input type="text" class="temp-input" value="Temperature:${temperature} °F" readonly>
  <input type="text" class="wind-speed-input" value="Wind Speed:${windSpeed} mph" readonly>
  <input type="text" class="humidity-input" value="Humidity:${humidityLevel}%" readonly>
  `;
  card.appendChild(cardBody);
  weatherCardsCont.appendChild(card);
    
});

}

document.addEventListener('DOMContentLoaded', function(){
    searchBtn.addEventListener('click',function(){
        const city=cityNameInput.value.trim();
        if(city!==''){
            getWeatherInfo(city);
        }
    })
})
    


    
