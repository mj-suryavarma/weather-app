import React,{useState,useEffect} from 'react';
import {Helmet} from 'react-helmet'
import axios from 'axios';
import './weatherApi.css'
import GeoCoding from './geocodingapi';


const CurrentWeather = ()=> {
     const [report, setReport] = useState('');
    const [search, setSearch] = useState('');
     const [latitude, setLatitude] = useState('41');
     const [longitude, setLongitude] = useState('-74');
     const [displayName, setDisplayName] = useState('')

     const [nowWeather , setNowWeather] = useState('');
     //  initial geocode url 
     const [geoCodeUrl, setGeoCodeUrl] = useState({         
  method: 'GET',
  url: 'https://forward-reverse-geocoding.p.rapidapi.com/v1/search',
  params: {
    q: 'New York City NY USA',
    'accept-language': 'en',
    polygon_threshold: '0.0'
  },
  headers: {
    'x-rapidapi-host': 'forward-reverse-geocoding.p.rapidapi.com',
    'x-rapidapi-key': '7aacdf0638msha58f0af4a1e8709p1f7b23jsnc981274d462d'
  }
}

     );
   // initialize weather api url
     const [weatherApiUrl , setWeatherApiUrl] = useState({
      method: 'GET',
      url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
      params: {lon: '38.5', lat: '-78.5'},
      headers: {
        'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com',
        'x-rapidapi-key': '7aacdf0638msha58f0af4a1e8709p1f7b23jsnc981274d462d'
      }
     })
     console.log("latitude is "+latitude+ "  longitude is  "+longitude)
       
 /// weather api

    const fetchWeatherApi = () =>{

      
      axios.request(weatherApiUrl).then(function (response) {
        setReport(response.data.data[0])
        setNowWeather(response.data.data[0].weather.description)
      }).catch(function (error) {
       
        console.error(error);
        var checkError = String(error);
        console.log(checkError.includes("429"))
        if(checkError.includes("code 429")){
               setWeatherApiUrl({
                method: 'GET',
  url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
  params: {lon: longitude, lat: latitude},
  headers: {
    'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com',
    'x-rapidapi-key': 'e497470d92msh184116dd7f558c4p19f4a6jsn1d39b63a73c0'
  }
               })
        }
         
            
      });
         }
   
    useEffect(()=>{
        fetchWeatherApi();
    },[weatherApiUrl]);
  
     
    // geo coding api

const fetchGeoCode = () => {
 
axios.request(geoCodeUrl).then(function (response) {
	setLatitude(Math.round(response.data[0].lat))
	setLongitude(Math.round(response.data[0].lon))
  setDisplayName(response.data[0].display_name)
   
}).catch(function (error) {
	console.error(error);


});

}


useEffect( () => {
  fetchGeoCode();
},[geoCodeUrl])

    const SubmitHandler = (e) => {
      e.preventDefault();

      // set geo code url 
  
     
        setGeoCodeUrl({

  method: 'GET',
  url: 'https://forward-reverse-geocoding.p.rapidapi.com/v1/search',
  params: {q: `${search}`, 'accept-language': 'en', polygon_threshold: '0.0'},
  headers: {
    'x-rapidapi-host': 'forward-reverse-geocoding.p.rapidapi.com',
    'x-rapidapi-key': '7aacdf0638msha58f0af4a1e8709p1f7b23jsnc981274d462d'
  }
} )  
      setWeatherApiUrl({
          
      method: 'GET',
      url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
      params: {lon: longitude, lat:latitude},
    
      headers: {
        'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com',
        'x-rapidapi-key': 'e497470d92msh184116dd7f558c4p19f4a6jsn1d39b63a73c0'
     }
     })
      

         
    }
    const ChangeHandler = (event) => {
          setSearch(event.target.value);
           
    }
     
      
    return(

         <div className="container" >

           <h2 className="heading">Weather Now</h2>
           
    <form  className="form-search"  >
    <input  type="text" className="search-bar"  onChange={ChangeHandler}/>
    <button type="submit" className="search-btn" onClick={SubmitHandler}>search</button>
  </form>
 
  <div>{displayName}</div>

  <div className="weather-report">
  <div className="weather-now"> {nowWeather} </div>
  </div>

  <div className="weather-condition">
    <div className="temperature">
     {report.temp}{report.temp < 0 ? ' \u00B0F'
      : ' \u00B0C'}</div>  

    <div  className="current-state">
    <div>wind speed : {report.wind_spd} km/h </div>
    <div> humidity : {report.rh}% </div>
    <div> pressure : {report.pres}mm </div>
    </div>

    <div className="location-details">
    <div>Latitude is : {latitude}</div>
    <div>Longitude is : {longitude}</div>
    </div>

  </div>

  </div>
    )
}

export default CurrentWeather;