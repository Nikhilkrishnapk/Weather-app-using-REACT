import { useState } from 'react'
import './App.css'
import Header from './Header'
import homeimg from './assets/homeimg.png'
import clear from './assets/clear.png'
import mist from './assets/mist.png'
import rain from './assets/rain.png'
import snow from './assets/snow.png'
import thunderStorm from './assets/thunderstorm.png'


import Wind from './assets/wind.png'
import Humidity from './assets/humidity.png'



function App() {

const [text,setText] = useState() // used to store the value that entered by user.

const [temp,setTemp] = useState(0);
const [description,setDescription] = useState();
const [location,setLocation] = useState("Location");
const [country,setCountry] = useState();
const [humidity,setHumidity] = useState(0);
const [wind,setWind] = useState(0);
const [icon,setIcon] = useState(homeimg)

const [cityNotFound,setCityNotFound] = useState(false);
const [loading,setLoading] = useState(false);

const weatherIconMap1={
  "01d":clear,
  "02d":clear,
  "03d":clear,
  "04d":clear,
  "09d":rain,
  "10d":rain,
  "11d":thunderStorm,
  "13d":snow,
  "50d":mist,

}
const weatherIconMap2={
  "01n":clear,
  "02n":clear,
  "03n":clear,
  "04n":clear,
  "09n":rain,
  "10n":rain,
  "11n":thunderStorm,
  "13n":snow,
  "50n":mist,

}


const search=async()=>{
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`;

  try {
    let res= await fetch(url);
    let data= await res.json();
    if (data.cod==="404") {
      setCityNotFound("Please Enter A Valid Location !!!")
    }
    else{
      setCityNotFound("")
    }
    
    const weatherIconCode=data.weather[0].icon
    console.log(weatherIconCode);
    
    setIcon(weatherIconMap1[weatherIconCode] || weatherIconMap2[weatherIconCode] || homeimg)
    
    
    setTemp(data.main.temp)
    setDescription(data.weather[0].description)
    setLocation(data.name)
    setCountry(data.sys.country)
    setHumidity(data.main.humidity)
    setWind(data.wind.speed)
    
    

  } catch (error) {
    console.log("An error occured",error.message);
  } finally {
    setLoading(false);
  }
}

// function for fetching the location from user and store it in location state.
function handleLocation(tag){
  setText(tag.value);
}

// funcion is used for searching the location while pressing the enter button form keyboard
const handleKeyDown=(e)=>{
  if(e.key==="Enter"){
    search()
  }
}



  return (
    <>
     <div className='landing-page'>
      <Header/>
      <div className='display-content'>
        <div className='inputdiv'>
         <input className='searchinput' type="text" placeholder='Find weather' onChange={(e)=>handleLocation(e.target)} value={text} onKeyDown={handleKeyDown}/>
         <button onClick={()=>search()}><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>
        
         <p className='notfound'>{cityNotFound}</p>
        
        <div className='main d-flex justify-content-center align-items-center mt-5'>
          <div className='main-one'><img className='homeimg' src={icon} alt="Weather logo" /></div>
          <div className='main-two d-flex flex-column justify-content-center align-items-center'>
            <h1 className='temp'>{temp}<sup>o</sup><span style={{fontSize:'70px',fontWeight:'bolder'}}>C</span></h1>
            <p>{description}</p>
            <h3 className='location '>{location}</h3>
            <h4 className='location'>{country}</h4>
            <div className='d-flex gap-5 mt-3 ms-5'>
              <div>
                <div className='windhumidity'>
                  <img src={Humidity} alt="" />
                </div>
                <p className='mt-2'>{humidity} % <span>Humidity</span></p>
              </div>
              <div>
              <div className='windhumidity'>
                  <img src={Wind} alt="" />
                </div>
                <p className='mt-2'>{wind} Km/h <span>Wind</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
     </div>
    </>
  )
}

export default App
