import { useEffect } from "react";
import { useState } from "react";
import { fetchCountryData } from "./assets/Util";

export default function Select({setCountryData, setLoading}) {
  const [region, setRegion] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    if(!region) return;
    fetchCountryData('region', region, setCountryData, controller, setLoading );
  }, [region, setCountryData, setLoading])


  return (
    <select  name="filter-region" id="filter-country"  value={region} onChange={e => setRegion(e.target.value)}>

      <option selected value="">Filter by Region</option>
      <option value="Asia">Asia</option>
      <option value="Americas">Americas</option>
      <option value="Europe">Europe</option>
      <option value="Africa">Africa</option>
      <option value="Oceania">Oceania</option>
    </select>
  );
}
