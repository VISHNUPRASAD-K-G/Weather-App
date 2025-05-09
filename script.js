function bg_img(wea_desc, crnt_temp, weather_name, crnt_time){
    const time = crnt_time.split(' ');
    tm = time[0].split(':')[0];
    if((time[1].toLowerCase() == 'pm' && (tm >= 7 && tm< 12)) || (time[1].toLowerCase() == 'am' && ((tm <= 6 || tm == 12)))){
        bg_img_container.style.backgroundImage = 'url(https://wallpapers-clan.com/wp-content/uploads/2024/03/starfall-night-sky-mountains-aesthetic-gif-preview-desktop-wallpaper.gif)';
        
    }
    else if(crnt_temp>=38){
        bg_img_container.style.backgroundImage = 'url(https://img.freepik.com/premium-photo/heatwave-hot-sun-landscape-extreme-hot-weather-climate-change-global-warming-background_210545-2599.jpg)';
    }
    else if(crnt_temp<0){
        bg_img_container.style.backgroundImage = 'url(https://i.pinimg.com/originals/54/67/27/546727d1854d11df8c148ecd113a7cfb.gif)';
    }
    else if(crnt_temp >= 0 && crnt_temp < 10){
        bg_img_container.style.backgroundImage = 'url(https://i.pinimg.com/originals/8b/52/ab/8b52abc5c7e4f765c90d020f6b2078db.gif)'
    }
    else if(wea_desc == 'overcast clouds'){
        bg_img_container.style.backgroundImage = 'url(https://i.pinimg.com/originals/3e/8a/3f/3e8a3fe70d20e25055fba789d559cbaf.gif)';
    }
    else if(wea_desc == 'broken clouds'){
        bg_img_container.style.backgroundImage = 'url(https://i.gifer.com/srG.gif)';
    }
    else if(wea_desc == 'clear sky'){
        bg_img_container.style.backgroundImage = 'url(https://i.gifer.com/Lx0q.gif)'
    }
    
    else if(weather_name == 'Rain'){
        bg_img_container.style.backgroundImage = 'url(https://cdn.pixabay.com/animation/2023/03/26/01/15/01-15-42-612_512.gif)'
    }
    else if(crnt_temp >=10 && crnt_temp<20){
        bg_img_container.style.backgroundImage = 'url(https://assets.odishabytes.com/wp-content/uploads/2019/11/winter.jpg)'
    }
    else if(crnt_temp >=30 && crnt_temp<38){
        bg_img_container.style.backgroundImage = 'url(https://img.freepik.com/premium-photo/summer-meadow-bright-sunny-day-3d-illustration_433905-168.jpg?w=360)'
    }
    else{
        bg_img_container.style.backgroundImage = 'url(https://cdn.pixabay.com/animation/2023/03/11/17/29/17-29-27-410_512.gif)';
    }
}

