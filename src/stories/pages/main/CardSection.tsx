"use client";

import fetcher from "@/apis/fetcher";
import Card from "@/components/common/Card";
import CardList from "@/components/common/CardList";
import { ProductResponse } from "@/libs/type";
import { useQuery } from "@tanstack/react-query";

export default function CardSection() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetcher.get<{ products: ProductResponse[] }>("products?limit=20"),
  });

  if (isLoading) return <div>데이터를 불러오는 중입니다...</div>;

  if (!data) return <div>데이터가 없습니다.</div>;

  return (
    <section className="flex flex-col gap-4">
      <CardList type="grid" cols={4}>
        {data.products.map((product) => (
          <Card
            key={product.id}
            type="grid"
            title={product.title}
            description={product.description}
            thumbnail={product.thumbnail}
            rating={product.rating}
            reviews={product.reviews}
          />
        ))}
      </CardList>
    </section>
  );
}
