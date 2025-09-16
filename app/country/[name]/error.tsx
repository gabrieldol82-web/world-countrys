"use client";
import Link from "next/link";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Error() {
  return (
    <div>
      <h1 className="text-3xl mt-10">Ocorreu um erro ao carregar os dados do país. Por favor, tente novamente mais tarde.</h1>
      <Link href="/"><ArrowBackIcon />Voltar</Link>
    </div>
  );
}