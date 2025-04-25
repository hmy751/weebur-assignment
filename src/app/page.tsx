import CardSection from "@/components/pages/main/CardSection/CardSection";
import SearchSection from "@/components/pages/main/SearchSection";

export default function Page() {
  return (
    <main className="flex py-md flex-col max-w-screen-lg mx-auto min-h-screen gap-md">
      <SearchSection />
      <CardSection />
    </main>
  );
}
