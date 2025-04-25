import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { ProductResponse } from "@/libs/type";
import { useSearchParams } from "next/navigation";
import fetcher from "@/apis/fetcher";

export const useGetInfiniteProduct = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const queryParam = `limit=20&sortBy=rating&order=desc`;

  return useSuspenseInfiniteQuery({
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
};
