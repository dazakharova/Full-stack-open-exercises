import { useState, useEffect } from 'react';
import axios from 'axios'
import FoundCountries from "./components/FoundCountries.jsx";
import Notification from "./components/Notification.jsx";


function App() {
    const [country, setCountry] = useState('');
    const [countries, setCountries] = useState(null);
    const [specifyFilterMessage, setSpecifyFilterMessage] = useState(null);

    function selectCountries(pattern, countriesArray) {
        console.log(countriesArray)
        let selectedCountries = countriesArray.filter(country => country.name.common.toLowerCase().includes(pattern.toLowerCase()))
        if (selectedCountries.length > 10) {
            return null;
        }
        return selectedCountries;
    }

    useEffect(() => {
        if (country !== '') {
        axios
            .get(`https://studies.cs.helsinki.fi/restcountries//api/all`)
            .then(response => {
                let result = selectCountries(country, response.data);
                if (result) {
                    setCountries(result);
                    setSpecifyFilterMessage(null);
                } else {
                    setCountries(null);
                    setSpecifyFilterMessage('Too many matches');
                }
            })
        }
    }, [country])

    const handleSearchChange =(event) => {
        setCountry(event.target.value);
    }

  return (
      <>
          <div>
              find countries <input value={country} onChange={handleSearchChange} />
          </div>

          <Notification message={specifyFilterMessage} />
          <FoundCountries countriesArray={countries} />
      </>
  )
}

export default App
