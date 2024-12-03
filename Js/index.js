getInput=document.getElementById("search");
getbtn=document.getElementById("submit");
container=document.getElementById("container");
var city="";
var weather=[];
document.querySelector(".loader").classList.remove("d-none");

getInput.addEventListener("keydown", function() {
    city = getInput.value.trim().toLowerCase();
    getData(city);
});

getbtn.addEventListener("click", function() {
    if (city) {
        getData(city);
        
    } else {
        console.error("Please enter a valid city name");
    }
})



async function getData(city){
    var res=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=50f274fe30cd454b822123243240312&q=${city}&days=3&aqi=no`,{method:"GET"});
   
    var data = await res.json();
    weather=data;
    document.querySelector(".loader").classList.add("d-none");
    display();
  }

function display(){
    var cartona="";
    if(weather){
        
        var currentDayDate = new Date();
            var currentDate = currentDayDate.toLocaleDateString(undefined, {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            });
          var iconUrl = weather.current.condition.icon;
         var iconsUrl = `https:${iconUrl}`;

        cartona+=`
                 <div class="today col-md-4 p-2">
                    <div class="header" id="today">
                    <span class=" date text-secondary ">${currentDate}</span>
                    </div> 
                    <div class="content text-center" id="current">
                    <div id="cityName"class="location text-secondary m-2">${weather.location.name}</div>
                    <div class="degree">
                        <div class="num h1">${weather.current.temp_c}<sup>o</sup>C</div>
                      
                        <div class="icon">
                            <img src="${iconsUrl}" alt="" width="90">
                        </div>	
                    
                    </div>
                    <div class="custom text-info">${weather.current.condition.text}</div>
                    <span class="ms-2"><img src="Imges/icon-umberella.png" alt="">${weather.current.humidity}%</span>
                                                <span class="ms-2"><img src="Imges/icon-wind.png" alt="">${weather.current.wind_kph}km/h</span>
                                                <span class="ms-2"><img src="Imges/icon-compass.png" alt="">${weather.current.wind_dir}</span>
                    </div>
                </div>	
                </div>
        `;
        weather.forecast.forecastday.slice(1).forEach(function (x) {
            var date = new Date(x.date);
            var day = { weekday: 'long' };
            var tomorrow = date.toLocaleDateString(undefined, day);
            var iconUrl = `https:${x.day.condition.icon}`;
            cartona+=` <div class="tomorrow col-md-4 text-center p-2">
                        <div class="header">
                            <div class="day h3 text-info">${tomorrow}</div>
                        </div> 
                        <div class="content">
                            <div class="icon m-2">
                                <img src="${iconUrl}" alt="" width="48">
                            </div>
                            <div class="degree h5 m-2">${x.day.avgtemp_c}<sup>o</sup>C</div> 
                            <div class="custom h4 text-info m-2">${x.day.condition.text}</div>
                        </div>
                        </div>	`;
    });
         container.innerHTML= cartona;
    
    }

}
