"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import CardSectionWithData from "./CardSectionWithData";
import { useViewTypeStore } from "@/store/useViewTypeStore";

export default function CardSection() {
  const { viewType } = useViewTypeStore();

  return (
    <section>
      <ErrorBoundary
        fallback={
          <CardSectionWithData.Error message="데이터를 불러오는데 문제가 생겼습니다. 다시 시도해주세요." />
        }
      >
        <Suspense
          fallback={
            viewType !== null && <CardSectionWithData.Loading type={viewType} />
          }
        >
          <CardSectionWithData />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
}
