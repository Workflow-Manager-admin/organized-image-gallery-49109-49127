'use client';

import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import UploadForm from "../../components/UploadForm";

export default function UploadPage() {
  const router = useRouter();
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-6 flex items-start justify-center">
        <UploadForm onSuccess={() => router.push('/')} />
      </main>
    </div>
  );
}
