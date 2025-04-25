"use client";

import { Suspense } from "react";
import CardSectionWithData from "./CardSectionWithData";
import CardList from "@/components/common/CardList";
import { useViewTypeStore } from "@/store/useViewTypeStore";

const Fallback = ({ type }: { type: "grid" | "list" }) => {
  return <CardList.Skeleton type={type} cols={4} />;
};

export default function CardSection() {
  const { viewType } = useViewTypeStore();

  return (
    <section>
      <Suspense fallback={viewType !== null && <Fallback type={viewType} />}>
        <CardSectionWithData />
      </Suspense>
    </section>
  );
}
