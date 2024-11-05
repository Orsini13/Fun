import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex w-full flex-col max-xl:max-h-screen max-xl:overflow-y-scrol py-10 px-5">
      <Navbar />

      {children}
    </main>
  );
}
