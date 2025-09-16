import { Country } from "../types/Country";
import Image from "next/image";
import Link from "next/link";

type Props = {
  country: Country;
};

export default function CountryCard({ country }: Props) {
  const title = country.translations?.por?.common ?? country.name.common;

  return (
    <Link href={`/country/${country.name.common}`}>
      <div className="h-64 min-w-full p-2 bg-white rounded-xl hover:border-indigo-200 transition-all hover:shadow-md">
        <div className="relative w-full h-40 overflow-hidden rounded-xl">
          <Image
            src={country.flags.svg}
            alt={country.flags.alt ?? `Bandeira de ${country.name.common}`}
            fill
            className="object-contain"
          />
        </div>
        <div>
          <h1 className="text-center mt-1 font-bold">
            {title}
          </h1>
        </div>
      </div>
    </Link>
  );
}