"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import fetcher from "@/apis/fetcher";
import Card from "@/components/common/Card";
import CardList from "@/components/common/CardList";
import { ProductResponse } from "@/libs/type";
import { getViewType } from "@/libs/utils";

export default function CardSection() {
  const viewType = getViewType();
  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  const queryParam = `limit=20`;

  const { data, isLoading } = useQuery({
    queryKey: ["products", search],
    queryFn: async () => {
      if (search) {
        return fetcher.get<{ products: ProductResponse[] }>(
          `products/search?q=${encodeURIComponent(search)}&${queryParam}`
        );
      }

      return fetcher.get<{ products: ProductResponse[] }>(
        `products?${queryParam}`
      );
    },
  });

  if (isLoading) return <div>데이터를 불러오는 중입니다...</div>;

  if (!data) return <div>데이터가 없습니다.</div>;

  return (
    <section className="flex flex-col gap-4">
      <CardList type={viewType} cols={4}>
        {data.products.map((product) => (
          <Card
            key={product.id}
            type={viewType}
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
