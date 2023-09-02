
import { useState } from 'react'
import './css/index.css'

function App() {
  const ejemplo={
    "coord": {
        "lon": -1.9023,
        "lat": 43.312
    },
    "weather": [
        {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 21,
        "feels_like": 20.96,
        "temp_min": 20.32,
        "temp_max": 21.72,
        "pressure": 1018,
        "humidity": 69
    },
    "visibility": 10000,
    "wind": {
        "speed": 7.2,
        "deg": 300,
        "gust": 13.89
    },
    "clouds": {
        "all": 75
    },
    "dt": 1693401437,
    "sys": {
        "type": 2,
        "id": 2010406,
        "country": "ES",
        "sunrise": 1693373348,
        "sunset": 1693421284
    },
    "timezone": 7200,
    "id": 3112011,
    "name": "Errenteria",
    "cod": 200
}
  const urlBase="https://api.openweathermap.org/data/2.5/weather?q="
  const urlBaseIconos="https://openweathermap.org/img/wn/"
  const API_KEY="f9964e15e133c48856f04426a4de4ba4"
  let viento=""

  const [ciudad, setCiudad] = useState('')
  const [dataClima, setDataClima] = useState(null)
  
  const handleCambioCiudad=(e)=>{
    console.log(e.target.value)
    setCiudad(e.target.value)
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(ciudad.length>0) fetchClima()

  }

  const fetchClima = async()=>{
    const url=urlBase+ciudad+"&units=metric&lang=es&appid="+API_KEY
    console.log(url)
    try {      
      const response = await fetch(url)
      const data= await response.json()
      setDataClima(data)
    } catch (error) {
      console.log("Petó fuerte: "+error);
    }
  }

  return (
    <>
      <div className="main">
        <h1>App del tiempo tope de gama</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="ciudad"
            value={ciudad}
            placeholder='Ciudad'
            onChange={handleCambioCiudad}

          />
          <button type='submit'>Buscar</button>
        </form>
        {
          dataClima &&(
            <div className='climaContent'>
              <img src={urlBaseIconos+dataClima.weather[0].icon+"@2x.png"}></img><h2>{dataClima.name}, {dataClima.main.temp}ºC</h2>
              <p>Condición metereológica: {dataClima.weather[0].description} </p>
              
              <p>Presión: {dataClima.main.pressure}</p>
              <p>Viento: <span style={{rotate:ejemplo.wind.deg+"deg"}}  className="viento"></span> {ejemplo.wind.speed} km/h, dirección {dataClima.wind.deg}º</p>

            </div>
            
            
          )
        }
      </div>
      
    </>
  )
}

export default App
