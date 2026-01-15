'use client';

export default function StoreLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  );
}
