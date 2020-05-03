import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Content from './components/Content'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  const filteredCountries = countries.filter(country => country.name.match(RegExp(search, 'i')))

  const handleSearch = (event) => setSearch(event.target.value)

  return (
    <>
      find countries:
      <input value={search} onChange={handleSearch} />
      <Content content={filteredCountries} />
    </>
  )
}

export default App;
