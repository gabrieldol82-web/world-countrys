import CountryCard from "./_components/CountryCard";
import { Country } from "./types/Country";

async function fetchCountrys(): Promise<Country[]> {
  const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,translations").then((res) =>
    res.json()
  );
  return response;
}

export default async function Home() {

  const countrys = await fetchCountrys();

  return (
    <section className="container flex w-full justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4 mt-16">
        {countrys.map((country: Country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </div>
    </section>
  );
}
