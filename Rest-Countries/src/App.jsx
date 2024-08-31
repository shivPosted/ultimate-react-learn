import { useState } from "react";
import { Header, SearchBar } from "./Header";
import "./style.css";
import Select from "./Select";
import Main from "./Main";
function App() {
  const [countryData, setCountryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [query, setQuery] = useState('');

  function handleOnCountrySelect(id) {
    const countryObj = countryData.find((movie) => movie.name.official === id);

    setSelectedCountry(countryObj);
  }

  return selectedCountry ? (
    <CountryDetails
      countryDetails={selectedCountry}
      setSelectedCountry={setSelectedCountry}
    />
  ) : (
    <>
      <Header>
        <SearchBar setCountryData={setCountryData} setLoading={setIsLoading} query={query} setQuery={setQuery}/>
      </Header>

      <Select setCountryData={setCountryData} setLoading={setIsLoading} />
      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        <Main
          countryData={countryData}
          setLoading={setIsLoading}
          setCountryData={setCountryData}
          setSelectedCountry={handleOnCountrySelect}
        />
      )}
    </>
  );
}

function CountryDetails({ countryDetails, setSelectedCountry }) {
  const {
    name: { common },
    population,
    region,
    capital,
    subRegion,
    flags,
    tld: domain,
  } = countryDetails;

  const languages = Object.values(countryDetails.languages).join(", ");
  const currencies = Object.values(countryDetails.currencies)?.at(0);
  const currenciesString = `${currencies.name} (${currencies.symbol})`;

  function handleBackClick() {
    setSelectedCountry(null);
  }

  return (
    <section className="country-details-section">
      <img src={flags.png} alt={flags.alt} />
      <div className="country-details">
        <h2>{countryDetails.name.official}</h2>
        <p>
          <strong>Native Name:</strong> {common}
        </p>
        <p>
          <strong>Population:</strong> {population}
        </p>
        <p>
          <strong>Region:</strong> {region}
        </p>
        <p>
          <strong>Sub Region:</strong> {subRegion}
        </p>
        <p>
          <strong>Captial: </strong>
          {capital[0]}
        </p>
        <p>
          <strong>Top Level Domain: </strong>
          {domain}
        </p>
        <p>
          <strong>Currencies: </strong>
          {currenciesString}
        </p>
        <p>
          <strong>Languages: </strong>
          {languages}
        </p>
      </div>
      <button className="back-btn" onClick={handleBackClick}>
        &larr;
      </button>
    </section>
  );
}

export default App;
