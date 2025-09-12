"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, use, useState } from "react";

type Country = {
  name: {
    official: string;
    common: string;
  };
  translations: {
    por: {
      official: string;
      common: string;
    }
  }
  capital: string[];
  population: number;
  continents: string[];
  languages: { [key: string]: string };
  flags: {
    svg: string;
    alt: string;
  }
};

const formattedPopulation = (population: number) => {
  if (population >= 1000000) {
    return `${(population / 1000000).toFixed(1)}M`;
  } else if (population >= 1000) {
    return `${(population / 1000).toFixed(1)}K`;
  }
  return population.toString();
};

export default function Country({ params }: { params: Promise<{ name: string }> }) {
  const { name } = use(params);
  const [data, setData] = useState<Country | null>(null);

  const fetchCountry = async () => {
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
    const countryData = await res.json();
    setData(countryData[0]);
    console.log(countryData[0]);
  };

  useEffect(() => {
    fetchCountry();
  }, [name]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex flex-col container mt-16">
      <h1 className="text-center text-3xl font-semibold">{data.translations.por.official}</h1>
      <Link href="/">Voltar</Link>
      <article className="flex flex-row justify-between bg-white p-4 rounded-lg shadow-md mt-4 ">
        <div className="flex flex-col gap-2">
          {Array.isArray(data.capital) && data.capital.length > 0 ? (
            <h2 className="text-xl text-gray-800">🏙️ <b>Capital:</b> {data.capital.join(', ')}</h2>
          ) : (
            <h2 className="text-xl text-gray-800">🏙️ <b>Capital:</b> Não possui capital</h2>
          )}

          {data.population && (
            <h2 className="text-xl text-gray-800">👨‍👩‍👧‍👦 <b>População:</b> {formattedPopulation(data.population)}</h2>
          )}

          {data.continents && (
            <h2 className="text-xl text-gray-800">🗺️ <b>Continente:</b> {data.continents?.join(", ")}</h2>
          )}

          {data.languages && (
            <h2 className="text-xl text-gray-800">🗣️ <b>Línguas faladas:</b> <br /> {Object.values(data.languages).map((language, index)=> {
              return <span key={index} className="bg-indigo-600 text-white font-normal px-2 mr-1 inline-block rounded-2xl">{language}</span>
            })}</h2>
          )}

        </div>
        <div className="flex justify-end">
          <div className="relative h-auto w-72 shadow-md">
            <Image src={data.flags.svg} alt={data.flags.alt ? data.flags.alt : 'Este país não possui texto alternativo para a bandeira'} fill className="object-cover rounded-xl" />
          </div>
        </div>
      </article>
      
      <h1 className="text-center text-3xl font-semibold mt-12">Países que fazem fronteira</h1>
      <article>

      </article>
      
    </section>
  );
}
