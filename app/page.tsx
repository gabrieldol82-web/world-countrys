"use client";

import CountryCard from "./_components/CountryCard";
import { Country } from "./types/Country";
import { useState, useEffect } from "react";

export default function Home() {

  const [countrys, setCountrys] = useState<Country[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    async function fetchCountrys() {
      const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,translations");
      const data = await response.json();
      setCountrys(data);
    }
    fetchCountrys();
  }, []);

  return (
    <section className="container flex flex-col w-full justify-center">
      <div className="text-right p-4 mt-4">
        <input
          type="text"
          placeholder="Filtrar por nome..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mb-6 p-2 border rounded w-80"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4 mt-4">
        {countrys
        .filter((country: Country) => {
          const title = country.translations?.por?.common ?? country.name.common;
          return title.toLowerCase().includes(filter.toLowerCase());
        })
        .map((country: Country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </div>
    </section>
  );
}
