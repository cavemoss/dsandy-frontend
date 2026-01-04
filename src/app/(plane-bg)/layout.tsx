'use client';

import { useInitStore } from '@/widgets/init';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const isInitialized = useInitStore((state) => state.initialized);

  if (!isInitialized) return <></>;

  return <div className="h-screen bg-muted p-12 flex gap-10 overflow-scroll">{children}</div>;
}
