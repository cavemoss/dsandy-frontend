'use client';

import { Spinner } from '@shadcd/spinner';
import { useEffect } from 'react';

import { Footer, Header, useInitStore } from '@/widgets/init';

export default function StoreLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const isInitialized = useInitStore((state) => state.initialized);
  const storeName = useInitStore((state) => state.subdomain.config.storeName);

  useEffect(() => {
    document.title = storeName;
  }, []);

  if (!isInitialized)
    return (
      <div className="min-h-screen flex">
        <Spinner className="m-auto" />
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
