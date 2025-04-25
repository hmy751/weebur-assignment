"use client";

import { useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import fetcher from "@/apis/fetcher";
import Card from "@/components/common/Card";
import CardList from "@/components/common/CardList";
import { ProductResponse } from "@/libs/type";
import { useGetViewType } from "@/hooks/useGetViewType";

function CardSectionWithData() {
  const viewType = useGetViewType();

  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const queryParam = `limit=20&sortBy=rating&order=desc`;

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: ["products", search],
      queryFn: async ({ pageParam }) => {
        const pageParamIndex = pageParam - 1;

        const response = await fetcher.get<{ products: ProductResponse[] }>(
          search
            ? `products/search?q=${encodeURIComponent(
                search
              )}&${queryParam}&skip=${pageParamIndex * 20}`
            : `products?${queryParam}&skip=${pageParamIndex * 20}`
        );

        return response.products;
      },
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 20 ? allPages.length + 1 : undefined;
      },
      initialPageParam: 1,
    });

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observerRef.current?.unobserve(loadMoreRef.current);
      }
    };
  }, [handleObserver]);

  const products = data?.pages.flatMap((page) => page) || [];

  if (products.length === 0 && !hasNextPage)
    return <div>데이터가 없습니다.</div>;

  return (
    <>
      <CardList type={viewType} cols={4}>
        {products.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            type={viewType}
            title={product.title}
            description={product.description}
            thumbnail={product.thumbnail}
            rating={product.rating}
            reviews={product.reviews}
          />
        ))}
      </CardList>
      <div ref={loadMoreRef} className="h-10">
        {isFetchingNextPage && (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-blue"></div>
            <span className="ml-2 text-gray-500">
              데이터를 불러오는 중입니다...
            </span>
          </div>
        )}
        {!hasNextPage && products.length > 0 && (
          <div className="flex flex-col items-center py-4">
            <p className="text-gray-500">더 이상 데이터가 없습니다.</p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mt-2 px-4 py-2 bg-primary-blue text-white rounded hover:bg-primary-blue/80"
            >
              맨 위로 돌아가기
            </button>
          </div>
        )}
      </div>
    </>
  );
}

const Loading = ({ type }: { type: "grid" | "list" }) => {
  return (
    <>
      {type === "grid" && <CardList.Skeleton type="grid" cols={4} />}
      {type === "list" && <CardList.Skeleton type="list" />}
    </>
  );
};

CardSectionWithData.Loading = Loading;

export default CardSectionWithData;