function weatherDisply(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=e30b4f2947d41f879d186d6580324348`).then((response)=>{
        response.json().then((items)=>{

            let crnt_temp = (items.main.temp - 273.15).toFixed(2);
    
            let cntry = items.sys.country
    
            let city = items.name
    
            let fl_like = (items.main.feels_like - 273.15).toFixed(2);
    
            let weather_name = items.weather[0].main;
    
            let wea_desc = items.weather[0].description;
    
            let crnt_humidity = items.main.humidity;
    
            let atm_pressure = items.main.pressure;
    
            let wind_speed = items.wind.speed;
    
            let min_temp = (items.main.temp_min - 273.15).toFixed(2);
    
            let max_temp = (items.main.temp_max - 273.15).toFixed(2);
            console.log(max_temp);

            function getTimeFromOffsetSeconds(offsetSeconds) {
                const now = new Date();
                const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
                const localTime = new Date(utcTime + offsetSeconds  * 1000);
                return localTime.toLocaleTimeString();
            }
              
            crnt_time = getTimeFromOffsetSeconds(items.timezone);

            weather_containers.style.display = 'block';

            bg_img(wea_desc, crnt_temp, weather_name,crnt_time);

            item_container.innerHTML = `
                <!-- Main Weather contents -->
                <div class="p-3 d-flex align-items-center w-100 flex-column rounded-3" style="max-width: 500px; box-shadow: 3px 3px 10px black; color: white; background: rgba(250,250,250,.25);">
                    <h3>Current Weather</h3>
                    <div class="w-100 d-flex justify-content-between py-3">
                        <p>City: ${city}</p>
                        <p>Country: ${cntry}</p>
                    </div>
                    <div class="d-flex align-items-center flex-column">
                        <p>Time: ${crnt_time}</p>
                        <h1 class="fs-1 fw-bold">${crnt_temp} <sup>o<sub>C</sub></sup></h1>
                        <p class = 'mb-3'>Feels Like: ${fl_like} <sup>o<sub>C</sub></sup></p>
                        <img src=${`https://openweathermap.org/img/wn/${items.weather[0].icon}@2x.png`} alt="Weather Icon" />
                        <p class="mb-0 mt-3">Weather: ${weather_name}</p>
                        <p>Description: ${wea_desc}</p>
                    </div>
                </div>

                <!-- footer weather contents -->
                <div class="w-100">
                    <div class="container-fluid d-flex align-items-center justify-content-center mt-5">
                        <div class="row w-100">
                            <!-- humidity -->
                            <div class="col-md-3 mb-md-0 mb-3">
                                <div class=" d-flex align-items-center p-2 rounded h-100" id="pressure" style="box-shadow: 3px 3px 10px black; background: rgba(250,250,250,.25);">
                                    <img src="https://static.vecteezy.com/system/resources/previews/011/652/634/non_2x/humidity-3d-render-icon-illustration-png.png" alt="atm.jpg" width="50px" height="50px">
                                    <p class="text-white ms-2 mt-2">Humidty: ${crnt_humidity}%</p>
                                </div>
                            </div>
                            <!-- atm -->
                            <div class="col-md-3 mb-md-0 mb-3">
                                <div class="d-flex align-items-center p-2 rounded h-100" id="pressure" style="box-shadow: 3px 3px 10px black; background: rgba(250,250,250,.25);">
                                    <img src="./media/atm.png" alt="atm.jpg" width="50px" height="50px">
                                    <p class="text-white ms-2 mt-2">Atmospheric pressure: ${atm_pressure} hPa</p>
                                </div>
                            </div>
                            <!-- wind -->
                            <div class="col-md-3 mb-md-0 mb-3">
                                <div class="d-flex align-items-center p-2 rounded h-100" id="pressure" style="box-shadow: 3px 3px 10px black; background: rgba(250,250,250,.25);">
                                    <img src="https://as2.ftcdn.net/jpg/02/92/10/67/1000_F_292106720_1ZBw2t2XnsDHlL6K2QWNMUOTLwE6ES46.jpg" alt="atm.jpg" width="50px" height="50px" class = 'rounded'>
                                    <p class="text-white ms-2 mt-2">Wind speed: ${wind_speed} m/s</p>
                                </div>
                            </div>
                            <!-- max-min temp -->
                            <div class="col-md-3">
                                <div class="d-flex ps-3 p-2 rounded h-100" id="pressure" style="box-shadow: 3px 3px 10px black; background: rgba(250,250,250,.25);">
                                    <img src="./media/thermo.jpg" alt="atm.jpg" width="50px" height="50px" class = 'rounded'>
                                    <div>
                                        <p class="text-white ms-2 mb-0">Today's Min-Temp: ${min_temp}<sup>o<sub>C</sub></sup></p>
                                        <p class="text-white ms-2 mb-0">Today's Max-Temp: ${max_temp}<sup>o<sub>C</sub></sup></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
            
        })
    })
}
