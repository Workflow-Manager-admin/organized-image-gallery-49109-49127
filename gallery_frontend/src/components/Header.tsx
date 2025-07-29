'use client';

import Link from "next/link";

export default function Header() {
  return (
    // PUBLIC_INTERFACE
    <header className="w-full flex items-center justify-between py-4 px-6 bg-primary text-white shadow mb-1">
      <Link href="/" className="text-2xl font-bold tracking-tight">
        Image Gallery
      </Link>
      <nav className="flex gap-6">
        <Link href="/" className="hover:underline underline-offset-4">Home</Link>
        <Link href="/upload" className="hover:underline underline-offset-4">Upload</Link>
      </nav>
    </header>
  );
}
