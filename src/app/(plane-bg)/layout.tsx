'use client';

import { useInitStore } from '@/widgets/init';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const isInitialized = useInitStore((state) => state.initialized);

  if (!isInitialized) return <></>;

  return <div className="h-screen bg-muted flex justify-around">{children}</div>;
}
