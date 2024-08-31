const fetchCountryData = async function (service, query, setState, controller, setLoading) {
  const HOST = 'https://restcountries.com/v3.1';
  try {
  setLoading(true);
    const res = await fetch(`${HOST}/${service}/${query}`, {
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Failed: ${res.statusText}:${res.status}`);

    const data = await res.json();
    setState(data);
    console.log(data);
  } catch (err) {
    if (err.name !== 'AbortError') console.error(err);
  }
  finally{
    setLoading(false)
  }
};

export { fetchCountryData };
