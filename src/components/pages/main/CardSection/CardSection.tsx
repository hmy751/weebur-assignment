import { Suspense } from "react";
import CardSectionWithData from "./CardSectionWithData";

export default function CardSection() {
  return (
    <section>
      <Suspense fallback={<div>데이터를 불러오는 중입니다...</div>}>
        <CardSectionWithData />
      </Suspense>
    </section>
  );
}
