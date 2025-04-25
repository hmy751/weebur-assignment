import { Suspense } from "react";
import CardSectionWithData from "./CardSectionWithData";
import CardList from "@/components/common/CardList";

export default function CardSection() {
  return (
    <section>
      <Suspense fallback={<CardList.Skeleton type="grid" cols={4} />}>
        <CardSectionWithData />
      </Suspense>
    </section>
  );
}
