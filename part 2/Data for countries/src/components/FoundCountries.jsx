import {useState} from "react";
import Country from "./Country.jsx";

function FoundCountries({countriesArray}) {
    const [selectedCountries, setSelectedCountries] = useState([]);

    if (!countriesArray) {
        return <div></div>
    }

    if (countriesArray.length === 1) {
        return <Country country={countriesArray[0]} />
    }

    const handleShowCountry = (country) => {
        const isAlreadySelected = selectedCountries.find(c => c.name.common === country.name.common);
        if (isAlreadySelected) {
            setSelectedCountries(selectedCountries.filter(c => c.name.common !== country.name.common));
        } else {
            setSelectedCountries([...selectedCountries, country]);
        }
    }

    return (
        <div>
            {countriesArray.map((country, i) => <p id={i} key={i}>{country.name.common} <button onClick={() => handleShowCountry(country)}>show</button></p>)}
            {selectedCountries.map((country, index) => (
                <Country key={index} country={country} />
            ))}
        </div>
    )
}

export default FoundCountries;