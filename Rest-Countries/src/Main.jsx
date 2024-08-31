import Select from "./Select";

export default function Main({ countryData, setSelectedCountry }) {
  return (
    <main className="main-container">
      <CountryList countryArr={countryData} setSelectedCountry={setSelectedCountry}/>
    </main>
  );
}

function CountryList({ countryArr, setSelectedCountry }) {
  return (
    <ul className="country-list">
      {countryArr.map((country) => (
        <CountryCard key={country.area} country={country} setSelectedCountry={setSelectedCountry}/>
      ))}
    </ul>
  );
}

function CountryCard({ country, setSelectedCountry }) {
  const population =
    country.population > 1000000
      ? (country.population / 1000000).toFixed(2) + "M"
      : country.population;

  return (
    <li className="country-card" onClick={() => setSelectedCountry(country.name.official)}>
      <img src={country.flags.png} alt={`${country.name.common}-flag`} />
      <div className="country-leaf-details">
        <div className="name">{country.name.common}</div>
        <div className="population">
          <strong>Population: </strong> {population}
        </div>
        <div className="region">
          <strong>Region: </strong> Americas
        </div>
        <div className="capital">
          <strong>Capital: </strong>Washington DC{" "}
        </div>
      </div>
    </li>
  );
}
