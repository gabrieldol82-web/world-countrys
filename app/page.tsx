import Image from "next/image";
import Link from "next/link";

type Country = {
  name: {
    common: string;
  };
  flags: {
    svg: string;
    alt: string;
  };
  translations: {
    por: {
      official: string;
      common: string;
    }
  };
}

async function fetchCountrys(): Promise<Country[]> {
  const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,translations").then((res) =>
    res.json()
  );
  return response;
}

export default async function Home() {

  const countrys = await fetchCountrys();

  console.log(countrys)

  return (
    <section className="container flex w-full justify-center">
      <div className="grid grid-cols-5 gap-4 p-4 mt-16">
        {countrys.map((country: Country) => (
          <Link href={`/country/${country.name.common}`} key={country.name.common}>
            <div key={country.name.common} className="h-64 min-w-full p-2 bg-white rounded-xl hover:border-indigo-200 transition-all hover:shadow-md">
              <div className="relative w-full h-40 overflow-hidden rounded-xl">
                <Image src={country.flags.svg} alt={country.flags.alt} fill className="object-contain" />
              </div>
              <div>
                <h1 className="text-center mt-1 font-bold">{country.translations.por.common}</h1>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
