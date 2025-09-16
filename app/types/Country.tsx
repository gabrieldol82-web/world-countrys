
export type Country = {
  cca3?: string;
  name: {
    common: string;
    official?: string;
  };
  flags: {
    svg: string;
    alt?: string;
  };
  translations?: {
    por?: {
      official?: string;
      common?: string;
    };
  };
  capital?: string[];
  population?: number;
  continents?: string[];
  languages?: { [key: string]: string };
  borders?: string[];
};