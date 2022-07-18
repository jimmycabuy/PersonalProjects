import React, {useEffect, useState} from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState('Brussels');
  const [citySearch, setCitySearch] = useState('');
  const [icon, setIcon] = useState('');
  const [desc, setDesc] = useState('');
  const [temp, setTemp] = useState(0);
  const [perceived, setPerceived] = useState(0);
  const [wind, setWind] = useState(0);
  // const [visibility, setVisibility] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [humidity, setHumidity] = useState(0);


  useEffect(() => {
    async function loadDataAPI() {
      var rawResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&units=metric&appid=a6e3eaa80322d67999b7ac143be3fddb`);
      var response = await rawResponse.json();
      setTemp(Math.floor(response.main.temp));
      setIcon(`http://openweathermap.org/img/wn/${response.weather[0].icon}.png`)
      setDesc(response.weather[0].description);
      setPerceived(Math.floor(response.main.feels_like));
      setWind(response.wind.speed);
      // setVisibility(response.visibility / 1000);
      setPressure(response.main.pressure);
      setHumidity(response.main.humidity);

      if(response.weather[0].main === "Clear"){
        setIcon('../assets/sun.png')
      } else if(response.weather[0].main === "Thunderstorm"){
        setIcon('../assets/thunderstorm.png')
      } else if(response.weather[0].main === "Drizzle"){
        setIcon('../assets/rain.png')
      } else if(response.weather[0].main === "Clouds"){
        setIcon('../assets/cloud.png')
      } else if(response.weather[0].main === "Snow"){
        setIcon('../assets/snowflake.png')
      } else if(response.weather[0].main === "Rain"){
        setIcon('../assets/rain.png')
      } else if(response.weather[0].main === "Mist"){
        setIcon('../assets/mist.png')
      }
    }
    loadDataAPI();
  }, [city]);

  var onSubmitClick =  () => {
      setCity(citySearch);
      setCitySearch('');
  }

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth();
  if(mm === 0){
    mm = 'Janvier'
  }
  if(mm === 1){
    mm = 'Février'
  }
  if(mm === 2){
    mm = 'Mars'
  }
  if(mm === 3){
    mm = 'Avril'
  }
  if(mm === 4){
    mm = 'Mai'
  }
  if(mm === 5){
    mm = 'Juin'
  }
  if(mm === 6){
    mm = 'Juillet'
  }
  if(mm === 7){
    mm = 'Aout'
  }
  if(mm === 8){
    mm = 'Septembre'
  }
  if(mm === 9){
    mm = 'Octobre'
  }
  if(mm === 10){
    mm = 'Novembre'
  }
  if(mm === 11){
    mm = 'Décembre'
  }
  var yyyy = today.getFullYear();

  today = dd + ' ' + mm + ' ' + yyyy;

  return (
    <div className="box_weather_now">
      <div className="input_and_button">
        <input type="text" className="input_text" value={citySearch} onChange={e => setCitySearch(e.target.value)}/>
        <input type="submit" value='Go' className="input_submit" onClick={() => onSubmitClick()}/>
      </div>
      <div className="city_and_time">
        <h3 className="city">{city}</h3>
        <h5>{today}</h5>
      </div>
      <div className="desc_icon_and_temp">
        <img src={icon} alt="icon" style={{height:'130px'}} />
        <div className="desc_and_temp">
          <p className="description_weather">{desc}</p>
          <p className="temp_weather">{temp}°</p>
        </div>
      </div>
      <div className="container_div">
        <div className="bloc">
          <img src="../assets/temperature.png" alt="temp" style={{height:'20px'}} />
          <p>{perceived}°</p>
          <p className="gray_text">Perceived</p>
        </div>
        <div className="bloc">
          <img src="../assets/wind.png" alt="wind" style={{height:'20px'}} />
          <p>{wind} km/h</p>
          <p className="gray_text">Wind</p>
        </div>
        <div className="bloc">
          <img src="../assets/drop.png" alt="drop" style={{height:'20px'}} />
          <p>{humidity}%</p>
          <p className="gray_text">Humidity</p>
        </div>
        {/* <div className="bloc">
          <img src="../assets/visibility.png" alt="drop" style={{height:'20px'}} />
          <p>{visibility} km</p>
          <p className="gray_text">Visibility</p>
        </div> */}
        <div className="bloc">
          <img src="../assets/pressure.png" alt="drop" style={{height:'20px'}} />
          <p>{pressure} hPa</p>
          <p className="gray_text">Pressure</p>
        </div>
      </div>
    </div>
  );
}

export default App;
