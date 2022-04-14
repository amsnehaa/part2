import { useState, useEffect } from 'react'
import axios from 'axios'

const WhetherData = (res) =>{  
  console.log(res.data)
  return(
    <div>
        <h4>Weather in {res.parentData.capital[0]}</h4>
        {/* <p>Temperature {res.data.main.temp} Celcius</p> */}
        {/* <p>Humidity {res.data.main.humidity}</p>
        <p>Wind {res.data.wind.speed} m/s</p> */}
    </div>
  )
}

const Whether = (prop) =>{
      fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${prop.result.latlng[0]}&lon=${prop.result.latlng[1]}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {        
        console.log(result);
        if(result === null){
          return(
            <div>    </div>
          )
        }else{
          return (
            <WhetherData data={result} parentData={prop.result}/>
          )
        }
      });
}

const Country = (prop) =>{
  console.log(prop.result)
  prop.setLat(prop.result.latlng[0])
  prop.setLong(prop.result.latlng[1])

  return(
    <div>
      <h3>{prop.result.name.common}</h3>
      <p>Capital: {prop.result.capital[0]}</p>
      <p>Area: {prop.result.area}</p>
      <h4>Languages</h4>
      <div>
        {Object.keys(prop.result.languages).map((key,i)=>(
          <li key={i}>
            {prop.result.languages[key]}
          </li>
        ))}
      </div>
      <br/>
      <img  src={prop.result.flags.png} alt=""/>
      <br/>
      <Whether result={prop.result} weatherData={prop.weatherData}/>
      <WhetherData data={prop.weatherData} parentData={prop.result}/>
    </div>
  )
}

const FilteredResult = (prop) =>{
  if(prop.numberOfResult > 10){
    return (
      <div>
          Too many matches, specify another filter
      </div>
    )
  }
  else if(prop.numberOfResult === 1 )
  {
      return (
        <div>
          <Country result = {prop.result[0]} setLat={()=>prop.setLat} setLong={()=>prop.setLong} weatherData={prop.weatherData}/>
        </div>
      )
  }else if(prop.numberOfResult < 10 && prop.numberOfResult > 0){
    return (
      <div>
        {prop.result.map((x,i)=> (
          <li key={i}> {x.name.common}
          <button onClick={prop.handleFilterChange} value={x.name.common}>show</button>
          </li>
        ))}
      </div>
    )
  }
  else{
    return (
      <div>
        No result found
      </div>
    )
  }
}

function App() {
  const [allCur, setAllCur] = useState([])
  const [filterCur, setNewFilter] = useState([])
  const [resultCur, setResultCur] = useState([])
  const [numberOfCur, setNumberOfCur] = useState([0])
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setAllCur(response.data)
        setLat(0)
        setLong(0)        
      })

      const fetchData = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setData(result)
          console.log(result);
        });
      }
      fetchData();
  }, [lat,long])

  const handleFilterChange = (event) =>{
    setNewFilter(event.target.value)
    if(event.target.value !== ""){
      let valueInLowerCase = event.target.value.toLowerCase();
      const filterResult = allCur.filter(x=>x.name.common.toLowerCase().startsWith(valueInLowerCase));
      setNumberOfCur(filterResult.length)
      if(filterResult.length < 6){
        resultCur.concat(filterResult)
        setResultCur(filterResult)
      }
    }
  }

  return (
    <div>
      <div> Find all Countires: 
      <input value={filterCur} onChange={handleFilterChange}/>
      </div>
      <br/>
      <FilteredResult result={resultCur} numberOfResult={numberOfCur} handleFilterChange={handleFilterChange} weatherData={data}/>
    </div>
  );
}

export default App;
