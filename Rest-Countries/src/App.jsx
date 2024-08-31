import { useState } from "react";
import { Header, SearchBar } from "./Header";
import "./style.css";
import Select from "./Select";
import Main from "./Main";
function App() {
  const [countryData, setCountryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);


function  handleOnCountrySelect(id)
{
    const countryObj = countryData.find(movie => movie.name.official === id);

setSelectedCountry(countryObj);
  }

  return selectedCountry ? (
    <CountryDetails countryDetails={selectedCountry} />
  ) : (
    <>
      <Header>
        <SearchBar setCountryData={setCountryData} setLoading={setIsLoading} />
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

function CountryDetails({countryDetails, setCountryDetails}) {
  console.log(countryDetails);

  const {
    name:{common},
    population, region, capital ,  subRegion, languages, flags, currencies, tld: domain 
  } = countryDetails;
  return <section className="country-details-section">
  </section>;
}

export default App;
