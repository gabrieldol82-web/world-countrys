// app/pais/[name]/page.tsx
import CountryCard from "../../_components/CountryCard";
import { Country } from "../../types/Country";
import Image from "next/image";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BackButton from "@/app/_components/BackButton";

type Props = {
  params: Promise<{ name: string }>;
};

async function getCountryByName(name: string): Promise<Country | null> {
  const res = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
  if (!res.ok) return null;
  const arr = await res.json();
  return arr[0] ?? null;
}

async function getCountryBorders(borders: string[] | undefined): Promise<Country[]> {
  if (!borders || borders.length === 0) return [];

  const res = await fetch(
    `https://restcountries.com/v3.1/all?fields=cca3,name,flags,translations,capital,population,continents,languages,borders`
  );
  if (!res.ok) return [];
  const countries = await res.json() as any[];
  return countries.filter((c) => borders.includes(c.cca3));
}

export default async function CountryPage({ params }: Props) {
  const { name } = await params;
  const data = await getCountryByName(name);

  if (!data) {
    return <div>País não encontrado</div>;
  }

  const borderCountries = await getCountryBorders(data.borders);

  const formattedPopulation = (population?: number) => {
    if (!population) return "—";
    if (population >= 1000000) return `${(population / 1000000).toFixed(1)}M`;
    if (population >= 1000) return `${(population / 1000).toFixed(1)}K`;
    return `${population}`;
  };

  return (
    <section className="flex flex-col container mt-16">
      <h1 className="text-center text-3xl font-semibold">{data.translations?.por?.official ?? data.name.common}</h1>
      <BackButton />

      <article className="flex flex-col-reverse items-center bg-white p-4 rounded-lg shadow-md mt-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-2 w-full lg:w-1/2">
          {Array.isArray(data.capital) && data.capital.length > 0 ? (
            <h2 className="text-xl text-gray-800">
              🏙️ <b>Capital:</b> {data.capital.join(", ")}
            </h2>
          ) : (
            <h2 className="text-xl text-gray-800">
              🏙️ <b>Capital:</b> Não possui capital
            </h2>
          )}

          <h2 className="text-xl text-gray-800">
            👨‍👩‍👧‍👦 <b>População:</b> {formattedPopulation(data.population)}
          </h2>

          {data.continents && (
            <h2 className="text-xl text-gray-800">
              🗺️ <b>Continente:</b> {data.continents.join(", ")}
            </h2>
          )}

          {data.languages && (
            <h2 className="text-xl text-gray-800">
              🗣️ <b>Línguas faladas:</b> <br />
              {Object.values(data.languages).map((language, index) => (
                <span
                  key={index}
                  className="bg-indigo-600 text-white font-normal px-2 mr-1 inline-block rounded-2xl mt-2"
                >
                  {language}
                </span>
              ))}
            </h2>
          )}
        </div>

        <div className="flex justify-center w-full my-4 lg:w-1/3 lg:my-0 lg:justify-end">
          <div className="relative h-48 w-72 shadow-md">
            <Image
              src={data.flags.svg}
              alt={data.flags.alt ?? `Bandeira de ${data.name.common}`}
              fill
              className="object-cover rounded-xl"
            />
          </div>
        </div>
      </article>

      <h1 className="text-center text-3xl font-semibold mt-12">Países que fazem fronteira</h1>
      <article>
        <div className="grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {borderCountries.length > 0 ? (
            borderCountries.map((border) => (
              <CountryCard key={border.name.common} country={border} />
            ))
          ) : (
            <span>Não possui países vizinhos</span>
          )}
        </div>
      </article>
    </section>
  );
}
