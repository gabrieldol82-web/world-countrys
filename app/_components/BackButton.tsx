'use client';

import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function BackButton() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <ArrowBackIcon />
      Voltar
    </Link>
  );
}