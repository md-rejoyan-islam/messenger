import AutheticatedHeader from "@/components/shared/authenticated-header";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">
      <AutheticatedHeader />

      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
