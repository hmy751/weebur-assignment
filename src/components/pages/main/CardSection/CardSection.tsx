"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import CardSectionWithData from "./CardSectionWithData";
import CardList from "@/components/common/CardList";
import { useViewTypeStore } from "@/store/useViewTypeStore";

const ErrorFallback = () => {
  return (
    <div className="flex justify-center items-center w-full h-200">
      데이터를 불러오는데 문제가 생겼습니다. 다시 시도해주세요.
    </div>
  );
};

const LoadingFallback = ({ type }: { type: "grid" | "list" }) => {
  return <CardList.Skeleton type={type} cols={4} />;
};

export default function CardSection() {
  const { viewType } = useViewTypeStore();

  return (
    <section>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense
          fallback={viewType !== null && <LoadingFallback type={viewType} />}
        >
          <CardSectionWithData />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
}
