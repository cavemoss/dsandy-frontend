'use client';

import { Footer, Header, useInitStore } from '@/widgets/init';

export default function StoreLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const isInitialized = useInitStore((state) => state.initialized);

  if (!isInitialized) return <></>;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
