import { useEffect, useState } from 'react';
import { fetchCountryData } from './assets/Util';
import { Logo } from './Logo';
import { ThemeSwitch } from './ThemeSwitch';

export function Header({ children }) {
  return (
    <header className="header">
      <Logo size="4.8rem" />
      {children}
      <ThemeSwitch />
    </header>
  );
}
export function SearchBar({ setCountryData, setLoading }) {
  const [query, setQuery] = useState('');
  // console.log(countryData);
  useEffect(() => {
    const controller = new AbortController();

    if (query) fetchCountryData('name', query, setCountryData, controller, setLoading);
    if(!query) setCountryData([]);
    return () => {
      controller.abort();
    };
  }, [query, setCountryData, setLoading]);
  return (
    <input
      type="text"
      placeholder="Search Country..."
      className="search-bar"
      value={query}
      onChange={e => setQuery(e.target.value)}
    />
  );
}
