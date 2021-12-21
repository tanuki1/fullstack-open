import React, { useState, useEffect } from 'react'
import axios from 'axios'


const CountryInfo = ({ country }) => {
  const countryLanguages = Object.values(country.languages).map(value => <li> {value} </li>)
  const [weather, setWeather] = useState(undefined)
  const countryCapital = country.capital
  const getWeather = () => {
    if (!weather) {
        return null
    } 
    return (
      <>
        <h2>
          Weather in {countryCapital}
        </h2>
        <div>
          temperature: {weather.main.temp} F
        </div>
      </>
    )
  }
  
  useEffect(() => {
    const params = {
      appid: process.env.REACT_APP_API_KEY,
      q: `${countryCapital}`,
      units: "imperial"
    }
    axios
      .get('https://api.openweathermap.org/data/2.5/weather', {params})
      .then(response => {
        setWeather(response.data)
      })
  }, [])
  console.log(weather)
  return (
    <div>
      <h1>
        {country.name.common}
      </h1>
      <div>
        <div>
          capital: {country.capital}
        </div>
        <div>
          population: {country.population}
        </div>
      </div>
      <h2>
        languages
      </h2>
      <div>
        {countryLanguages}
      </div>
      <div>
        <img
          style={{marginTop:"20px"}}
          border= "1px"
          width= "200"
          src={country.flags.svg} />
      </div>
      <div>
        {getWeather()}
      </div>
    </div>
  )
}

const App = ()  => {
  const [countries, setCountries] = useState([]) 
  const [newSearch, setNewSearch] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  const handleEvent = (country) => {
    setFilteredCountries([country])
  }

  useEffect(() => {
    const filtered = countries.filter(p => p.name.common.toLowerCase().includes(newSearch.toLowerCase()))
    setFilteredCountries(filtered)
  }, [newSearch])

  const showFiltered = () => {
    if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
      return (
      filteredCountries.map(value => 
      <div> 
        {value.name.common} 
        <button onClick={() => handleEvent(value)}>
          show
        </button>
      </div>)
      )
    } if (filteredCountries.length === countries.length) {
      return (
        <div> Type something to search countries </div>
      )
    } if (filteredCountries.length >= 10) {
      return(
      <div> Too matches, specify another filter </div>
      )
    } if (filteredCountries.length === 1) {
      return (
      <CountryInfo country={filteredCountries[0]}/>
      )
    } else {
      return (
        <div> no matches </div>
      )
    }
  }

  return (
    <div>
      <div>
        find countries
        <input
          value={newSearch}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        {showFiltered()}
      </div>
    </div>
  )
}
export default App
