'use client';

import { useEffect } from 'react';

import { Footer, Header, useInitStore } from '@/widgets/init';

export default function StoreLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { init, initialized } = useInitStore();

  useEffect(
    () => void init(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{initialized && children}</main>
      <Footer />
    </div>
  );
}
