import React, { useEffect, useState } from "react";
import axios from "axios";


const FlagCard = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

     const [query, setQuery] = useState("");

//   const ENDPOINT = "";

useEffect(() => {
    axios.get("https://countries-search-data-prod-812920491762.asia-south1.run.app/countries")
      .then(response => {
        console.log("API response data:", response.data);
        setCountries(response.data);
        setLoading(false);
        
      })
      .catch(err => {
        setError("Failed to fetch countries");
        setLoading(false);
      });
  }, []);

 /* ——— derived list based on search ——— */
  const filtered = countries.filter((c) =>
    c.common.toLowerCase().includes(query.toLowerCase())
  );

   if (loading) return <p>Loading countries...</p>;
  if (error) return <p>{error}</p>;
    return (
        <>

 <div class="search-container">
    <input type="text" id="search" placeholder="Search for countries..."  value={query} onChange={(e) => setQuery(e.target.value)}/>
  </div>


  <div className="grid" id="countryGrid">
        {filtered.map((country, idx) => (
          <div key={idx} className="card">
            <img src={country.png} alt={`${country.common} Flag`} />
            <p>{country.common}</p>
          </div>
        ))}
        {filtered.length === 0 && <p>No matches found.</p>}
      </div>


        </>
    )
}

export default FlagCard