"use client";

import Card from "@/components/common/Card";
import CardList from "@/components/common/CardList";
import { useViewTypeStore } from "@/store/useViewTypeStore";
import { useGetInfiniteProduct } from "@/data/useGetInfiniteProduct";
import { useInfiniteScrollObserver } from "@/hooks/useInfiniteScrollObserver";
import { useSearchParams } from "next/navigation";

function CardSectionWithData() {
  const { viewType } = useViewTypeStore();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetInfiniteProduct();
  const { loadMoreRef } = useInfiniteScrollObserver({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const products = data?.pages.flatMap((page) => page) || [];

  if (products.length === 0 && !hasNextPage)
    return (
      <Error
        message={
          search
            ? `'${search}' 에 대한 상품이 없습니다.`
            : "존재하는 상품이 없습니다."
        }
      />
    );

  return (
    <>
      <CardList type={viewType ?? "grid"} cols={4}>
        {products.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            type={viewType ?? "grid"}
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

const Error = ({ message }: { message: string }) => {
  return (
    <div className="flex justify-center items-center w-full h-200">
      {message}
    </div>
  );
};

const Loading = ({ type }: { type: "grid" | "list" }) => {
  return (
    <>
      {type === "grid" && <CardList.Skeleton type="grid" cols={4} />}
      {type === "list" && <CardList.Skeleton type="list" />}
    </>
  );
};

CardSectionWithData.Error = Error;
CardSectionWithData.Loading = Loading;

export default CardSectionWithData;
