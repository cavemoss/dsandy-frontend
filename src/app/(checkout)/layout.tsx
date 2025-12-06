export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="h-screen bg-muted p-12 flex gap-10 overflow-scroll">{children}</div>;
}
